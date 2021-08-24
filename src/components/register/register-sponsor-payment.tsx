// External Dependencies
import {
  Box,
  Card,
  Collapse,
  Divider,
  FormControl,
  FormControlLabel,
  Link,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import React, {
  FC, ReactInstance, useEffect, useRef, useState
} from 'react';
import ReactToPrint from 'react-to-print';
import format from 'date-fns/format';
import { makeStyles } from '@material-ui/styles';

// Internal Dependencies
import FormHr from '../shared/form-hr';
import Invoice from './invoice';
import PaypalButtonWrapper, {
  PaypalPayment,
} from './paypal/paypal-button-wrapper';
import RegisterButton from './register-button';
import {
  HandleCompleteSponsorStepType,
  SponsorFormValues,
} from '../../pages/sponsors/register';
import {
  doGetInvoiceId,
  doGetReceiptId,
  doUpdateEntry,
  doUpdateInvoiceId as updateFirestoreInvoiceId,
  doUpdateReceiptId as updateFirestoreReceiptId,
} from '../../firebase/db';
import { currentSchoolYearLong } from '../../utils/helpers';
import { SPONSORSHIP_LEVELS } from '../shared/sponsor-card';
import usePrevious from '../../utils/hooks/usePrevious';

// Local Typings
interface Props {
  authenticatedUserId: string | undefined;
  onCompleteSponsorStep: HandleCompleteSponsorStepType;
  onUpdateSponsorForm: (form: SponsorFormValues) => void;
  sponsorForm: SponsorFormValues;
}

// Local Variables
const useStyles = makeStyles((theme) => ({
  changeLevelLink: {
    cursor: 'pointer',
  },
  classChampionRadioLabelRoot: {
    alighItems: 'flex-start',
    display: 'flex',
  },
  radioButtonLabel: {
    display: 'block',
    fontSize: '90%',
    letterSpacing: '0.05rem',
    marginTop: '0.3rem',
    marginBottom: 0,
  },
  sponsorLevelAmount: {
    marginLeft: theme.spacing(1),
  },
  sponsorLevelHeading: {
    fontSize: '1.5rem',
    marginTop: '1rem',
  },
  successOrganizationName: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginTop: theme.spacing(1.5),
  },
  successSponsorInfoCard: {
    padding: theme.spacing(0, 2, 3),
  },
}));

const currentDate = format(new Date(), ['M/d/yyyy']);

// This will tell the Firestore database action where to put the new record
const FIRESTORE_SPONSOR_COLLECTION = 'sponsor';

