// External Dependencies
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import React, { FC, useCallback, useState } from 'react';
import { Form, Formik } from 'formik';
import styled from 'styled-components';

// Internal Dependencies
import {
  HandleCompleteSponsorStepType,
  SponsorFormValues,
} from '../../pages/sponsors/register';
import { SPONSORSHIP_LEVELS } from '../shared/sponsor-card';
import { doCreateEntry } from '../../firebase/db';
import { formatPhone } from '../../utils/formatPhone';
import { logError } from '../../utils/logError';
import { registerSponsorSchema } from './schemas';
import CustomTextField from '../shared/CustomTextField';
import EnhancedAlert from '../shared/EnhancedAlert';
import LoadingContainer from '../shared/LoadingContainer';
import RegisterButton from './register-button';
import theme from '../../gatsby-theme-material-ui-top-layout/theme';

// Local Typings
interface Props {
  authenticatedUserId: string;
  initialSponsorFormValues: SponsorFormValues;
  onCompleteSponsorStep: HandleCompleteSponsorStepType;
  onUpdateSponsorForm: (form: SponsorFormValues) => void;
  sponsorForm: SponsorFormValues;
}

// Local Variables
const StyledRoot = styled.div({
  '.classChampionRadioLabelRoot': {
    alighItems: 'flex-start',
    display: 'flex',
  },
  '.disabledText': {
    color: theme.palette.text.disabled,
  },
  '.honey': {
    height: 1,
    opacity: 0,
    width: 1,
  },
  '.radioButtonLabel': {
    display: 'block',
    fontSize: '90%',
    letterSpacing: '0.05rem',
    marginTop: '0.3rem',
    marginBottom: 0,
  },
  '.websiteAddressSubText': {
    fontSize: '0.8rem',
    textTransform: 'none',
  },
});

// This will tell the Firestore database action where to put the new record
const FIRESTORE_SPONSOR_COLLECTION = 'sponsor';

const classChampionAlreadySecured = true;

