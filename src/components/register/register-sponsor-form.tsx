// External Dependencies
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Form, Formik } from 'formik';

// Internal Dependencies
import AuthUserContext from '../session/AuthUserContext';
import EnhancedAlert from '../shared/EnhancedAlert';
import LoadingContainer from '../shared/LoadingContainer';
import RegisterButton from './register-button';
import {
  HandleCompleteSponsorStepType,
  SponsorFormValues,
} from '../../pages/sponsors/register';
import { logError } from '../../utils/logError';
import { removeErrorKeys } from '../../utils/helpers';
import {
  doCreateEntry,
} from '../../firebase/db';
import { registerSponsorSchema } from './schemas';
import CustomTextField from '../shared/CustomTextField';
import { SPONSORSHIP_LEVELS } from '../shared/sponsor-card';

// Local Typings
interface ContextProps {
  initialSponsorFormValues: SponsorFormValues;
  onCompleteStep: HandleCompleteSponsorStepType;
  onSetSponsorForm: (form: SponsorFormValues) => void;
  sponsorForm: SponsorFormValues;
}

interface Props extends ContextProps {
  authUser: {
    uid: string;
  } | null;
}

// Local Variables
const useStyles = makeStyles({
  classChampionRadioLabelRoot: {
    alighItems: 'flex-start',
    display: 'flex',
  },
  honey: {
    height: 1,
    opacity: 0,
    width: 1,
  },
  radioButtonLabel: {
    display: 'block',
    fontSize: '90%',
    letterSpacing: '0.05rem',
    marginTop: '0.3rem',
    marginBottom: 0,
  },
  websiteAddressSubText: {
    fontSize: '0.8rem',
    textTransform: 'none',
  },
});

// Local Functions
const formatPhone = (phone) => {
  let cleanPhone = phone;
  if (cleanPhone.startsWith('1')) {
    cleanPhone = cleanPhone.slice(1);
  }
  if (cleanPhone.length !== 10) {
    return phone;
  }
  return `(${cleanPhone.substr(0, 3)}) ${cleanPhone.substr(
    3,
    3,
  )}-${cleanPhone.substr(6, 4)}`;
};

// Component Definition
const RegisterSponsorForm: FC<Props> = ({
  authUser,
  initialSponsorFormValues,
  onCompleteStep,
  onSetSponsorForm,
  sponsorForm,
}) => {
  const classes = useStyles();

  if (!authUser) {
    return null;
  }

  const [
    hasCompletedRegisterSponsorForm,
    setHasCompletedRegisterSponsorForm,
  ] = useState(false);

  const { SponsorLevel } = sponsorForm;

  console.log('current sponsor form', sponsorForm);

  const handleCompleteInfoStep = () => {
    setTimeout(() => onCompleteStep(0), 1200);
  };

  const handleUpdateCompletedStep = () => {
    setHasCompletedRegisterSponsorForm(true);
    handleCompleteInfoStep();
  };

  const handleClickSubmitButton = async (values: SponsorFormValues) => {
    if (!authUser) {
      return null;
    }

    // Make copy of values
    const updatedValues = values;

    const { uid: authenticatedUserId } = authUser;

    // This will identify each row in the database and serve as the document name
    const documentId = authenticatedUserId;

    // Delete any values that we don't need in the synced Google Sheet
    const updatedForm = removeErrorKeys(updatedValues);
    // delete form.isAuthenticated;
    delete updatedForm.honeypot;
    delete updatedForm.hasCompletedRegisterSponsorForm;

    // Send phone values in formatted
    updatedForm.ContactPhone = formatPhone(updatedForm.ContactPhone);

    // This will tell the database action where to put the new record
    const collection = 'sponsor';

    // The userId is needed to sync the Google Sheet with the Firestore DB
    const updatedFormWithUserId = {
      ...updatedForm,
      userId: authenticatedUserId,
    };

    try {
      await doCreateEntry(updatedFormWithUserId, collection, documentId);
      await onSetSponsorForm({
        ...updatedFormWithUserId,
        hasCompletedRegisterSponsorForm: true,
      });

      handleCompleteInfoStep();
    } catch (error) {
      logError('handleClickSubmitButton error in RegisterSponsorForm', error);
    }

    doCreateEntry(updatedFormWithUserId, collection, documentId, handleUpdateCompletedStep);
  };

  const handleChangeSponsorLevel = (event) => {
    const {
      value: newSponsorLevel,
    } = event.target;

    let amountDonated: SponsorFormValues['AmountDonated'] = 1000;
    if (newSponsorLevel === SPONSORSHIP_LEVELS.GOLD_MEDAL) {
      amountDonated = 2000;
    } else if (newSponsorLevel === SPONSORSHIP_LEVELS.CLASS_CHAMPION) {
      amountDonated = null;
    }

    onSetSponsorForm({
      ...sponsorForm,
      AmountDonated: amountDonated,
      SponsorLevel: newSponsorLevel,
    });
  };

  if (hasCompletedRegisterSponsorForm) {
    return (
      <LoadingContainer
        step={3}
        title="Sponsor Information Form Complete"
      />
    );
  }

  return (
    <div className="login-form">
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
                <label className={classes.radioButtonLabel} htmlFor="SponsorLevel">
                  Sponsor Level*
                  <RadioGroup
                    aria-label="SponsorLevel"
                    name="SponsorLevel*"
                    onChange={handleChangeSponsorLevel}
                    value={SponsorLevel}
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
                        <Box mb={4}>
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
                className={classes.honey}
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
                  clone
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
    </div>
  );
};

const RegisterSponsorFormWithContext: FC<ContextProps> = (props) => (
  <AuthUserContext.Consumer>
    {(authUser) => <RegisterSponsorForm {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default RegisterSponsorFormWithContext;
