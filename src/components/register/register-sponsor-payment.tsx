// External Dependencies
import {
  Box,
  Collapse,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { Link } from 'gatsby-theme-material-ui';
import React, {
  ReactInstance, useCallback, useEffect, useRef, useState
} from 'react';
import ReactToPrint from 'react-to-print';
import format from 'date-fns/format';
import styled from 'styled-components';

// Internal Dependencies
import { SponsorFormValues } from './SponsorRegisterContent';
import {
  doGetInvoiceId,
  doUpdateEntry,
  doUpdateInvoiceId as updateFirestoreInvoiceId,
} from '../../firebase/db';
import { appNameShort } from '../../utils/app-constants';
import { classChampionAlreadySecured } from './register-sponsor-form';
import CtaButton from '../shared/CtaButton';
import EnhancedAlert from '../shared/EnhancedAlert';
import FormDivider from '../shared/FormDivider';
import FormTitle from '../shared/FormTitle';
import Invoice from './invoice';
import usePrevious from '../../utils/hooks/usePrevious';

// Local Typings
interface Props {
  authenticatedUserId: string | undefined;
  onUpdateSponsorForm: (form: SponsorFormValues) => void;
  sponsorForm: SponsorFormValues;
}

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.changeLevelLink': {
    cursor: 'pointer',
  },
  '.disabledText': {
    color: theme.palette.text.disabled,
  },
  '.classChampionRadioLabelRoot': {
    alignItems: 'flex-start',
    display: 'flex',
  },
  '.radioButtonLabel': {
    display: 'block',
    fontSize: '90%',
    letterSpacing: '0.05rem',
    marginTop: '0.3rem',
    marginBottom: 0,
  },
}));

const SPONSORSHIP_LEVELS = {
  CLASS_CHAMPION: 'Class Champion',
  GOLD_MEDAL: 'Gold Medal',
  SILVER_MEDAL: 'Silver Medal',
};

const currentDate = format(new Date(), 'M/d/yyyy');

// This will tell the Firestore database action where to put the new record
const FIRESTORE_SPONSOR_COLLECTION = 'sponsor';

// Component Definition
const RegisterSponsorPayment: React.FC<Props> = ({
  authenticatedUserId,
  onUpdateSponsorForm,
  sponsorForm,
}) => {
  const {
    invoiceId,
    receiptId,
  } = sponsorForm;

  const previousInvoiceId = usePrevious(invoiceId);
  const previousReceiptId = usePrevious(receiptId);

  // We have these refs for printing invoice
  const printInvoiceRef = useRef<ReactInstance>(null);

  const [
    showSponsorLevelOptions,
    setShowSponsorLevelOptions,
  ] = useState(false);

  const handleToggleSponsorLevelOptions = useCallback(() => {
    setShowSponsorLevelOptions(!showSponsorLevelOptions);
  }, [showSponsorLevelOptions]);

  const handleGetCurrentInvoiceId = useCallback((currentInvoiceId: number) => {
    onUpdateSponsorForm({
      ...sponsorForm,
      invoiceId: currentInvoiceId,
    });
  }, [onUpdateSponsorForm, sponsorForm]);

  useEffect(() => {
    // On unmount
    return () => {
      // Increment receipt id value in Firestore
      updateFirestoreInvoiceId();
    };
  }, []);

  // We want to record the newest invoiceId in the Firestore database
  useEffect(() => {
    if (invoiceId < 1) {
      doGetInvoiceId(handleGetCurrentInvoiceId);
    } else if (previousInvoiceId === 0 && invoiceId > 0) {
      const updatedForm: SponsorFormValues = {
        ...sponsorForm,
        invoiceDate: currentDate,
        invoiceId,
      };

      doUpdateEntry(
        updatedForm,
        FIRESTORE_SPONSOR_COLLECTION,
        authenticatedUserId,
      );
      onUpdateSponsorForm(updatedForm);
    }
  }, [
    authenticatedUserId,
    handleGetCurrentInvoiceId,
    invoiceId,
    onUpdateSponsorForm,
    previousInvoiceId,
    sponsorForm,
  ]);

  // We want to record the newest receiptId in the Firestore database
  useEffect(() => {
    if (previousReceiptId === 0 && receiptId > 0) {
      const updatedForm: SponsorFormValues = {
        ...sponsorForm,
        receiptDate: currentDate,
        receiptId,
      };

      doUpdateEntry(
        updatedForm,
        FIRESTORE_SPONSOR_COLLECTION,
        authenticatedUserId,
      );
      onUpdateSponsorForm(updatedForm);
    }
  }, [authenticatedUserId, onUpdateSponsorForm, previousReceiptId, receiptId, sponsorForm]);

  const handleChangeSponsorLevelOnPaymentStep = useCallback((event) => {
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
  }, [authenticatedUserId, onUpdateSponsorForm, sponsorForm]);

  return (
    <StyledRoot>
      <FormTitle>
        3. Confirm Sponsor Level and send payment
      </FormTitle>

      <FormDivider />

      <div>
        <Box mb={6}>
          <Box mb={3}>
            <h3>Sponsor Level</h3>
          </Box>

          <FormControl
            component="fieldset"
            style={{ marginLeft: 24 }}
          >
            <EnhancedAlert>
              <strong>{sponsorForm.SponsorLevel}</strong>

              <Typography>
                {sponsorForm.AmountDonated
                  ? `$${sponsorForm.AmountDonated.toLocaleString()}`
                  : (
                    <span>
                      Contact the{' '}
                      <a href="mailto:petwar1@yahoo.com">{appNameShort} Executive Secretary</a>{' '}
                      for more details
                    </span>
                  )}
              </Typography>
            </EnhancedAlert>

            <Box
              mt={2}
              mb={showSponsorLevelOptions ? 2 : 0}
            >
              <Link
                className="changeLevelLink"
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
                  className="radioButtonLabel"
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
                      className="classChampionRadioLabelRoot"
                      control={(
                        <Box mb={4}>
                          <Radio
                            disabled={classChampionAlreadySecured}
                            size="small"
                          />
                        </Box>
                      )}
                      label={(
                        <>
                          <Typography
                            className={classChampionAlreadySecured ? 'disabledText' : ''}
                            component="span"
                          >
                            {SPONSORSHIP_LEVELS.CLASS_CHAMPION}
                          </Typography>
                          <Typography
                            className={classChampionAlreadySecured ? 'disabledText' : ''}
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
          </FormControl>
        </Box>

        <div>
          <h3>Submit Payment to {appNameShort}</h3>

          <Box
            ml={3}
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
                  width={180}
                >
                  Print Invoice
                </CtaButton>
              )}
            />

            <Box display="none">
              <Invoice
                amount={sponsorForm.AmountDonated}
                form={sponsorForm}
                invoiceId={sponsorForm.invoiceId}
                isInvoice
                ref={printInvoiceRef}
                sponsorLevel={sponsorForm.SponsorLevel}
                sponsorOrganizationName={sponsorForm.SponsorOrganization}
              />
            </Box>

            <Box mt={3}>
              If your organization requires an IRS W-9 Form from {appNameShort},
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
    </StyledRoot>
  );
};

export default RegisterSponsorPayment;
