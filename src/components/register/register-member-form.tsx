/* eslint-disable camelcase */

// External Dependencies
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { Form, Formik } from 'formik';
import { makeStyles } from '@mui/styles';
import { navigate } from 'gatsby';

// Internal Dependencies
import {
  HandleCompleteMemberStepType,
  MemberFormValues,
} from '../../pages/members/register';
import { doCreateEntry } from '../../firebase/db';
import { formatPhone } from '../../utils/formatPhone';
import { logError } from '../../utils/logError';
import { registerMemberSchema } from './schemas';
import CustomTextField from '../shared/CustomTextField';
import EnhancedAlert from '../shared/EnhancedAlert';
import LoadingContainer from '../shared/LoadingContainer';
import RegisterButton from './register-button';

// Local Typings
interface Props {
  authenticatedUserId: string;
  initialMemberFormValues: MemberFormValues;
  memberForm: MemberFormValues;
  onCompleteMemberStep: HandleCompleteMemberStepType;
  onUpdateMemberForm: (updatedMemberForm: MemberFormValues) => void;
}

// Local Variables
const useStyles = makeStyles({
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
    textTransform: 'uppercase',
  },
});

// This will tell the Firestore database action where to put the new record
const FIRESTORE_MEMBER_COLLECTION = 'registration';

// Component Definition
const RegisterMemberForm: FC<Props> = ({
  authenticatedUserId,
  initialMemberFormValues,
  memberForm,
  onCompleteMemberStep,
  onUpdateMemberForm,
}) => {
  const classes = useStyles();

  // We use this to show a loading indicator when switching to Step 3
  const [
    hasCompletedMemberRegisterForm,
    setHasCompletedMemberRegisterForm,
  ] = useState(false);

  if (!authenticatedUserId) {
    return null;
  }

  const { NewToTMAC } = memberForm;

  const handleCompleteMemberInfoStep = (updatedMemberForm: MemberFormValues) => {
    setHasCompletedMemberRegisterForm(true);
    onCompleteMemberStep(1, updatedMemberForm);
  };

  const handleClickSubmitButton = async (values: MemberFormValues) => {
    if (!authenticatedUserId) {
      return null;
    }

    // Make copy of values
    const updatedValues = values;

    // Right here we should delete any values that we
    //  don't need in the synced Google Sheet
    delete updatedValues.honeypot;

    // Send phone values in formatted
    updatedValues.OfficePhone = formatPhone(updatedValues.OfficePhone);
    updatedValues.CellPhone = formatPhone(updatedValues.CellPhone);

    // The userId is needed to sync the Google Sheet with the Firestore DB
    const updatedMemberFormWithUserId = {
      ...updatedValues,
      userId: authenticatedUserId,
    };

    try {
      await doCreateEntry(
        updatedMemberFormWithUserId,
        FIRESTORE_MEMBER_COLLECTION,
        authenticatedUserId,
        handleCompleteMemberInfoStep,
      );
    } catch (error) {
      logError('handleClickSubmitButton error in RegisterMemberForm', error);
    }
  };

  const handleChangeNewToTMAC = (event) => {
    const { value: updatedNewToTMACVAlue } = event.target;

    onUpdateMemberForm({
      ...memberForm,
      NewToTMAC: updatedNewToTMACVAlue,
    });
  };

  if (!authenticatedUserId) {
    navigate('/members');
  }

  if (hasCompletedMemberRegisterForm) {
    return (
      <LoadingContainer
        step={3}
        title="Member Information Form Complete"
      />
    );
  }

  return (
    <div className="login-form">
      <Formik
        initialValues={initialMemberFormValues}
        validationSchema={registerMemberSchema}
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
                  errorMessage={errors.FirstName}
                  hasError={Boolean(errors.FirstName)}
                  isTouched={touched.FirstName}
                  label="First Name*"
                  name="FirstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.FirstName}
                />
              </Box>

              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.LastName}
                  hasError={Boolean(errors.LastName)}
                  isTouched={touched.LastName}
                  label="Last Name*"
                  name="LastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.LastName}
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
                  errorMessage={errors.District}
                  hasError={Boolean(errors.District)}
                  isTouched={touched.District}
                  label="District*"
                  name="District"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.District}
                />
              </Box>

              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.Address1}
                  hasError={Boolean(errors.Address1)}
                  isTouched={touched.Address1}
                  label="Address 1*"
                  name="Address1"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Address1}
                />
              </Box>

              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.Address2}
                  hasError={Boolean(errors.Address2)}
                  isTouched={touched.Address2}
                  label="Address 2"
                  name="Address2"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Address2}
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
                  errorMessage={errors.OfficePhone}
                  hasError={Boolean(errors.OfficePhone)}
                  isTouched={touched.OfficePhone}
                  label="Office Phone*"
                  name="OfficePhone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="tel"
                  value={values.OfficePhone}
                />
              </Box>

              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.CellPhone}
                  hasError={Boolean(errors.CellPhone)}
                  isTouched={touched.CellPhone}
                  label="Cell Phone*"
                  name="CellPhone"
                  onBlur={handleBlur}
                  // onChange={handleChange}
                  type="tel"
                  value={values.CellPhone}
                />
              </Box>

              <FormControl component="fieldset">
                {/* eslint-disable-next-line */}
                <label className={classes.radioButtonLabel} htmlFor="NewToTMAC">
                  New To TMAC*
                  <RadioGroup
                    aria-label="NewToTMAC"
                    name="NewToTMAC"
                    onChange={handleChangeNewToTMAC}
                    value={NewToTMAC}
                  >
                    <FormControlLabel
                      control={<Radio size="small" />}
                      label="Yes"
                      value="Yes"
                    />
                    <FormControlLabel
                      control={<Radio size="small" />}
                      label="No"
                      value="No"
                    />
                  </RadioGroup>
                </label>
              </FormControl>

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
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
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

export default RegisterMemberForm;