// Component Definition
const RegisterSponsorForm: FC<Props> = ({
  authenticatedUserId,
  initialSponsorFormValues,
  onCompleteSponsorStep,
  onUpdateSponsorForm,
  sponsorForm,
}) => {
  // We use this to show a loading indicator when switching to Step 3
  const [
    hasCompletedRegisterSponsorForm,
    setHasCompletedRegisterSponsorForm,
  ] = useState(false);

  const handleCompleteInfoStep = useCallback((updatedForm: SponsorFormValues) => {
    setHasCompletedRegisterSponsorForm(true);
    onCompleteSponsorStep(1, updatedForm);
  }, [onCompleteSponsorStep]);

  const handleClickSubmitButton = async (values: SponsorFormValues) => {
    if (!authenticatedUserId) {
      return null;
    }

    // Make copy of values
    const updatedValues = values;

    // Right here we should delete any values that we
    //  don't need in the synced Google Sheet
    delete updatedValues.honeypot;

    // Send phone values in formatted
    updatedValues.ContactPhone = formatPhone(updatedValues.ContactPhone);

    // The userId is needed to sync the Google Sheet with the Firestore DB
    const updatedFormWithUserId = {
      ...updatedValues,
      AmountDonated: sponsorForm.AmountDonated,
      SponsorLevel: sponsorForm.SponsorLevel,
      userId: authenticatedUserId,
    };

    try {
      await doCreateEntry(
        updatedFormWithUserId,
        FIRESTORE_SPONSOR_COLLECTION,
        authenticatedUserId,
        handleCompleteInfoStep,
      );
    } catch (error) {
      logError('handleClickSubmitButton error in RegisterSponsorForm', error);
    }
  };

  const handleChangeSponsorLevel = useCallback((event) => {
    const {
      value: newSponsorLevel,
    } = event.target;

    let amountDonated: SponsorFormValues['AmountDonated'] = 1000;
    if (newSponsorLevel === SPONSORSHIP_LEVELS.GOLD_MEDAL) {
      amountDonated = 2000;
    } else if (newSponsorLevel === SPONSORSHIP_LEVELS.CLASS_CHAMPION) {
      amountDonated = 0;
    }

    onUpdateSponsorForm({
      ...sponsorForm,
      AmountDonated: amountDonated,
      SponsorLevel: newSponsorLevel,
    });
  }, [onUpdateSponsorForm, sponsorForm]);

  if (!authenticatedUserId) {
    return null;
  }

  if (hasCompletedRegisterSponsorForm) {
    return (
      <LoadingContainer
        step={3}
        title="Sponsor Information Form Complete"
      />
    );
  }

  return (
    <StyledRoot className="login-form">
      <Formik
        initialValues={initialSponsorFormValues}
        validationSchema={registerSponsorSchema}
        onSubmit={handleClickSubmitButton}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
        }) => {
          const hasTouchedform = Object.values(touched).length > 0;
          const hasErrors = Object.values(errors).length > 0;

          return (
            <Form onSubmit={handleSubmit}>
              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.SponsorOrganization}
                  hasError={Boolean(errors.SponsorOrganization)}
                  isTouched={touched.SponsorOrganization}
                  label="Sponsor Organization*"
                  name="SponsorOrganization"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.SponsorOrganization}
                />
              </Box>

              <FormControl component="fieldset">
                {/* eslint-disable-next-line */}
                <label
                  className="radioButtonLabel"
                  htmlFor="SponsorLevel"
                >
                  Sponsor Level*
                  <RadioGroup
                    aria-label="SponsorLevel"
                    name="SponsorLevel*"
                    onChange={handleChangeSponsorLevel}
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
                        <Box marginBottom={4}>
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

              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.OrganizationWebsiteAddress}
                  hasError={Boolean(errors.OrganizationWebsiteAddress)}
                  isTouched={touched.OrganizationWebsiteAddress}
                  label="Organization Website Address*"
                  name="OrganizationWebsiteAddress"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.OrganizationWebsiteAddress}
                />
              </Box>

              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.OrganizationContactName}
                  hasError={Boolean(errors.OrganizationContactName)}
                  isTouched={touched.OrganizationContactName}
                  label="Organization Contact Name*"
                  name="OrganizationContactName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.OrganizationContactName}
                />
              </Box>

              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.Title}
                  hasError={Boolean(errors.Title)}
                  isTouched={touched.Title}
                  label="Title*"
                  name="Title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Title}
                />
              </Box>

              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.ContactAddress1}
                  hasError={Boolean(errors.ContactAddress1)}
                  isTouched={touched.ContactAddress1}
                  label="Contact Address 1*"
                  name="ContactAddress1"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ContactAddress1}
                />
              </Box>

              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.ContactAddress2}
                  hasError={Boolean(errors.ContactAddress2)}
                  isTouched={touched.ContactAddress2}
                  label="Contact Address 2"
                  name="ContactAddress2"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ContactAddress2}
                />
              </Box>

              <Box
                display="flex"
                mb={3}
              >
                <Box mb={0}>
                  <CustomTextField
                    errorMessage={errors.City}
                    hasError={Boolean(errors.City)}
                    isTouched={touched.City}
                    label="City*"
                    name="City"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.City}
                  />
                </Box>

                <Box
                  mb={0}
                  ml={1.5}
                  width="50%"
                >
                  <CustomTextField
                    errorMessage={errors.State}
                    hasError={Boolean(errors.State)}
                    isTouched={touched.State}
                    label="State*"
                    name="State"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.State}
                  />
                </Box>
              </Box>

              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.ZipCode}
                  hasError={Boolean(errors.ZipCode)}
                  isTouched={touched.ZipCode}
                  label="Zip Code*"
                  name="ZipCode"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ZipCode}
                />
              </Box>

              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.Email}
                  hasError={Boolean(errors.Email)}
                  isTouched={touched.Email}
                  label="Email*"
                  name="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Email}
                />
              </Box>

              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.ContactPhone}
                  hasError={Boolean(errors.ContactPhone)}
                  isTouched={touched.ContactPhone}
                  label="Contact Phone*"
                  name="ContactPhone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="tel"
                  value={values.ContactPhone}
                />
              </Box>

              {/* Hidden input to help curtail spam */}
              <input
                aria-label="hidden input"
                className="honey"
                id="honeypot"
                name="honeypot"
                onChange={handleChange}
                type="text"
                value={values.honeypot}
              />

              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Box
                  mb={2.5}
                  mt={1}
                  width="100%"
                >
                  <EnhancedAlert severity={hasTouchedform && hasErrors ? 'error' : 'info'}>
                    Please make sure all required fields above are completed.
                  </EnhancedAlert>
                </Box>

                <RegisterButton
                  buttonType="submit"
                  isDisabled={hasTouchedform && hasErrors}
                >
                  Continue to Step 3
                </RegisterButton>
              </div>
            </Form>
          );
        }}
      </Formik>
    </StyledRoot>
  );
};

export default RegisterSponsorForm;
