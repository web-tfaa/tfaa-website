import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import CircsularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import React, { ReactInstance, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';

import { PaymentForm } from '../../../register/PaymentForm';
// import { TfaaMemberData } from '../../../../utils/hooks/useGetAllMembers';
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
import { appNameShort } from '../../../../utils/app-constants';
import { currentDate } from '../../../../utils/dateHelpers';
import { getAmountPaid } from '../../../../utils/getAmountPaid';
// import { useLoadCurrentMemberData } from '../../../../utils/hooks/useLoadCurrentMemberData';
import usePrevious from '../../../../utils/hooks/usePrevious';
import Invoice from '../../../register/invoice';
import CtaButton from '../../../shared/CtaButton';
import { TfaaMemberData } from '../../../../utils/hooks/useGetAllMembers';

// Local Typings
interface Props {
  // amountToPay: number;
  currentMemberData: TfaaMemberData | null;
  hasPaidForMembership?: boolean;
  isOpen: boolean;
  onClose: () => void;
  userIdForFirestore: string;
}

// Component Definition
export const DialogPayment = ({
  // amountToPay,
  currentMemberData,
  hasPaidForMembership,
  isOpen,
  onClose,
  userIdForFirestore
}: Props): JSX.Element => {
  const printInvoiceRef = useRef<ReactInstance>(null);

  // const {
  //   currentMemberData,
  //   // onUpdateShouldRefetchUserList,
  //   isLoading,
  // } = useLoadCurrentMemberData();

  // console.log('DialogPayment •• currentMemberData', currentMemberData);

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

  console.log('isActiveMember', isActiveMember);

  const [hasFallConferenceFee, setHasFallConferenceFee] = useState<boolean>(currentMemberData?.IsRegisteredForFallConference ?? false);

  // console.log('hasFallConferenceFee', hasFallConferenceFee);

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

  // console.log('currentMemberData', currentMemberData);

  const getOutstandingBalance = () => {
    let amountOwed = 0;

    if (!currentMemberData) {
      return 0;
    }

    const isActiveMemberType = isActiveMember === 'active';

    if (hasPaidForMembershipOnly && !needsToPayForFallConference) {
      console.log('1');
      amountOwed = 0;
    } else if (hasPaidForMembershipOnly && needsToPayForFallConference) {
      console.log('2');
      amountOwed = 75;
    } else if (needsToPay) {
      console.log('3');
      if (isActiveMemberType) {
        console.log('4');
        if (needsToPayForFallConference) {
          console.log('5');
          amountOwed = 150;
        } else {
          console.log('6');
          amountOwed = 75;
        }
      } else if (!isActiveMemberType) {
        console.log('7');
        if (needsToPayForFallConference) {
          console.log('8');
          amountOwed = 105;
        } else {
          console.log('9');
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
  ), [currentMemberData, isActive, printInvoiceRef]);

  // Return a loading spinner if the data is still loading
  // if (isLoading) {
  //   contentElement = <CircularProgress size={24} />;
  // }

  return (
    <Dialog
      disablePortal
      fullWidth
      maxWidth="sm"
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle>
        Pay Online with PayPal
      </DialogTitle>

      <DialogContent dividers>
        {contentElement}

        {printInvoiceElement}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
