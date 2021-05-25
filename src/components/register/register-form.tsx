/* eslint-disable camelcase */

// External Dependencies
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  // TextField,
} from '@material-ui/core';
import React, {
  FC, useCallback, useState
} from 'react';
import clsx from 'clsx';
import { navigate } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Field, Form } from 'formik';

// Internal Dependencies
import EnhancedAlert from '../shared/EnhancedAlert';
import AuthUserContext from '../session/AuthUserContext';
import LoadingContainer from '../shared/LoadingContainer';
import RegisterButton from './register-button';
import { options } from '../../utils/typography';
import {
  emailRegex,
  removeErrorKeys,
  zipCodeRegex,
} from '../../utils/helpers';
import {
  HandleCompleteStepType,
  IRegisterForm,
} from '../../pages/members/register';
import { doCreateEntry } from '../../firebase/db';
import { logError } from '../../utils/logError';
import { registerMemberSchema } from './schemas';

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
const useStyles = makeStyles((theme) => ({
  cityContainer: {
    marginBottom: 0,
  },
  cityStateContainer: {
    display: 'flex',
  },
  error: {
    color: theme.palette.error.main,
    fontFamily: options.bodyFontFamily.join(','),
    fontWeight: 500,
    marginTop: '0.4rem',
    textTransform: 'initial',
  },
  honey: {
    height: 1,
    opacity: 0,
    width: 1,
  },
  input: {
    display: 'block',
    fontSize: '1rem',
    minWidth: '70%',
    padding: '0.3rem',
  },
  label: {
    display: 'block',
    fontSize: '90%',
    letterSpacing: '0.05rem',
    marginTop: theme.spacing(2),
    textTransform: 'uppercase',
  },
  radioButtonLabel: {
    display: 'block',
    fontSize: '90%',
    letterSpacing: '0.05rem',
    marginTop: '0.3rem',
    marginBottom: 0,
    textTransform: 'uppercase',
  },
  stateContainer: {
    marginLeft: theme.spacing(1.5),
    marginBottom: 0,
    width: '40%',
  },
  stateInput: {
    width: '80%',
  },
}));

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

const stripPhone = (phone) => phone.replace(/[^0-9]+/g, '');

