// External Dependencies
import {
  Box,
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import React, {
  ReactInstance, useCallback, useEffect, useRef, useState
} from 'react';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';

// Internal Dependencies
import {
  HandleCompleteMemberStepType,
  MemberFormValues,
} from './MemberRegisterContent';
import {
  doGetInvoiceId,
  doGetReceiptId,
  doUpdateEntry,
  doUpdateInvoiceId as updateFirestoreInvoiceId,
  doUpdateReceiptId as updateFirestoreReceiptId,
  FIRESTORE_MEMBER_COLLECTION,
} from '../../firebase/db';
import { currentDate } from '../../utils/dateHelpers';
import { currentSchoolYearLong } from '../../utils/helpers';
import { appNameShort } from '../../utils/app-constants';
import CtaButton from '../shared/CtaButton';
import FormDivider from '../shared/FormDivider';
import Invoice from './invoice';
import PaypalButtonWrapper, {
  PaypalPayment,
} from './paypal/paypal-button-wrapper';
import usePrevious from '../../utils/hooks/usePrevious';

// Local Typings
interface Props {
  authenticatedUserId: string | undefined;
  memberForm: MemberFormValues;
  onCompleteMemberStep: HandleCompleteMemberStepType;
  onUpdateMemberForm: (updatedMemberForm: MemberFormValues) => void;
}
type ActiveMemberRadioOptions = 'active' | 'retired';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.classChampionRadioLabelRoot': {
    alighItems: 'flex-start',
    display: 'flex',
  },
  '.memberLevelAmount': {
    fontSize: 34,
    marginLeft: theme.spacing(1),
  },
  '.memberLevelHeading': {
    fontSize: 34,
    fontWeight: 700,
    marginTop: '1rem',
  },
  '.memberName': {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginTop: theme.spacing(1.5),
  },
  '.radioButtonLabel': {
    display: 'block',
    fontSize: '90%',
    letterSpacing: '0.05rem',
    marginTop: '0.3rem',
    marginBottom: theme.spacing(1.5),
  },
  '.registerStep3Title': {
    fontSize: 34,
    fontWeight: 900,
  },
  '.successMemberInfoCard': {
    padding: theme.spacing(0, 2, 3),
  },
}));

