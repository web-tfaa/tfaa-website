import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import React, { useCallback, useEffect, useState } from 'react';

import { PaymentForm } from '../../../register/PaymentForm';
import { TfaaMemberData } from '../../../../utils/hooks/useGetAllMembers';
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
import { PaypalPayment } from '../../../register/paypal/paypal-button-wrapper';

// Local Typings
interface Props {
  currentMemberData: TfaaMemberData | null;
  isOpen: boolean;
  onClose: () => void;
  userIdForFirestore: string;
}

// Component Definition
export const DialogPayment = ({
  currentMemberData,
  isOpen,
  onClose,
  userIdForFirestore
}: Props): JSX.Element => {
  // State variable used to cause a render and cause a useEffect to run
  const [hasCompletedPayment, setHasCompletedPayment] = useState<boolean>();

  const [
    memberPaymentForm,
    setMemberPaymentForm,
  ] = useState<MemberFormValues | null>(currentMemberData ?? INITIAL_MEMBER_FORM_VALUES);

  const [
    isActiveMember,
    setIsActiveMember,
  ] = useState<ActiveMemberRadioOptions>('active');

  const [hasFallConferenceFee, setHasFallConferenceFee] = useState<boolean>(currentMemberData?.IsRegisteredForFallConference ?? false);

  // Local state setter functionsm
  const handleUpdateMemberPaymentForm = useCallback((updatedMemberForm: MemberFormValues) => {
    setMemberPaymentForm(updatedMemberForm);
  }, []);

  const handleSetIsActiveMember = useCallback((isActive: ActiveMemberRadioOptions) => {
    setIsActiveMember(isActive);
  }, []);

  const handleSetHasFallConferenceFee = useCallback((hasFee: boolean) => {
    setHasFallConferenceFee(hasFee);
  }, []);

  // Update memberPaymentForm state with invoice and receipt ids
  const handleGetCurrentInvoiceId = useCallback((currentInvoiceId: number) => {
    handleUpdateMemberPaymentForm({
      ...(memberPaymentForm as MemberFormValues),
      invoiceId: currentInvoiceId,
    });
  }, [memberPaymentForm, handleUpdateMemberPaymentForm]);

  const handleGetCurrentReceiptId = useCallback((currentReceiptId: number) => {
    handleUpdateMemberPaymentForm({
      ...(memberPaymentForm as MemberFormValues),
      receiptId: currentReceiptId,
    });
  }, [memberPaymentForm, handleUpdateMemberPaymentForm]);

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

  // Update Firestore database member data
  const handleUpdateFirestoreMemberData = useCallback((updatedMemberForm: MemberFormValues) => {
    return doUpdateEntry(
      updatedMemberForm,
      FIRESTORE_MEMBER_COLLECTION,
      userIdForFirestore,
    );
  }, []);

  // Called when a payment is successfully completed via PayPal
  const handleUpdateCompletedStep = useCallback((payment: PaypalPayment) => {
    doGetReceiptId(handleGetCurrentReceiptId);
    setHasCompletedPayment(true);
  }, [handleGetCurrentReceiptId]);

  const isActive = isActiveMember === 'active';
  const membershipAmount = isActive ? 75 : 30;
  const amount = hasFallConferenceFee ? membershipAmount + 75 : membershipAmount;

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle>
        Pay Online with PayPal
      </DialogTitle>

      <DialogContent>
        <PaymentForm
          amountToPay={amount}
          hasFallConferenceFee={hasFallConferenceFee}
          isActiveMember={isActiveMember}
          memberForm={memberPaymentForm}
          onSetHasFallConferenceFee={handleSetHasFallConferenceFee}
          onSetIsActiveMember={handleSetIsActiveMember}
          onUpdateCompletedStep={handleUpdateCompletedStep}
          onUpdateFirestoreMemberData={handleUpdateFirestoreMemberData}
          onUpdateMemberForm={handleUpdateMemberPaymentForm}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
