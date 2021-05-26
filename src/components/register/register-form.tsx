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
import {
  // emailRegex,
  removeErrorKeys,
  // zipCodeRegex,
} from '../../utils/helpers';
import {
  HandleCompleteStepType,
  IRegisterForm,
} from '../../pages/members/register';
import { doCreateEntry } from '../../firebase/db';
import { logError } from '../../utils/logError';
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
    hasCompletedRegisterInfoForm,
    isAuthenticated,
  } = registerForm;

  const handleCompleteInfoStep = () => {
    setTimeout(() => onCompleteStep(0), 2200);
  };

  const handleClickSubmitButton = async (
    values: IRegisterForm,
  ) => {
    if (!authUser) {
      return null;
    }

    // Make copy of values
    const updatedValues = values;

    const { uid: authenticatedUserId } = authUser;

    // This will identify each row in the database and serve as the document name
    const documentId = authenticatedUserId;

    // The Google Sheet doesn't need these values
    const form = removeErrorKeys(updatedValues);
    delete form.isAuthenticated;
    delete form.honeypot;
    delete form.hasCompletedRegisterInfoForm;

    // We set the new to TMAC value to what the radio button value was
    // form.NewToTMAC = form.radioValue;
    // delete form.radioValue;

    // Send phone values in formatted
    form.OfficePhone = formatPhone(form.OfficePhone);
    form.CellPhone = formatPhone(form.CellPhone);

    // This will tell the database action where to put the new record
    const collection = 'registration';

    try {
      await doCreateEntry(form, collection, documentId);
      await onSetForm({
        ...form,
        hasCompletedRegisterInfoForm: true,
      });
      handleCompleteInfoStep();
    } catch (error) {
      logError('handleClickSubmitButton error in RegisterForm', error);
    }

    // Update the form data and advance the steps with the above callback function
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
    return <LoadingContainer step={3} title="Information Form Complete" />;
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
          // console.log('errorss.........', errors);
          console.log('touched.........', touched);

          const hasTouchedform = Object.values(touched).length > 0;
          const hasErrors = Object.values(errors).length > 0;

          return (
            <Form onSubmit={handleSubmit}>
              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.FirstName}
                  hasError={Boolean(errors.FirstName)}
                  id="FirstName"
                  isTouched={touched.FirstName}
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.FirstName}
                />
              </Box>

              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.LastName}
                  hasError={Boolean(errors.LastName)}
                  id="LastName"
                  isTouched={touched.LastName}
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.LastName}
                />
              </Box>

              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.Title}
                  hasError={Boolean(errors.Title)}
                  id="Title"
                  isTouched={touched.Title}
                  label="Title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Title}
                />
              </Box>

              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.District}
                  hasError={Boolean(errors.District)}
                  id="District"
                  isTouched={touched.District}
                  label="District"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.District}
                />
              </Box>

              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.Address1}
                  hasError={Boolean(errors.Address1)}
                  id="Address1"
                  isTouched={touched.Address1}
                  label="Address 1"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Address1}
                />
              </Box>

              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.Address2}
                  hasError={Boolean(errors.Address2)}
                  id="Address2"
                  isTouched={touched.Address2}
                  label="Address 2"
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
                    id="City"
                    isTouched={touched.City}
                    label="City"
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
                    id="State"
                    isTouched={touched.State}
                    label="State"
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
                  id="ZipCode"
                  isTouched={touched.ZipCode}
                  label="Zip Code"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ZipCode}
                />
              </Box>

              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.Email}
                  hasError={Boolean(errors.Email)}
                  id="Email"
                  isTouched={touched.Email}
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Email}
                />
              </Box>

              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.OfficePhone}
                  hasError={Boolean(errors.OfficePhone)}
                  id="OfficePhone"
                  isTouched={touched.OfficePhone}
                  label="Office Phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.OfficePhone}
                />
              </Box>

              <Box mb={3}>
                <CustomTextField
                  errorMessage={errors.CellPhone}
                  hasError={Boolean(errors.CellPhone)}
                  id="CellPhone"
                  isTouched={touched.CellPhone}
                  label="Cell Phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
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
                    value={values.NewToTMAC}
                  >
                    <FormControlLabel control={<Radio size="small" />} label="Yes" value="Yes" />
                    <FormControlLabel control={<Radio size="small" />} label="No" value="No" />
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