// Component Definition
const RegisterSponsorPayment: FC<Props> = ({
  authenticatedUserId,
  onCompleteSponsorStep,
  onUpdateSponsorForm,
  sponsorForm,
}) => {
  const classes = useStyles();

  const {
    invoiceId,
    receiptId,
  } = sponsorForm;

  const previousInvoiceId = usePrevious(invoiceId);
  const previousReceiptId = usePrevious(receiptId);

  // We have these refs for printing invoice or receipt
  const printInvoiceRef = useRef<ReactInstance>(null);
  const printReceiptIdRef = useRef<ReactInstance>(null);

  const [
    showSponsorLevelOptions,
    setShowSponsorLevelOptions,
  ] = useState(false);

  const [hasCompletedPayment, setHasCompletedPayment] = useState<boolean>();

  const handleToggleSponsorLevelOptions = () => {
    setShowSponsorLevelOptions(!showSponsorLevelOptions);
  };

  const handleGetCurrentInvoiceId = (currentInvoiceId: number) => {
    onUpdateSponsorForm({
      ...sponsorForm,
      invoiceId: currentInvoiceId,
    });
  };

  const handleGetCurrentReceiptId = (currentReceiptId: number) => {
    onUpdateSponsorForm({
      ...sponsorForm,
      receiptId: currentReceiptId,
    });
  };

  const handleCompletePaymentStep = (payment: PaypalPayment) => {
    const updatedForm: SponsorFormValues = {
      ...sponsorForm,
      AmountDonated: sponsorForm.AmountDonated,
      PaypalPayerID: payment?.payerID,
      PaypalPaymentID: payment?.paymentID,
      PaymentOption: payment?.paymentID ? 'Paypal' : 'Invoiced',
      invoiceDate: currentDate,
      invoiceId: sponsorForm.invoiceId,
      receiptId: sponsorForm.receiptId,
    };

    doUpdateEntry(
      updatedForm,
      FIRESTORE_SPONSOR_COLLECTION,
      authenticatedUserId,
    );
    onCompleteSponsorStep(2, updatedForm);
  };

  useEffect(() => {
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
  }, []);

  // We want to record the newest invoiceId in the Firestore database
  useEffect(() => {
    if (invoiceId < 1) {
      doGetInvoiceId(handleGetCurrentInvoiceId);
    } else if (previousInvoiceId !== undefined
        && previousInvoiceId < 1 && invoiceId > 0) {
      const updatedForm: SponsorFormValues = {
        ...sponsorForm,
        invoiceId,
      };

      doUpdateEntry(
        updatedForm,
        FIRESTORE_SPONSOR_COLLECTION,
        authenticatedUserId,
      );
    }
  }, [invoiceId, previousInvoiceId]);

  // We want to record the newest receiptId in the Firestore database
  useEffect(() => {
    if (previousReceiptId === 1 && receiptId > 1) {
      const updatedForm: SponsorFormValues = {
        ...sponsorForm,
        receiptId,
      };

      doUpdateEntry(
        updatedForm,
        FIRESTORE_SPONSOR_COLLECTION,
        authenticatedUserId,
      );
    }
  }, [previousReceiptId, receiptId]);

  const handleUpdateCompletedStep = async (payment: PaypalPayment) => {
    await doGetReceiptId(handleGetCurrentReceiptId);
    setHasCompletedPayment(true);
    handleCompletePaymentStep(payment);
  };

  const successfulPaymentElement = (
    <div>
      <Box mb={3}>
        <h2>Successful Payment!</h2>
      </Box>

      <Card
        className={classes.successSponsorInfoCard}
        variant="outlined"
      >
        <h3 className={classes.sponsorLevelHeading}>
          {sponsorForm.SponsorLevel}
          <Typography
            className={classes.sponsorLevelAmount}
            component="span"
            variant="h6"
          >
            — {`$${sponsorForm.AmountDonated}`
              || 'Contact the Executive Secretary for more details'}
          </Typography>
        </h3>

        <Divider />

        <Typography
          className={classes.successOrganizationName}
          variant="body2"
        >
          {sponsorForm.SponsorOrganization}
        </Typography>
        <Typography variant="body2">
          {sponsorForm.OrganizationContactName}, {sponsorForm.Title}
        </Typography>
        <Typography variant="body2">
          {sponsorForm.Email}
        </Typography>
        <Typography variant="body2">
          {sponsorForm.ContactPhone}
        </Typography>

        <Box mt={3}>
          <ReactToPrint
            content={() => printReceiptIdRef.current}
            trigger={() => <RegisterButton>Print Receipt</RegisterButton>}
          />
        </Box>
      </Card>

      <Box
        mt={5}
        mx={4}
      >
        <h2>
          Thank you for sponsoring TMAC for the {currentSchoolYearLong} school year!
        </h2>
      </Box>

      <div css={{ display: 'none' }}>
        <Invoice
          amount={sponsorForm.AmountDonated}
          form={sponsorForm}
          isInvoice={false}
          receiptId={sponsorForm.receiptId}
          ref={printReceiptIdRef}
          sponsorLevel={sponsorForm.SponsorLevel}
          sponsorOrganizationName={sponsorForm.SponsorOrganization}
        />
      </div>
    </div>
  );

  const handleChangeSponsorLevelOnPaymentStep = (event) => {
    const {
      value: newSponsorLevel,
    } = event.target;

    let amountDonated: SponsorFormValues['AmountDonated'] = 1000;
    if (newSponsorLevel === SPONSORSHIP_LEVELS.GOLD_MEDAL) {
      amountDonated = 2000;
    } else if (newSponsorLevel === SPONSORSHIP_LEVELS.CLASS_CHAMPION) {
      amountDonated = 0;
    }

    const updatedForm = {
      ...sponsorForm,
      AmountDonated: amountDonated,
      SponsorLevel: newSponsorLevel,
    };

    doUpdateEntry(
      updatedForm,
      FIRESTORE_SPONSOR_COLLECTION,
      authenticatedUserId,
    );
    onUpdateSponsorForm(updatedForm);
  };

  // We show this if the user has not made a payment
  const invoiceElement = (
    <div>
      <Box mb={6}>
        <Box mb={3}>
          <h3>Pay now with Paypal</h3>
        </Box>

        <FormControl component="fieldset" style={{ marginLeft: 32 }}>
          <h2 className={classes.sponsorLevelHeading}>
            {sponsorForm.SponsorLevel}
            <Typography
              className={classes.sponsorLevelAmount}
              component="span"
            >
              — {sponsorForm.AmountDonated
              ? `$${sponsorForm.AmountDonated}`
              : (
                <span>
                  Contact the{' '}
                  <a href="mailto:jeffrey.turner@allenisd.org">TMAC Executive Secretary</a>{' '}
                  for more details
                </span>
              )}
            </Typography>
          </h2>

          <Box mb={1}>
            <Link
              className={classes.changeLevelLink}
              onClick={handleToggleSponsorLevelOptions}
              underline="always"
            >
              {showSponsorLevelOptions ? 'hide options' : 'change level'}
            </Link>
          </Box>

          <Collapse
            in={showSponsorLevelOptions}
            mountOnEnter
          >
            <FormControl component="fieldset">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label
                className={classes.radioButtonLabel}
                htmlFor="SponsorLevel"
              >
                Sponsor Level*
                <RadioGroup
                  aria-label="SponsorLevel"
                  name="SponsorLevel*"
                  onChange={handleChangeSponsorLevelOnPaymentStep}
                  value={sponsorForm.SponsorLevel}
                >
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label={(
                      <>
                        <Typography component="span">
                          {SPONSORSHIP_LEVELS.SILVER_MEDAL}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          component="span"
                        >
                          {' '} — $1000
                        </Typography>
                      </>
                    )}
                    value={SPONSORSHIP_LEVELS.SILVER_MEDAL}
                  />
                  <FormControlLabel
                    control={<Radio size="small" />}
                    label={(
                      <>
                        <Typography component="span">
                          {SPONSORSHIP_LEVELS.GOLD_MEDAL}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          component="span"
                        >
                          {' '} — $2000
                        </Typography>
                      </>
                    )}
                    value={SPONSORSHIP_LEVELS.GOLD_MEDAL}
                  />
                  <FormControlLabel
                    className={classes.classChampionRadioLabelRoot}
                    control={(
                      <Box clone mb={4}>
                        <Radio size="small" />
                      </Box>
                    )}
                    label={(
                      <>
                        <Typography component="span">
                          {SPONSORSHIP_LEVELS.CLASS_CHAMPION}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          component="span"
                          variant="body2"
                        >
                          {' '} — We want to sponsor a meal and will be in touch with the Executive Secretary
                        </Typography>
                      </>
                    )}
                    value={SPONSORSHIP_LEVELS.CLASS_CHAMPION}
                  />
                </RadioGroup>
              </label>
            </FormControl>
          </Collapse>

          <PaypalButtonWrapper
            amount={sponsorForm?.AmountDonated as number}
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
                Executive Security as detailed on the invoice.
              </li>
            </ol>
          </Box>
          <ReactToPrint
            content={() => printInvoiceRef.current}
            trigger={() => (
              <RegisterButton onClick={updateFirestoreInvoiceId}>
                Print Invoice
              </RegisterButton>
            )}
          />
          <div css={{ display: 'none' }}>
            <Invoice
              amount={sponsorForm.AmountDonated}
              form={sponsorForm}
              invoiceId={sponsorForm.invoiceId}
              isInvoice
              ref={printInvoiceRef}
              sponsorLevel={sponsorForm.SponsorLevel}
              sponsorOrganizationName={sponsorForm.SponsorOrganization}
            />
          </div>

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
    <section>
      <h2>3. Confirm Sponsor Level and make a payment</h2>

      <FormHr />

      {hasCompletedPayment ? successfulPaymentElement : invoiceElement }
    </section>
  );
};

export default RegisterSponsorPayment;
