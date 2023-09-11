// External Dependencies
import React, {
  ReactInstance, useCallback, useEffect, useMemo, useRef, useState
} from 'react';
import { alpha } from '@mui/material/styles';
import ReactToPrint from 'react-to-print';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import styled from 'styled-components';

// Internal Dependencies
import { getAmountPaid } from '../../utils/getAmountPaid';
import {
  HandleCompleteMemberStepType,
  MemberFormValues,
} from './MemberRegisterContent';
import { PaymentForm } from './PaymentForm';
import { PaypalPayment } from './paypal/paypal-button-wrapper';
import { PaymentSuccessUI } from './PaymentSuccessUI';
import {
  FIRESTORE_MEMBER_COLLECTION,
  doGetInvoiceId,
  doGetReceiptId,
  doUpdateEntry,
  doUpdateInvoiceId as updateFirestoreInvoiceId,
  doUpdateReceiptId as updateFirestoreReceiptId,
} from '../../firebase/db';
import { currentDate } from '../../utils/dateHelpers';
import { appNameShort } from '../../utils/app-constants';
import CtaButton from '../shared/CtaButton';
import EnhancedCard from '../shared/EnhancedCard';
import FormDivider from '../shared/FormDivider';
import FormTitle from '../shared/FormTitle';
import Invoice from './invoice';
import usePrevious from '../../utils/hooks/usePrevious';

// Local Typings
interface Props {
  authenticatedUserId: string | undefined;
  memberForm: MemberFormValues;
  onCompleteMemberStep: HandleCompleteMemberStepType;
  onUpdateMemberForm: (updatedMemberForm: MemberFormValues) => void;
}
export type ActiveMemberRadioOptions = 'active' | 'retired';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.MuiCardHeader-root': {
    '&.top-card-header': {
      backgroundColor: alpha(theme.palette.ui.lilac, 0.4),
    },
    '&.bottom-card-header': {
      backgroundColor: alpha(theme.palette.tfaa.membership, 0.3),
    },
  },
}));