// Component Definition
const RegisterForm: FC<Props> = ({
  authUser,
  initialFormValues,
  onCompleteStep,
  onSetForm,
  registerForm,
}) => {
  const classes = useStyles();

  const [isFormTouched, setIsFormTouched] = useState(false);

  if (!authUser) {
    return null;
  }

  // Pull the form values out
  const {
    Address1,
    Address1Error,
    Address2,
    CellPhone,
    CellPhoneError,
    City,
    CityError,
    District,
    DistrictError,
    Email,
    EmailError,
    FirstName,
    FirstNameError,
    LastName,
    LastNameError,
    NewToTMAC,
    OfficePhone,
    OfficePhoneError,
    State,
    StateError,
    Title,
    TitleError,
    ZipCode,
    ZipCodeError,
    hasCompletedRegisterInfoForm,
    honeypot,
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

    // event.preventDefault();

    // const {

    // } = updatedValues;

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

  const handleUpdateEmailError = (value) => {
    if (!value) {
      onSetForm({
        ...registerForm,
        EmailError: 'Email is required',
      });
    } else if (value && emailRegex.test(value)) {
      onSetForm({
        ...registerForm,
        EmailError: '',
      });
    } else if (value && !emailRegex.test(value)) {
      onSetForm({
        ...registerForm,
        EmailError: 'Use a valid Email',
      });
    }
  };

  const handleUpdateZipCodeError = (value) => {
    if (!value) {
      onSetForm({
        ...registerForm,
        ZipCodeError: 'ZIP Code is required',
      });
    } else if (value && zipCodeRegex.test(value)) {
      onSetForm({
        ...registerForm,
        ZipCodeError: '',
      });
    } else if (value && !zipCodeRegex.test(value)) {
      onSetForm({
        ...registerForm,
        ZipCodeError: 'Use a valid ZIP Code',
      });
    }
  };

  const handleUpdateInputError = (name, value) => {
    switch (name) {
      case 'FirstName':
        if (!FirstName && value) {
          onSetForm({
            ...registerForm,
            FirstNameError: '',
          });
        } else if (FirstName && !value) {
          onSetForm({
            ...registerForm,
            FirstNameError: 'First Name is required',
          });
        }
        break;
      case 'LastName':
        if (!LastName && value) {
          onSetForm({
            ...registerForm,
            LastNameError: '',
          });
        } else if (LastName && !value) {
          onSetForm({
            ...registerForm,
            LastNameError: 'Last Name is required',
          });
        }
        break;
      case 'Title':
        if (!Title && value) {
          onSetForm({
            ...registerForm,
            TitleError: '',
          });
        } else if (Title && !value) {
          onSetForm({
            ...registerForm,
            TitleError: 'Title is required',
          });
        }
        break;
      case 'District':
        if (!District && value) {
          onSetForm({
            ...registerForm,
            DistrictError: '',
          });
        } else if (District && !value) {
          onSetForm({
            ...registerForm,
            DistrictError: 'District is required',
          });
        }
        break;
      case 'Address1':
        if (!Address1 && value) {
          onSetForm({
            ...registerForm,
            Address1Error: '',
          });
        } else if (Address1 && !value) {
          onSetForm({
            ...registerForm,
            Address1Error: 'Address 1 is required',
          });
        }
        break;
      case 'City':
        if (!City && value) {
          onSetForm({
            ...registerForm,
            CityError: '',
          });
        } else if (City && !value) {
          onSetForm({
            ...registerForm,
            CityError: 'City is required',
          });
        }
        break;
      case 'State':
        if (!State && value) {
          onSetForm({
            ...registerForm,
            StateError: '',
          });
        } else if (State && !value) {
          onSetForm({
            ...registerForm,
            StateError: 'State is required',
          });
        }
        break;
      case 'OfficePhone':
        if (!OfficePhone && value) {
          onSetForm({
            ...registerForm,
            OfficePhoneError: '',
          });
        } else if (OfficePhone && !value) {
          onSetForm({
            ...registerForm,
            OfficePhoneError: 'Office Phone is required',
          });
        }
        break;
      case 'CellPhone':
        if (!CellPhone && value) {
          onSetForm({
            ...registerForm,
            CellPhoneError: '',
          });
        } else if (CellPhone && !value) {
          onSetForm({
            ...registerForm,
            CellPhoneError: 'Cell Phone is required',
          });
        }
        break;
      default:
        break;
    }
  };

  const handleUpdateErrors = useCallback((name, value) => {
    if (name === 'Email') {
      handleUpdateEmailError(value);
    } else if (name === 'ZipCode') {
      handleUpdateZipCodeError(value);
    } else {
      handleUpdateInputError(name, value);
    }
  }, [registerForm]);

  const handleUpdate = async (event) => {
    if (!isFormTouched) {
      console.log('touched form');
      setIsFormTouched(true);
    }

    console.log('NAME → ', event.target.name, {
      ...registerForm,
      [event.target.name]: event.target.value,
    });

    const isPhoneValue = event.target.name.endsWith('Phone');

    await onSetForm({
      ...registerForm,
      [event.target.name]: isPhoneValue
        ? stripPhone(event.target.value)
        : event.target.value,
    });

    handleUpdateErrors(event.target.name, event.target.value);
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

  const hasInput = FirstName !== ''
    && LastName !== ''
    && Title !== ''
    && District !== ''
    && Address1 !== ''
    && City !== ''
    && ZipCode !== ''
    && Email !== ''
    && OfficePhone !== ''
    && CellPhone !== '';

  const hasValidInput = hasInput && !honeypot;

  if (hasCompletedRegisterInfoForm) {
    return <LoadingContainer step={3} title="Information Form Complete" />;
  }

  console.log('initialFormValues', initialFormValues);

  return (
    <div className="login-form">
      <Formik
        initialValues={initialFormValues}
        onSubmit={handleClickSubmitButton}
        validationSchema={registerMemberSchema}
      >
        {/* <Form onSubmit={(event) => event.preventDefault()}> */}
        <Form>
          {/* FIRST NAME */}
          <label className={classes.label} htmlFor="FirstName">
            First Name*
            <Field
              className={classes.input}
              id="FirstName"
              name="FirstName"
              placeholder="e.g. Sally"
              required
            />
            {/* <input
              className={classes.input}
              name="FirstName"
              onChange={handleUpdate}
              placeholder="e.g. Sally"
              required
              type="text"
              value={FirstName}
            /> */}
          </label>
          <div className={classes.error}>{FirstNameError}</div>

          {/* LAST NAME */}
          <label className={classes.label} htmlFor="LastName">
            Last Name*
            <Field
              className={classes.input}
              id="LastName"
              name="LastName"
              placeholder="e.g. Drumm"
              required
            />
            {/* <input
              className={classes.input}
              name="LastName"
              onChange={handleUpdate}
              placeholder="e.g. Drumm"
              required
              type="text"
              value={LastName}
            /> */}
          </label>
          <div className={classes.error}>{LastNameError}</div>

          {/* TITLE */}
          <label className={classes.label} htmlFor="Title">
            Title*
            <Field
              className={classes.input}
              id="Title"
              name="Title"
              placeholder="e.g. Director of Fine Arts"
              required
            />
            {/* <input
              className={classes.input}
              name="Title"
              onChange={handleUpdate}
              placeholder="e.g. Director of Fine Arts"
              required
              type="text"
              value={Title}
            /> */}
          </label>
          <div className={classes.error}>{TitleError}</div>

          {/* DISTRICT */}
          <label className={classes.label} htmlFor="District">
            District*
            <Field
              className={classes.input}
              id="District"
              name="District"
              placeholder="e.g. Texas ISD"
              required
            />
            {/* <input
              className={classes.input}
              name="District"
              onChange={handleUpdate}
              placeholder="e.g. Texas ISD"
              required
              type="text"
              value={District}
            /> */}
          </label>
          <div className={classes.error}>{DistrictError}</div>

          {/* ADDRESS 1 */}
          <label className={classes.label} htmlFor="Address1">
            Address 1*
            <Field
              className={classes.input}
              id="Address1"
              name="Address1"
              placeholder="e.g. 123 Main St."
              required
            />
            {/* <input
              className={classes.input}
              name="Address1"
              onChange={handleUpdate}
              placeholder="e.g. 123 Main St."
              required
              type="text"
              value={Address1}
            /> */}
          </label>
          <div className={classes.error}>{Address1Error}</div>

          {/* ADDRESS 2 */}
          <label className={classes.label} htmlFor="Address2">
            Address 2
            <Field
              className={classes.input}
              id="Address2"
              name="Address2"
              placeholder="e.g. Suite 19"
            />
            {/* <input
              className={classes.input}
              name="Address2"
              onChange={handleUpdate}
              placeholder="e.g. Suite 19"
              type="text"
              value={Address2}
            /> */}
          </label>

          <div className={classes.cityStateContainer}>
            {/* CITY */}
            <label className={clsx(classes.label, classes.cityContainer)} htmlFor="City">
              City*
              <Field
                className={classes.input}
                id="City"
                name="City"
                placeholder="e.g. Dallas"
                required
              />
              {/* <input
                className={classes.input}
                name="City"
                onChange={handleUpdate}
                placeholder="e.g. Dallas"
                required
                type="text"
                value={City}
              /> */}
              <div className={classes.error}>{CityError}</div>
            </label>

            {/* STATE */}
            <label className={clsx(classes.label, classes.stateContainer)} htmlFor="State">
              State*
              <Field
                className={classes.input}
                id="State"
                name="State"
                placeholder="e.g. TX"
                required
              />
              {/* <input
                className={clsx(classes.input, classes.stateInput)}
                name="State"
                onChange={handleUpdate}
                placeholder="e.g. TX"
                required
                type="text"
                value={State}
              /> */}
              <div className={classes.error}>{StateError}</div>
            </label>
          </div>

          {/* ZIP */}
          <label className={classes.label} htmlFor="ZipCode">
            ZIP Code*
            <Field
              className={classes.input}
              id="ZipCode"
              name="ZipCode"
              placeholder="e.g. 75150"
              required
            />
            {/* <input
              className={classes.input}
              name="ZipCode"
              onChange={handleUpdate}
              placeholder="e.g. 75150"
              required
              type="text"
              value={ZipCode}
            /> */}
          </label>
          <div className={classes.error}>{ZipCodeError}</div>

          {/* EMAIL */}
          <label className={classes.label} htmlFor="Email">
            Email*
            <Field
              className={classes.input}
              id="Email"
              name="Email"
              placeholder="e.g. music@austinisd.edu"
              required
            />
            {/* <input
              className={classes.input}
              name="Email"
              onChange={handleUpdate}
              placeholder="e.g. music@austinisd.edu"
              required
              type="email"
              value={Email}
            /> */}
          </label>
          <div className={classes.error}>{EmailError}</div>

          {/* OFFICE PHONE */}
          <label className={classes.label} htmlFor="OfficePhone">
            Office Phone*
            <Field
              className={classes.input}
              id="OfficePhone"
              name="OfficePhone"
              placeholder="e.g. (512) 555-1919"
              required
            />
            {/* <input
              className={classes.input}
              name="OfficePhone"
              onChange={handleUpdate}
              placeholder="e.g. (512) 555-1919"
              required
              type="text"
              value={formatPhone(OfficePhone)}
            /> */}
          </label>
          <div className={classes.error}>{OfficePhoneError}</div>

          {/* CELL PHONE */}
          <label className={classes.label} htmlFor="CellPhone">
            Cell Phone*
            <Field
              className={classes.input}
              id="CellPhone"
              name="CellPhone"
              placeholder="e.g. (512) 555-1919"
              required
            />
            {/* <input
              className={classes.input}
              name="CellPhone"
              onChange={handleUpdate}
              placeholder="e.g. (512) 555-1919"
              required
              type="text"
              value={formatPhone(CellPhone)}
            /> */}
          </label>
          <div className={classes.error}>{CellPhoneError}</div>

          {/* NEW TO TMAC */}
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
            onChange={handleUpdate}
            type="text"
            value={honeypot}
          />

          {/* SUBMIT BUTTON */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {!hasValidInput && (
              <Box
                clone
                mb={2.5}
                mt={1}
                width="100%"
              >
                <EnhancedAlert severity={isFormTouched && !hasInput ? 'error' : 'info'}>
                  Please make sure all required fields above are completed.
                </EnhancedAlert>
              </Box>
            )}

            <RegisterButton
              buttonType="submit"
              // isDisabled={!hasValidInput}
              // onClick={handleClickSubmitButton}
            >
              Continue to Step 3
            </RegisterButton>
          </div>
        </Form>
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
