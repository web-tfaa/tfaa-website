/* eslint-disable camelcase */

// External Dependencies
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import clsx from 'clsx';
import { navigate } from 'gatsby';
import { withStyles } from '@material-ui/core/styles';

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
  doCreateEntry,
} from '../../firebase/db';

// Local Variables
const styles = (theme) => ({
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
});

// All form values here must exactly match the column header names in the
//  associated Google Sheet to which we are writing this form data
const INITIAL_STATE = {
  honeypot: '',
  isAuthenticated: false,
  FirstName: '',
  FirstNameError: '',
  LastName: '',
  LastNameError: '',
  Title: '',
  TitleError: '',
  District: '',
  DistrictError: '',
  Address1: '',
  Address1Error: '',
  // Address2 is not required, so cannot have an error
  Address2: '',
  City: '',
  CityError: '',
  State: '',
  StateError: '',
  ZipCode: '',
  ZipCodeError: '',
  Email: '',
  EmailError: '',
  OfficePhone: '',
  OfficePhoneError: '',
  CellPhone: '',
  CellPhoneError: '',
  NewToTMAC: true,
  MemberType: '',
  PaymentOption: 'Invoiced',
  AmountPaid: 0,
  invoiceDate: '',
  invoiceId: 0,
  PaypalPayerID: '',
  PaypalPaymentID: '',
  receiptDate: '',
  receiptId: 0,
};

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
class RegisterForm extends Component {
  static propTypes = {
    authUser: PropTypes.shape({}).isRequired,
    classes: PropTypes.shape({}).isRequired,
    onCompleteStep: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
      hasCompletedRegisterInfoForm: false,
      radioValue: 'Yes',
      // eslint-disable-next-line
      userId: props.authUser.uid,
    };
  }

  componentDidMount() {
    this.activeComponent = true;
  }

  componentWillUnmount() {
    this.activeComponent = false;
  }

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleClickSubmitButton = (event) => {
    event.preventDefault();

    const originalForm = this.state;

    // The Google Sheet doesn't need these values
    const form = removeErrorKeys(originalForm);
    delete form.isAuthenticated;
    delete form.honeypot;
    delete form.hasCompletedRegisterInfoForm;

    // We set the new to TMAC value to what the radio button value was
    form.NewToTMAC = form.radioValue;
    delete form.radioValue;

    // Send phone values in formatted
    form.OfficePhone = formatPhone(form.OfficePhone);
    form.CellPhone = formatPhone(form.CellPhone);

    // This will tell the database action where to put the new record
    const collection = 'registration';

    // This will identify each row in the database and serve as the document name
    const documentId = form.userId;

    doCreateEntry(form, collection, documentId, this.handleUpdateCompletedStep);

    // Update the form data and advance the steps with the above callback function
  };

  handleCompleteInfoStep = (form) => {
    if (this.activeComponent) {
      const { onCompleteStep } = this.props;

      setTimeout(() => onCompleteStep(0, form), 2200);
    }
  };

  handleUpdateCompletedStep = (form) => {
    if (this.activeComponent) {
      this.setState({
        hasCompletedRegisterInfoForm: true,
      }, () => this.handleCompleteInfoStep(form));
    }
  };

  handleUpdate = (event) => {
    if (this.activeComponent) {
      if (event.target.name.endsWith('Phone')) {
        this.setState({
          [event.target.name]: stripPhone(event.target.value),
        }, this.handleUpdateErrors(event.target.name, event.target.value));
      } else {
        this.setState({
          [event.target.name]: event.target.value,
        }, this.handleUpdateErrors(event.target.name, event.target.value));
      }
    }
  };

  handleUpdateErrors = (name, value) => {
    if (name === 'Email') {
      this.handleUpdateEmailError(value);
    } else if (name === 'ZipCode') {
      this.handleUpdateZipCodeError(value);
    } else this.handleUpdateInputError(name, value);
  };

  handleUpdateEmailError = (value) => {
    if (this.activeComponent) {
      if (!value) {
        this.setState({
          EmailError: 'Email is required',
        });
      } else if (value && emailRegex.test(value)) {
        this.setState({
          EmailError: '',
        });
      } else if (value && !emailRegex.test(value)) {
        this.setState({
          EmailError: 'Use a valid Email',
        });
      }
    }
  };

  handleUpdateZipCodeError = (value) => {
    if (this.activeComponent) {
      if (!value) {
        this.setState({
          ZipCodeError: 'ZIP Code is required',
        });
      } else if (value && zipCodeRegex.test(value)) {
        this.setState({
          ZipCodeError: '',
        });
      } else if (value && !zipCodeRegex.test(value)) {
        this.setState({
          ZipCodeError: 'Use a valid ZIP Code',
        });
      }
    }
  };

  handleUpdateInputError = (name, value) => {
    if (this.activeComponent) {
      const {
        FirstName,
        LastName,
        Title,
        District,
        Address1,
        City,
        State,
        OfficePhone,
        CellPhone,
      } = this.state;

      switch (name) {
        case 'FirstName':
          if (!FirstName && value) {
            this.setState({ FirstNameError: '' });
          } else if (FirstName && !value) {
            this.setState({ FirstNameError: 'First Name is required' });
          }
          break;
        case 'LastName':
          if (!LastName && value) {
            this.setState({ LastNameError: '' });
          } else if (LastName && !value) {
            this.setState({ LastNameError: 'Last Name is required' });
          }
          break;
        case 'Title':
          if (!Title && value) {
            this.setState({ TitleError: '' });
          } else if (Title && !value) {
            this.setState({ TitleError: 'Title is required' });
          }
          break;
        case 'District':
          if (!District && value) {
            this.setState({ DistrictError: '' });
          } else if (District && !value) {
            this.setState({ DistrictError: 'District is required' });
          }
          break;
        case 'Address1':
          if (!Address1 && value) {
            this.setState({ Address1Error: '' });
          } else if (Address1 && !value) {
            this.setState({ Address1Error: 'Address 1 is required' });
          }
          break;
        case 'City':
          if (!City && value) {
            this.setState({ CityError: '' });
          } else if (City && !value) {
            this.setState({ CityError: 'City is required' });
          }
          break;
        case 'State':
          if (!State && value) {
            this.setState({ StateError: '' });
          } else if (State && !value) {
            this.setState({ StateError: 'State is required' });
          }
          break;
        case 'OfficePhone':
          if (!OfficePhone && value) {
            this.setState({ OfficePhoneError: '' });
          } else if (OfficePhone && !value) {
            this.setState({ OfficePhoneError: 'Office Phone is required' });
          }
          break;
        case 'CellPhone':
          if (!CellPhone && value) {
            this.setState({ CellPhoneError: '' });
          } else if (CellPhone && !value) {
            this.setState({ CellPhoneError: 'Cell Phone is required' });
          }
          break;
        default:
          break;
      }
    }
  };

  handleChangeNewToTMAC = (event) => {
    this.setState({ radioValue: event.target.value });
  };

  validateHuman = (data) => {
    if (data) {
      return false;
    }
    return true;
  };

  render() {
    const { classes } = this.props;
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
      radioValue,
    } = this.state;

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

    const hasValidInput = hasInput && this.validateHuman(honeypot);

    return (
      <div className="login-form">
        {hasCompletedRegisterInfoForm ? (
          <LoadingContainer step={3} title="Information Form Complete" />
        ) : (
          <form onSubmit={this.handleSubmit}>
            {/* FIRST NAME */}
            <label className={classes.label} htmlFor="FirstName">
              First Name*
              <input
                className={classes.input}
                name="FirstName"
                onChange={this.handleUpdate}
                placeholder="e.g. Sally"
                required
                type="text"
                value={FirstName}
              />
            </label>
            <div className={classes.error}>{FirstNameError}</div>

            {/* LAST NAME */}
            <label className={classes.label} htmlFor="LastName">
              Last Name*
              <input
                className={classes.input}
                name="LastName"
                onChange={this.handleUpdate}
                placeholder="e.g. Drumm"
                required
                type="text"
                value={LastName}
              />
            </label>
            <div className={classes.error}>{LastNameError}</div>

            {/* TITLE */}
            <label className={classes.label} htmlFor="Title">
              Title*
              <input
                className={classes.input}
                name="Title"
                onChange={this.handleUpdate}
                placeholder="e.g. Director of Fine Arts"
                required
                type="text"
                value={Title}
              />
            </label>
            <div className={classes.error}>{TitleError}</div>

            {/* DISTRICT */}
            <label className={classes.label} htmlFor="District">
              District*
              <input
                className={classes.input}
                name="District"
                onChange={this.handleUpdate}
                placeholder="e.g. Texas ISD"
                required
                type="text"
                value={District}
              />
            </label>
            <div className={classes.error}>{DistrictError}</div>

            {/* ADDRESS 1 */}
            <label className={classes.label} htmlFor="Address1">
              Address 1*
              <input
                className={classes.input}
                name="Address1"
                onChange={this.handleUpdate}
                placeholder="e.g. 123 Main St."
                required
                type="text"
                value={Address1}
              />
            </label>
            <div className={classes.error}>{Address1Error}</div>

            {/* ADDRESS 2 */}
            <label className={classes.label} htmlFor="Address2">
              Address 2
              <input
                className={classes.input}
                name="Address2"
                onChange={this.handleUpdate}
                placeholder="e.g. Suite 19"
                type="text"
                value={Address2}
              />
            </label>

            <div className={classes.cityStateContainer}>
              {/* CITY */}
              <label className={clsx(classes.label, classes.cityContainer)} htmlFor="City">
                City*
                <input
                  className={classes.input}
                  name="City"
                  onChange={this.handleUpdate}
                  placeholder="e.g. Dallas"
                  required
                  type="text"
                  value={City}
                />
                <div className={classes.error}>{CityError}</div>
              </label>

              {/* STATE */}
              <label className={clsx(classes.label, classes.stateContainer)} htmlFor="State">
                State*
                <input
                  className={clsx(classes.input, classes.stateInput)}
                  name="State"
                  onChange={this.handleUpdate}
                  placeholder="e.g. TX"
                  required
                  type="text"
                  value={State}
                />
                <div className={classes.error}>{StateError}</div>
              </label>
            </div>

            {/* ZIP */}
            <label className={classes.label} htmlFor="ZipCode">
              ZIP Code*
              <input
                className={classes.input}
                name="ZipCode"
                onChange={this.handleUpdate}
                placeholder="e.g. 75150"
                required
                type="text"
                value={ZipCode}
              />
            </label>
            <div className={classes.error}>{ZipCodeError}</div>

            {/* EMAIL */}
            <label className={classes.label} htmlFor="Email">
              Email*
              <input
                className={classes.input}
                name="Email"
                onChange={this.handleUpdate}
                placeholder="e.g. music@austinisd.edu"
                required
                type="email"
                value={Email}
              />
            </label>
            <div className={classes.error}>{EmailError}</div>

            {/* OFFICE PHONE */}
            <label className={classes.label} htmlFor="OfficePhone">
              Office Phone*
              <input
                className={classes.input}
                name="OfficePhone"
                onChange={this.handleUpdate}
                placeholder="e.g. (512) 555-1919"
                required
                type="text"
                value={formatPhone(OfficePhone)}
              />
            </label>
            <div className={classes.error}>{OfficePhoneError}</div>

            {/* CELL PHONE */}
            <label className={classes.label} htmlFor="CellPhone">
              Cell Phone*
              <input
                className={classes.input}
                name="CellPhone"
                onChange={this.handleUpdate}
                placeholder="e.g. (512) 555-1919"
                required
                type="text"
                value={formatPhone(CellPhone)}
              />
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
                  onChange={this.handleChangeNewToTMAC}
                  value={radioValue}
                >
                  <FormControlLabel control={<Radio size="small" />} label="Yes" value="Yes" />
                  <FormControlLabel control={<Radio size="small" />} label="No" value="No" />
                </RadioGroup>
              </label>
            </FormControl>

            {/* Hidden input to help curtail spam */}
            <input
              css={{ opacity: 0, height: 1, width: 1 }}
              id="honeypot"
              name="honeypot"
              onChange={this.handleUpdate}
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
                  <EnhancedAlert severity="error">
                    Please make sure all required fields above are completed.
                  </EnhancedAlert>
                </Box>
              )}
              <RegisterButton
                buttonType="submit"
                isDisabled={!hasValidInput}
                onClick={this.handleClickSubmitButton}
              >
                Continue to Step 3
              </RegisterButton>
            </div>
          </form>
        )}
      </div>
    );
  }
}

const RegisterFormWithContext = (props) => (
  <AuthUserContext.Consumer>
    {(authUser) => <RegisterForm {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default withStyles(styles)(RegisterFormWithContext);