// Component Definition
const RegisterMemberPayment: React.FC<Props> = ({
  authenticatedUserId,
  memberForm,
  onCompleteMemberStep,
  onUpdateMemberForm,
}) => {
  const previousInvoiceId = usePrevious(memberForm.invoiceId);

  // We have these refs for printing invoice or receipt
  const printInvoiceRef = useRef<ReactInstance>(null);

  const [hasCompletedPayment, setHasCompletedPayment] = useState<boolean>();
  const [
    isActiveMember,
    setIsActiveMember,
  ] = useState<ActiveMemberRadioOptions>('active');
  const [hasFallConferenceFee, setHasFallConferenceFee] = useState<boolean>(false);

  // Local state setter functions
  const handleSetIsActiveMember = useCallback((isActive: ActiveMemberRadioOptions) => {
    setIsActiveMember(isActive);
  }, []);

  const handleSetHasFallConferenceFee = useCallback((hasFee: boolean) => {
    setHasFallConferenceFee(hasFee);
  }, []);

  // Update Firestore database member data
  const handleUpdateFirestoreMemberData = useCallback((updatedMemberForm: MemberFormValues) => {
    return doUpdateEntry(
      updatedMemberForm,
      FIRESTORE_MEMBER_COLLECTION,
      authenticatedUserId,
    );
  }, []);

  const handleGetCurrentInvoiceId = useCallback((currentInvoiceId: number) => {
    onUpdateMemberForm({
      ...memberForm,
      invoiceId: currentInvoiceId,
    });
  }, [memberForm, onUpdateMemberForm]);

  const handleGetCurrentReceiptId = useCallback((currentReceiptId: number) => {
    onUpdateMemberForm({
      ...memberForm,
      receiptId: currentReceiptId,
    });
  }, [memberForm, onUpdateMemberForm]);

  // When the step is being completed after a successful payment,
  //  we update the Firestore database and push the user to the payment success UI
  const handleCompleteMemberPaymentStep = useCallback((payment: PaypalPayment) => {
    const amountPaidFromCurrentMemberForm = getAmountPaid(memberForm);

    // The amountPaidFromCurrentMemberForm value will always be exactly 30, 75, 105, or 150

    const updatedMemberForm: MemberFormValues = {
      ...memberForm,
      AmountPaid: amountPaidFromCurrentMemberForm,
      PaypalPayerID: payment?.payerID,
      PaypalPaymentID: payment?.paymentID,
      PaymentOption: payment?.paymentID ? 'Paypal' : 'Invoiced',
      invoiceDate: currentDate,
      invoiceId: memberForm.invoiceId,
      receiptDate: memberForm.receiptId ? currentDate : '',
      receiptId: memberForm.receiptId,
    };

    handleUpdateFirestoreMemberData(updatedMemberForm);

    onCompleteMemberStep(2, updatedMemberForm);
  }, [isActiveMember, memberForm, onCompleteMemberStep]);

  useEffect(() => {
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
    // Ignoring this b/c we only want to run this on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // We want to record the newest invoiceId in the Firestore database
  useEffect(() => {
    if (!memberForm.invoiceId) {
      doGetInvoiceId(handleGetCurrentInvoiceId);
    } else if (previousInvoiceId === 0
        && previousInvoiceId !== memberForm.invoiceId && !hasCompletedPayment) {
      const updatedFormWithInvoiceData: MemberFormValues = {
        ...memberForm,
        invoiceDate: currentDate,
        invoiceId: memberForm.invoiceId,
      };

      const updatedMemberForm = {
        ...updatedFormWithInvoiceData,
        // Though we have the receipt id in our local reducer state,
        //  we don't need to store it in the DB until payment is successful
        receiptId: 0,
      };

      handleUpdateFirestoreMemberData(updatedMemberForm);

      onUpdateMemberForm(updatedMemberForm);
    }
  }, [
    authenticatedUserId,
    handleGetCurrentInvoiceId,
    hasCompletedPayment,
    memberForm.invoiceId,
    memberForm,
    onUpdateMemberForm,
    previousInvoiceId,
  ]);

  // Called when a payment is successfully completed via PayPal
  const handleUpdateCompletedStep = useCallback((payment: PaypalPayment) => {
    doGetReceiptId(handleGetCurrentReceiptId);
    setHasCompletedPayment(true);
    handleCompleteMemberPaymentStep(payment);
  }, [handleCompleteMemberPaymentStep, handleGetCurrentReceiptId]);

  const isActive = isActiveMember === 'active';
  const membershipAmount = isActive ? 75 : 30;
  const amount = hasFallConferenceFee ? membershipAmount + 75 : membershipAmount;

  // This element is shown if the member successfully
  //  completes an online PayPal payment
  const successfulMemberPaymentElement = useMemo(() => (
    <PaymentSuccessUI
      hasFallConferenceFee={hasFallConferenceFee}
      isActive={isActive}
      memberForm={memberForm}
    />
  ), [
    hasFallConferenceFee,
    isActive,
    memberForm,
  ]);

  // We show this if the user has not made a payment.
  // It's assumed that they are wanting an invoice.
  const invoiceMemberElement = (
    <>
      <EnhancedCard sx={{ marginBottom: 3 }}>
        <CardHeader
          className="top-card-header"
          title="Pay now with Paypal"
        />

        <PaymentForm
          amountToPay={amount}
          hasFallConferenceFee={hasFallConferenceFee}
          isActiveMember={isActiveMember}
          memberForm={memberForm}
          onSetHasFallConferenceFee={handleSetHasFallConferenceFee}
          onSetIsActiveMember={handleSetIsActiveMember}
          onUpdateCompletedStep={handleUpdateCompletedStep}
          onUpdateFirestoreMemberData={handleUpdateFirestoreMemberData}
          onUpdateMemberForm={onUpdateMemberForm}
        />
      </EnhancedCard>

      <EnhancedCard>
        <CardHeader
          className="bottom-card-header"
          title="Need to pay later?"
        />

        <Box
          ml={4}
          mt={3}
        >
          <Box mb={3}>
            Follow these steps:
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
              amount={amount}
              form={memberForm}
              invoiceId={memberForm.invoiceId}
              isActive={isActive}
              isInvoice
              ref={printInvoiceRef}
            />
          </Box>

          <Box mt={3}>
            If your organization requires the IRS W-9 Form for {appNameShort},
            please download or print a copy below.
          </Box>

          <Box mt={3}>
            <a
              download
              href="https://res.cloudinary.com/tmac/image/upload/v1690941409/W-9_TFAA_Inc.pdf"
            >
              Download W-9
            </a>
          </Box>
        </Box>
      </EnhancedCard>
    </>
  );

  return (
    <StyledRoot>
      <FormTitle component="h2">
        3. Pay {appNameShort} Dues
      </FormTitle>

      <FormDivider />

      {hasCompletedPayment
        ? successfulMemberPaymentElement
        : invoiceMemberElement}
    </StyledRoot>
  );
};

export default RegisterMemberPayment;
