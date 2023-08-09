/* eslint-disable camelcase */

// External Dependencies
import {
  Box,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { Form, Formik } from 'formik';
import { navigate } from 'gatsby';
import styled from 'styled-components';

// Internal Dependencies
import {
  HandleCompleteMemberStepType,
  MemberFormValues,
} from './MemberRegisterContent';
import { doCreateEntry } from '../../firebase/db';
import { formatPhone } from '../../utils/formatPhone';
import { logError } from '../../utils/logError';
import { registerMemberSchema } from './schemas';
import CtaButton from '../shared/CtaButton';
import CustomTextField from '../shared/CustomTextField';
import FormikCheckbox from '../shared/FormikCheckbox';
import EnhancedAlert from '../shared/EnhancedAlert';
import LoadingContainer from '../shared/LoadingContainer';
import { appNameShort } from '../../utils/app-constants';

// Local Typings
interface Props {
  authenticatedUserId: string;
  initialMemberFormValues: MemberFormValues;
  onCompleteMemberStep: HandleCompleteMemberStepType;
}

// Local Variables
const StyledRoot = styled.div({
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
    textTransform: 'uppercase',
  },
});

// This will tell the Firestore database action where to put the new record
const FIRESTORE_MEMBER_COLLECTION = 'registration';

// Component Definition
const RegisterMemberForm: React.FC<Props> = ({
  authenticatedUserId,
  initialMemberFormValues,
  onCompleteMemberStep,
}) => {
  // We use this to show a loading indicator when switching to Step 3
  const [
    hasCompletedMemberRegisterForm,
    setHasCompletedMemberRegisterForm,
  ] = useState(false);

  const handleCompleteMemberInfoStep = useCallback((updatedMemberForm: MemberFormValues) => {
    setHasCompletedMemberRegisterForm(true);
    onCompleteMemberStep(1, updatedMemberForm);
  }, [onCompleteMemberStep]);

  const handleClickSubmitButton = async (values: MemberFormValues) => {
    if (!authenticatedUserId) {
      return null;
    }

    // Make copy of values
    const updatedValues = values;

    // Format phone values
    updatedValues.OfficePhone = formatPhone(updatedValues.OfficePhone);
    updatedValues.CellPhone = formatPhone(updatedValues.CellPhone);

    const updatedMemberFormWithUserId = {
      ...updatedValues,
      // Convert NewToTMAC to Yes/No string
      NewToTMAC: values.NewToTMAC ? 'Yes' : 'No',
      // The userId is needed to sync the Google Sheet with the Firestore DB
      userId: authenticatedUserId,
    };

    // We delete any values that we
    //  don't need in the synced Google Sheet
    delete updatedValues.honeypot;

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
    <StyledRoot className="login-form">
      <Formik<MemberFormValues>
        enableReinitialize
        initialValues={initialMemberFormValues}
        onSubmit={handleClickSubmitButton}
        validationSchema={registerMemberSchema}
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
                  type="tel"
                  value={values.CellPhone}
                />
              </Box>

              <FormikCheckbox
                inputProps={{
                  'aria-label': `New To ${appNameShort}?`,
                }}
                label={`New To ${appNameShort}?`}
                name="NewToTMAC"
                onChange={handleChange}
              />

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
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  mb={2.5}
                  mt={1}
                  width="100%"
                >
                  <EnhancedAlert severity={hasTouchedform && hasErrors ? 'warning' : 'info'}>
                    Please make sure all required fields above are completed.
                  </EnhancedAlert>
                </Box>

                <CtaButton
                  colorVariant="about"
                  disabled={hasTouchedform && hasErrors}
                  fontWeight={600}
                  rightArrow
                  size="large"
                  type="submit"
                  width={160}
                >
                  Continue
                </CtaButton>
              </div>
            </Form>
          );
        }}
      </Formik>
    </StyledRoot>
  );
};

export default RegisterMemberForm;
