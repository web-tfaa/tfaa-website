import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import React, { ReactInstance, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';

// Internal Dependencies
import { PaymentForm } from '../../../register/PaymentForm';
import {
  FIRESTORE_MEMBER_COLLECTION,
  doGetInvoiceId,
  doGetReceiptId,
  doUpdateEntry,
  doUpdateInvoiceId as updateFirestoreInvoiceId,
  doUpdateReceiptId as updateFirestoreReceiptId,
} from '../../../../firebase/db';
import {
  INITIAL_MEMBER_FORM_VALUES,
  MemberFormValues,
} from '../../../register/MemberRegisterContent';
import { ActiveMemberRadioOptions } from '../../../register/register-member-payment';
import { PaymentSuccessUI } from '../../../register/PaymentSuccessUI';
import { PaypalPayment } from '../../../register/paypal/paypal-button-wrapper';
import { TfaaMemberData } from '../../../../utils/hooks/useGetAllMembers';
import { appNameShort } from '../../../../utils/app-constants';
import { currentDate } from '../../../../utils/dateHelpers';
import { getAmountPaid } from '../../../../utils/getAmountPaid';
import usePrevious from '../../../../utils/hooks/usePrevious';
import Invoice from '../../../register/invoice';
import CtaButton from '../../../shared/CtaButton';

// Local Typings
interface Props {
  currentMemberData: TfaaMemberData | null;
  hasPaidForMembership?: boolean;
  isOpen: boolean;
  onClose: () => void;
  userIdForFirestore: string;
}

/*
 * For some reason, this component will not receive the currentMemberData more than once.
 * Due to that, we are using local state to keep track of changes in the MemberType and
 * IsRegisteredForFallConference values.
 * The extra logic around the local state needs to stay until we figure out why the
 * currentMemberData is not being updated and causing this component to re-render.
 */

// Component Definition
export const DialogPayment = ({
  currentMemberData,
  hasPaidForMembership,
  isOpen,
  onClose,
  userIdForFirestore
}: Props): JSX.Element => {
  const printInvoiceRef = useRef<ReactInstance>(null);

  const memberTypeFromForm = currentMemberData?.MemberType.toLowerCase();

  const previousCurrentMemberData = usePrevious(currentMemberData);
  const previousIsOpen = usePrevious(isOpen);

  const isDialogOpened = isOpen && !previousIsOpen;

  /* Local State */
  const [showCompletedUI, setShowCompletedUI] = useState<boolean>(false);

  // State variable used to cause a render and cause a useEffect to run
  const [hasCompletedPayment, setHasCompletedPayment] = useState<boolean>();

  const [
    memberPaymentForm,
    setMemberPaymentForm,
  ] = useState<MemberFormValues>(currentMemberData ?? INITIAL_MEMBER_FORM_VALUES);

  const [
    isActiveMember,
    setIsActiveMember,
  ] = useState<ActiveMemberRadioOptions>(memberTypeFromForm as ActiveMemberRadioOptions ?? 'active');

  const [hasFallConferenceFee, setHasFallConferenceFee] = useState<boolean>(currentMemberData?.IsRegisteredForFallConference ?? false);

  // Local state setter functions
  const handleSetIsActiveMember = useCallback((isActive: ActiveMemberRadioOptions) => {
    setIsActiveMember(isActive);
  }, []);

  const handleSetHasFallConferenceFee = useCallback((hasFee: boolean) => {
    setHasFallConferenceFee(hasFee);
  }, []);

  const handleUpdateMemberPaymentForm = (updatedMemberPaymentForm: Partial<MemberFormValues>) => {
    setMemberPaymentForm({
      ...memberPaymentForm,
      ...updatedMemberPaymentForm,
    });
  };

  // Update memberPaymentForm state with invoice and receipt ids
  const handleGetCurrentInvoiceId = useCallback((currentInvoiceId: number) => {
    handleUpdateMemberPaymentForm({
      ...currentMemberData,
      invoiceId: currentInvoiceId,
    });
  }, [memberPaymentForm, handleUpdateMemberPaymentForm]);

  const handleGetCurrentReceiptId = useCallback((currentReceiptId: number) => {
    handleUpdateMemberPaymentForm({
      ...currentMemberData,
      receiptId: currentReceiptId,
    });
  }, [memberPaymentForm, handleUpdateMemberPaymentForm]);

  // Update the MemberTypes if the data was missing but arrives later
  useEffect(() => {
    if ((previousCurrentMemberData as unknown as TfaaMemberData)?.MemberType !== currentMemberData?.MemberType) {
      setIsActiveMember(memberTypeFromForm as ActiveMemberRadioOptions ?? 'active');
    }
  }, [currentMemberData, previousCurrentMemberData]);

  // Update the IsRegisteredForFallConference if the data was missing but arrives later
  useEffect(() => {
    if ((previousCurrentMemberData as unknown as TfaaMemberData)?.IsRegisteredForFallConference !== currentMemberData?.IsRegisteredForFallConference) {
      setHasFallConferenceFee(currentMemberData?.IsRegisteredForFallConference ?? false);
    }
  }, [currentMemberData, previousCurrentMemberData]);

  useEffect(() => {
    if (currentMemberData) {
      // Fetch the current invoice and receipt id values from Firestore
      doGetInvoiceId(handleGetCurrentInvoiceId);
      doGetReceiptId(handleGetCurrentReceiptId);

      // On unmount
      return () => {
        // Increment receipt id value in Firestore
        if (hasCompletedPayment) {
          updateFirestoreReceiptId();

          // If no payment is made, we increment invoice id value in Firestore
        } else {
          updateFirestoreInvoiceId();
        }
      };
    }
  }, [currentMemberData]);

  useEffect(() => {
    // If the currentMemberData was undefined and then arrives,
    //  update the form data in the reducer and the local state
    if (!previousCurrentMemberData && currentMemberData && isDialogOpened) {
      handleUpdateMemberPaymentForm(currentMemberData);
      setIsActiveMember(currentMemberData.MemberType.toLowerCase() as ActiveMemberRadioOptions);
      setHasFallConferenceFee(currentMemberData.IsRegisteredForFallConference);
    }
  }, [
    currentMemberData,
    handleUpdateMemberPaymentForm,
    isDialogOpened,
    previousCurrentMemberData,
  ]);

  // Update Firestore database member data
  const handleUpdateFirestoreMemberData = useCallback((updatedMemberForm: MemberFormValues) => {
    return doUpdateEntry(
      updatedMemberForm,
      FIRESTORE_MEMBER_COLLECTION,
      userIdForFirestore,
    );
  }, []);

  // After a successful payment, we update the Firestore
  //  database and push the user to the payment success UI
  const handleUpdateMemberPaymentData = useCallback((payment: PaypalPayment) => {
    if (payment.paid && currentMemberData) {
      const amountPaidFromCurrentMemberData = getAmountPaid(currentMemberData);

      // The AmountPaid_2 and PaypalPaymentID_2 values can only be sent from this dialog.
      // An initial PayPal payment is sent from the MemberRegisterContent component.
      // Subsequent payments are sent from this dialog.

      const hasMadeInitialPayment = Boolean(currentMemberData.AmountPaid && currentMemberData.PaypalPaymentID);

      const updatedMemberForm: MemberFormValues = {
        ...memberPaymentForm,
        AmountPaid: !hasMadeInitialPayment
          ? amountPaidFromCurrentMemberData
          : currentMemberData.AmountPaid,
        AmountPaid_2: hasMadeInitialPayment
          ? amountPaidFromCurrentMemberData
          : currentMemberData.AmountPaid_2,
        PaypalPayerID: payment?.payerID,
        PaypalPaymentID: !hasMadeInitialPayment
          ? payment?.paymentID
          : currentMemberData.PaypalPaymentID,
        PaypalPaymentID_2: hasMadeInitialPayment
          ? payment?.paymentID
          : currentMemberData.PaypalPaymentID_2,
        PaymentOption: payment?.paymentID ? 'Paypal' : 'Invoiced',
        invoiceDate: currentDate,
        invoiceId: currentMemberData.invoiceId ?? 1,
        receiptDate: currentMemberData.receiptId ? currentDate : '',
        receiptId: currentMemberData.receiptId ?? 1,
      };

      handleUpdateFirestoreMemberData(updatedMemberForm);
      setShowCompletedUI(true);
    }
  }, [isActiveMember, memberPaymentForm]);

  // Called when a payment is successfully completed via PayPal
  const handleUpdateCompletedStep = useCallback((payment: PaypalPayment) => {
    doGetReceiptId(handleGetCurrentReceiptId);
    setHasCompletedPayment(true);
    handleUpdateMemberPaymentData(payment);
  }, [handleGetCurrentReceiptId]);

  const needsToPay = !currentMemberData?.AmountPaid && !currentMemberData?.AmountPaid_2;

  const hasPaidForMembershipOnly = Boolean(currentMemberData && currentMemberData?.AmountPaid > 0 && currentMemberData?.AmountPaid < 100);

  const needsToPayForFallConference = hasFallConferenceFee
    && ((currentMemberData?.AmountPaid ?? 0) + (currentMemberData?.AmountPaid_2 ?? 0)) < 100;

  const getOutstandingBalance = () => {
    let amountOwed = 0;

    if (!currentMemberData) {
      return 0;
    }

    const isActiveMemberType = isActiveMember === 'active';

    if (hasPaidForMembershipOnly && !needsToPayForFallConference) {
      amountOwed = 0;
    } else if (hasPaidForMembershipOnly && needsToPayForFallConference) {
      amountOwed = 75;
    } else if (needsToPay) {
      if (isActiveMemberType) {
        if (needsToPayForFallConference) {
          amountOwed = 150;
        } else {
          amountOwed = 75;
        }
      } else if (!isActiveMemberType) {
        if (needsToPayForFallConference) {
          amountOwed = 105;
        } else {
          amountOwed = 30;
        }
      }
    }

    return amountOwed;
  };

  const isActive = isActiveMember === 'active';

  let contentElement = showCompletedUI ? (
    <PaymentSuccessUI
      hasFallConferenceFee={hasFallConferenceFee}
      isActive={isActive}
      isDialogView
      memberForm={memberPaymentForm}
    />
  ) : (
    <PaymentForm
      amountToPay={getOutstandingBalance()}
      hasFallConferenceFee={hasFallConferenceFee}
      hasPaidForMembership={hasPaidForMembership}
      isActiveMember={isActiveMember}
      isDialogOpen={isOpen}
      isDialogView
      memberForm={memberPaymentForm}
      onSetHasFallConferenceFee={handleSetHasFallConferenceFee}
      onSetIsActiveMember={handleSetIsActiveMember}
      onUpdateCompletedStep={handleUpdateCompletedStep}
      onUpdateFirestoreMemberData={handleUpdateFirestoreMemberData}
      onUpdateMemberForm={handleUpdateMemberPaymentForm}
    />
  );

  const printInvoiceElement = useMemo(() => (
    <Collapse
      in={hasPaidForMembership && hasFallConferenceFee && !showCompletedUI && memberPaymentForm.AmountPaid < 100}
      mountOnEnter
      unmountOnExit
    >
      <Divider sx={{ marginY: 2 }} />

      <Box
        marginBottom={3}
        sx={{
          'li': {
            fontSize: 18,
          },
        }}
      >
        Follow these steps to pay later:
        <ol>
          <li>Click the button below to print an invoice.</li>
          <li>
            Send the invoice and payment directly to the {appNameShort}{' '}
            Executive Secretary as detailed on the invoice.
          </li>
        </ol>
      </Box>

      <ReactToPrint
        content={() => printInvoiceRef.current}
        trigger={() => (
          <CtaButton
            fontWeight={600}
            onClick={updateFirestoreInvoiceId}
            width={160}
          >
            Print Invoice
          </CtaButton>
        )}
      />

      <Box display="none">
        <Invoice
          amount={getOutstandingBalance()}
          form={currentMemberData}
          isActive={isActive}
          isInvoice
          isOnlyForFallConference
          receiptId={currentMemberData?.invoiceId}
          ref={printInvoiceRef}
        />
      </Box>
    </Collapse>
  ), [
    currentMemberData,
    hasPaidForMembership,
    hasFallConferenceFee,
    isActive,
    memberPaymentForm.AmountPaid,
    printInvoiceRef,
  ]);


  return (
    <Dialog
      disablePortal
      fullWidth
      maxWidth="sm"
      open={isOpen}
      onClose={onClose}
    >
      {!showCompletedUI && (
        <DialogTitle>
          Pay Online with PayPal
        </DialogTitle>
      )}

      <DialogContent dividers>
        {contentElement}

        {!showCompletedUI && printInvoiceElement}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