// Component Definition
const RegisterMemberPayment: React.FC<Props> = ({
  authenticatedUserId,
  memberForm,
  onCompleteMemberStep,
  onUpdateMemberForm,
}) => {
  const {
    invoiceId,
    receiptId,
  } = memberForm;

  const previousInvoiceId = usePrevious(invoiceId);

  // We have these refs for printing invoice or receipt
  const printInvoiceRef = useRef<ReactInstance>(null);
  const printReceiptIdRef = useRef<ReactInstance>(null);

  const [hasCompletedPayment, setHasCompletedPayment] = useState<boolean>();
  const [
    isActiveMember,
    setIsActiveMember,
  ] = useState<ActiveMemberRadioOptions>('active');

  const handleGetCurrentInvoiceId = useCallback((currentInvoiceId: number) => {
    console.log('handleGetCurrentInvoiceId : currentInvoiceId', currentInvoiceId);
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

  const handleCompleteMemberPaymentStep = useCallback((payment: PaypalPayment) => {
    const updatedMemberForm: MemberFormValues = {
      ...memberForm,
      AmountPaid: isActiveMember === 'active' ? 50 : 30,
      PaypalPayerID: payment?.payerID,
      PaypalPaymentID: payment?.paymentID,
      PaymentOption: payment?.paymentID ? 'Paypal' : 'Invoiced',
      invoiceDate: currentDate,
      invoiceId: memberForm.invoiceId,
      receiptDate: memberForm.receiptId ? currentDate : '',
      receiptId: memberForm.receiptId,
    };

    doUpdateEntry(
      updatedMemberForm,
      FIRESTORE_MEMBER_COLLECTION,
      authenticatedUserId,
    );
    onCompleteMemberStep(2, updatedMemberForm);
  }, [authenticatedUserId, isActiveMember, memberForm, onCompleteMemberStep]);

  useEffect(() => {
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
    if (!invoiceId) {
      doGetInvoiceId(handleGetCurrentInvoiceId);
    } else if (previousInvoiceId === 0
        && previousInvoiceId !== invoiceId && !hasCompletedPayment) {
      const updatedMemberForm: MemberFormValues = {
        ...memberForm,
        invoiceDate: currentDate,
        invoiceId,
      };

      doUpdateEntry(
        {
          ...updatedMemberForm,
          // Though we have the receipt id in our local reducer state,
          //  we don't need to store it in the DB until payment is successful
          receiptId: 0,
        },
        FIRESTORE_MEMBER_COLLECTION,
        authenticatedUserId,
      );
      onUpdateMemberForm(updatedMemberForm);
    }
  }, [
    authenticatedUserId,
    handleGetCurrentInvoiceId,
    hasCompletedPayment,
    invoiceId,
    memberForm,
    onUpdateMemberForm,
    previousInvoiceId,
  ]);

  const handleUpdateCompletedStep = useCallback((payment: PaypalPayment) => {
    doGetReceiptId(handleGetCurrentReceiptId);
    setHasCompletedPayment(true);
    handleCompleteMemberPaymentStep(payment);
  }, [handleCompleteMemberPaymentStep, handleGetCurrentReceiptId]);

  const handleChangeRadioSelection = useCallback((event) => {
    const { value: updatedActiveMemberSelection } = event.target;

    const isActive = updatedActiveMemberSelection === 'active';

    const updatedMemberForm = {
      ...memberForm,
      invoiceDate: currentDate,
      invoiceId,
      MemberType: isActive ? 'Active' : 'Retired' as ('Active' | 'Retired'),
      receiptId,
    };

    setIsActiveMember(updatedActiveMemberSelection);
    onUpdateMemberForm(updatedMemberForm);

    return doUpdateEntry(
      updatedMemberForm,
      FIRESTORE_MEMBER_COLLECTION,
      authenticatedUserId,
    );
  }, [authenticatedUserId, invoiceId, memberForm, onUpdateMemberForm, receiptId]);

  const isActive = isActiveMember === 'active';
  const amount = isActive ? 50 : 30;

  const successfulMemberPaymentElement = (
    <div>
      <Box mb={3}>
        <h2>Successful Payment!</h2>
      </Box>

      <Card
        className="successMemberInfoCard"
        variant="outlined"
      >
        <h3 className="memberLevelHeading">
          {isActive ? 'Active' : 'Retired'} Member
          <Typography
            className="memberLevelAmount"
            component="span"
            variant="h4"
          >
            — {isActive ? '$50.00' : '$30.00'}
          </Typography>
        </h3>

        <Typography
          className="memberName"
          variant="body2"
        >
          {memberForm.FirstName} {memberForm.LastName}
        </Typography>
        <Typography variant="body2">
          {memberForm.Title}, {memberForm.District}
        </Typography>
        <Typography variant="body2">
          {memberForm.Email}
        </Typography>
        <Typography variant="body2">
          Cell Phone — {memberForm.CellPhone}
        </Typography>
        <Typography variant="body2">
          Office Phone — {memberForm.OfficePhone}
        </Typography>

        <Box mt={3}>
          <ReactToPrint
            content={() => printReceiptIdRef.current}
            trigger={() => (
              <CtaButton
                fontWeight={600}
                width={160}
              >
                Print Receipt
              </CtaButton>
            )}
          />
        </Box>
      </Card>

      <Box
        mt={5}
        mx={4}
      >
        <Typography
          className="registerStep3Title"
          component="h3"
        >
          Thank you for joining {appNameShort} for the {currentSchoolYearLong} school year!
        </Typography>
      </Box>

      <Box display="none">
        <Invoice
          amount={amount}
          form={memberForm}
          isInvoice={false}
          receiptId={memberForm.receiptId}
          ref={printReceiptIdRef}
        />
      </Box>
    </div>
  );

  // We show this if the user has not made a payment
  const invoiceMemberElement = (
    <div>
      <Box mb={6}>
        <Box mb={3}>
          <h3>Pay now with Paypal</h3>
        </Box>

        <FormControl
          component="fieldset"
          style={{ marginLeft: 32 }}
        >
          <h2 className="memberLevelHeading">
            {memberForm.MemberType} Member
          </h2>

          <FormControl component="fieldset">
            <RadioGroup
              aria-label="Member Level"
              name="MemberLevel*"
              onChange={handleChangeRadioSelection}
              value={isActiveMember}
            >
              <FormControlLabel
                control={<Radio size="small" />}
                label={(
                  <>
                    <Typography component="span">
                      Active
                    </Typography>

                    <Typography
                      color="textSecondary"
                      component="span"
                    >
                      {' '} — $50
                    </Typography>
                  </>
                )}
                value="active"
              />
              <FormControlLabel
                control={<Radio size="small" />}
                label={(
                  <>
                    <Typography component="span">
                      Retired
                    </Typography>

                    <Typography
                      color="textSecondary"
                      component="span"
                    >
                      {' '} — $30
                    </Typography>
                  </>
                )}
                value="retired"
              />
            </RadioGroup>
          </FormControl>

          <Typography
            sx={{ marginTop: 1.5 }}
            variant="body2"
          >
            Click on the PayPal button below to pay with credit card.
          </Typography>

          <PaypalButtonWrapper
            amount={amount}
            onSuccessfulPayment={handleUpdateCompletedStep}
          />
        </FormControl>
      </Box>

      <div>
        <h3>Need to pay later?</h3>

        <Box
          ml={4}
          mt={3}
        >
          <Box mb={3}>
            Follow these steps:
            <ol>
              <li>Click the button below to print an invoice.</li>
              <li>
                Send the invoice and payment directly to the TMAC
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
            If your organization requires the IRS W-9 Form for TMAC,
            please download or print a copy below.
          </Box>

          <Box mt={3}>
            <a
              download
              href="https://res.cloudinary.com/tmac/image/upload/v1589767111/W-9__TMAC_Inc.pdf"
            >
              Download W-9
            </a>
          </Box>
        </Box>
      </div>
    </div>
  );

  return (
    <StyledRoot>
      <Typography
        className="registerStep3Title"
        component="h2"
      >
        3. Pay {appNameShort} Dues
      </Typography>

      <FormDivider />

      {hasCompletedPayment
        ? successfulMemberPaymentElement
        : invoiceMemberElement}
    </StyledRoot>
  );
};

export default RegisterMemberPayment;
