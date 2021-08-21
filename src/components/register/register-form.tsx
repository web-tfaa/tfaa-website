/* eslint-disable camelcase */

// External Dependencies
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import React, { FC } from 'react';
import { navigate } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';

// Internal Dependencies
import EnhancedAlert from '../shared/EnhancedAlert';
import AuthUserContext from '../session/AuthUserContext';
import LoadingContainer from '../shared/LoadingContainer';
import RegisterButton from './register-button';
import { removeErrorKeys } from '../../utils/helpers';
import {
  HandleCompleteStepType,
  IRegisterForm,
} from '../../pages/members/register';
import { doCreateEntry } from '../../firebase/db';
import { logError } from '../../utils/logError';
import { formatPhone } from '../../utils/formatPhone';
import { registerMemberSchema } from './schemas';
import CustomTextField from '../shared/CustomTextField';

// Local Typings
interface ContextProps {
  initialFormValues: IRegisterForm;
  onCompleteStep: HandleCompleteStepType;
  onSetForm: (form: IRegisterForm) => void;
  registerForm: IRegisterForm;
}

interface Props extends ContextProps {
  authUser: {
    uid: string;
  } | null;
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

// const stripPhone = (phone) => phone.replace(/[^0-9]+/g, '');

// Component Definition
const RegisterForm: FC<Props> = ({
  authUser,
  initialFormValues,
  onCompleteStep,
  onSetForm,
  registerForm,
}) => {
  const classes = useStyles();

  if (!authUser) {
    return null;
  }

  const {
    NewToTMAC,
    hasCompletedRegisterInfoForm,
    isAuthenticated,
  } = registerForm;

  const handleCompleteInfoStep = () => {
    setTimeout(() => onCompleteStep(0), 2200);
  };

  const handleClickSubmitButton = async (values: IRegisterForm) => {
    if (!authUser) {
      return null;
    }

    // Make copy of values
    const updatedValues = values;

    const { uid: authenticatedUserId } = authUser;

    // This will identify each row in the database and serve as the document name
    const documentId = authenticatedUserId;

    // Delete any values that we don't need in the synced Google Sheet
    const form = removeErrorKeys(updatedValues);
    delete form.isAuthenticated;
    delete form.honeypot;
    delete form.hasCompletedRegisterInfoForm;

    // Send phone values in formatted
    form.OfficePhone = formatPhone(form.OfficePhone);
    form.CellPhone = formatPhone(form.CellPhone);

    // This will tell the database action where to put the new record
    const collection = 'registration';

    // The userId is needed to sync the Google Sheet with the Firestore DB
    const formWithUserId = {
      ...form,
      userId: authenticatedUserId,
    };

    try {
      await doCreateEntry(formWithUserId, collection, documentId);
      await onSetForm({
        ...formWithUserId,
        hasCompletedRegisterInfoForm: true,
      });

      handleCompleteInfoStep();
    } catch (error) {
      logError('handleClickSubmitButton error in RegisterForm', error);
    }
  };

  const handleChangeNewToTMAC = (event) => {
    onSetForm({
      ...registerForm,
      NewToTMAC: event.target.value,
    });
  };

  if (isAuthenticated) {
    navigate('/members');
  }

  if (hasCompletedRegisterInfoForm) {
    return (
      <LoadingContainer
        step={3}
        title="Information Form Complete"
      />
    );
  }

  return (
    <div className="login-form">
      <Formik
        initialValues={initialFormValues}
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

const RegisterFormWithContext: FC<ContextProps> = (props) => (
  <AuthUserContext.Consumer>
    {(authUser) => <RegisterForm {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default RegisterFormWithContext;
