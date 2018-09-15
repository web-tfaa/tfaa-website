/* eslint-disable camelcase */

// External Dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { navigate } from 'gatsby';

// Material-UI Dependencies
import CircularProgress from '@material-ui/core/CircularProgress';

// Internal Dependencies
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

// Local Styles
const labelStyles = {
  display: 'block',
  fontSize: '90%',
  letterSpacing: '0.1rem',
  marginTop: 16,
  textTransform: 'uppercase',
};

const inputStyles = {
  display: 'block',
  fontSize: '1rem',
  padding: '0.3rem',
  minWidth: '70%',
};

const baseErrorStyles = {
  color: 'red',
  fontFamily: options.headerFontFamily.join(`,`),
  marginTop: '0.5rem',
};

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
  PaymentOption: '',
  AmountPaid: 0,
};

// Local Functions
const formatPhone = phone => {
  let cleanPhone = phone;
  if (cleanPhone.startsWith('1')) cleanPhone = cleanPhone.slice(1);
  if (cleanPhone.length !== 10) return phone;
  return `(${cleanPhone.substr(0, 3)}) ${cleanPhone.substr(
    3,
    3,
  )}-${cleanPhone.substr(6, 4)}`;
};

const stripPhone = phone => phone.replace(/[^0-9]+/g, '');

// Component Definition
class RegisterForm extends Component {
  static propTypes = {
    onCompleteStep: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
      hasCompletedRegisterInfoForm: false,
    };

    this.activeComponent = true;
  }

  componentWillUnmount() {
    this.activeComponent = false;
  }

  handleSubmit = event => {
    event.preventDefault();
  };

  handleClickSubmitButton = event => {
    event.preventDefault();

    const originalForm = this.state;

    // The Google Sheet doesn't need these values
    const form = removeErrorKeys(originalForm);
    delete form.isAuthenticated;
    delete form.honeypot;
    delete form.hasCompletedRegisterInfoForm;

    form.NewToTMAC = form.NewToTMAC ? 'Yes' : 'No';

    // This will identify each row in the database and serve as the document name
    const documentId = `${form.FirstName}_${form.LastName}`;

    doCreateEntry(form, documentId, this.handleUpdateCompletedStep)

    // Update the form data and advance the steps with the above callback function
  };

  handleCompleteInfoStep = (form) => {
    if (this.activeComponent) {
      const { onCompleteStep } = this.props;

      setTimeout(() => onCompleteStep(0, form), 4000);
    }
  };

  handleUpdateCompletedStep = (form) => {
    if (this.activeComponent) {
      this.setState({
        hasCompletedRegisterInfoForm: true,
      }, () => this.handleCompleteInfoStep(form))
    }
  }

  handleUpdate = event => {
    if (this.activeComponent) {
      if (
        event.target.name.endsWith('Phone')
      ) {
        this.setState(
          {
            [event.target.name]: stripPhone(event.target.value),
          },
          this.handleUpdateErrors(event.target.name, event.target.value),
        );
      } else
        this.setState(
          {
            [event.target.name]: event.target.value,
          },
          this.handleUpdateErrors(event.target.name, event.target.value),
        );
      }
  };

  handleUpdateErrors = (name, value) => {
    if (name === 'Email') this.handleUpdateEmailError(value);
    else if (name === 'ZipCode') this.handleUpdateZipCodeError(value);
    else this.handleUpdateInputError(name, value);
  };

  handleUpdateEmailError = value => {
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

  handleUpdateZipCodeError = value => {
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

  validateHuman = data => {
    if (data) return false;
    return true;
  };

  render() {
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
      hasCompletedRegisterInfoForm,
      honeypot,
      isAuthenticated,
      LastName,
      LastNameError,
      OfficePhone,
      OfficePhoneError,
      Title,
      TitleError,
      ZipCode,
      ZipCodeError,
    } = this.state;

    if (isAuthenticated) navigate('/members');

    const hasInput =
      FirstName !== '' &&
      LastName !== '' &&
      Title !== '' &&
      District !== '' &&
      Address1 !== '' &&
      City !== '' &&
      ZipCode !== '' &&
      Email !== '' &&
      OfficePhone !== '' &&
      CellPhone !== '';

    const hasValidInput = hasInput && this.validateHuman(honeypot);

    return (
      <div className="login-form">
        {hasCompletedRegisterInfoForm
          ? (
            <div
              css={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                margin: 32,
              }}>
              <h2>Information Form Complete</h2>
              <p css={{ marginBottom: 32 }}>Now loading step 3...</p>
              <CircularProgress size={64} thickness={4} />
            </div>
          )
          : (
            <form onSubmit={this.handleSubmit}>
              {/* FIRST NAME */}
              <label css={labelStyles} htmlFor="FirstName">
                First Name
                <input
                  css={inputStyles}
                  name="FirstName"
                  onChange={this.handleUpdate}
                  placeholder="e.g. Sally"
                  type="text"
                  value={FirstName}
                />
              </label>
              <div css={baseErrorStyles}>{FirstNameError}</div>

              {/* LAST NAME */}
              <label css={labelStyles} htmlFor="LastName">
                Last Name
                <input
                  css={inputStyles}
                  name="LastName"
                  onChange={this.handleUpdate}
                  placeholder="e.g. Drumm"
                  value={LastName}
                />
              </label>
              <div css={baseErrorStyles}>{LastNameError}</div>

              {/* TITLE */}
              <label css={labelStyles} htmlFor="Title">
                Title
                <input
                  css={inputStyles}
                  name="Title"
                  onChange={this.handleUpdate}
                  placeholder="e.g. Director of Fine Arts"
                  value={Title}
                />
              </label>
              <div css={baseErrorStyles}>{TitleError}</div>

              {/* DISTRICT */}
              <label css={labelStyles} htmlFor="District">
                District
                <input
                  css={inputStyles}
                  name="District"
                  onChange={this.handleUpdate}
                  placeholder="e.g. Texas ISD"
                  value={District}
                />
              </label>
              <div css={baseErrorStyles}>{DistrictError}</div>

              {/* ADDRESS 1 */}
              <label css={labelStyles} htmlFor="Address1">
                Address 1
                <input
                  css={inputStyles}
                  name="Address1"
                  onChange={this.handleUpdate}
                  placeholder="e.g. 123 Main St."
                  value={Address1}
                />
              </label>
              <div css={baseErrorStyles}>{Address1Error}</div>

              {/* ADDRESS 2 */}
              <label css={labelStyles} htmlFor="Address2">
                Address 2
                <input
                  css={inputStyles}
                  name="Address2"
                  onChange={this.handleUpdate}
                  placeholder="e.g. Suite 19"
                  value={Address2}
                />
              </label>

              {/* CITY */}
              <label css={labelStyles} htmlFor="City">
                City
                <input
                  css={inputStyles}
                  name="City"
                  onChange={this.handleUpdate}
                  placeholder="e.g. Dallas"
                  value={City}
                />
              </label>
              <div css={baseErrorStyles}>{CityError}</div>

              {/* ZIP */}
              <label css={labelStyles} htmlFor="ZipCode">
                ZIP Code
                <input
                  css={inputStyles}
                  name="ZipCode"
                  onChange={this.handleUpdate}
                  placeholder="e.g. 75150"
                  value={ZipCode}
                />
              </label>
              <div css={baseErrorStyles}>{ZipCodeError}</div>

              {/* EMAIL */}
              <label css={labelStyles} htmlFor="Email">
                Email
                <input
                  css={inputStyles}
                  name="Email"
                  onChange={this.handleUpdate}
                  placeholder="e.g. music@austinisd.edu"
                  value={Email}
                />
              </label>
              <div css={baseErrorStyles}>{EmailError}</div>

              {/* OFFICE PHONE */}
              <label css={labelStyles} htmlFor="OfficePhone">
                Office Phone
                <input
                  css={inputStyles}
                  name="OfficePhone"
                  onChange={this.handleUpdate}
                  placeholder="e.g. (512) 555-1919"
                  value={formatPhone(OfficePhone)}
                />
              </label>
              <div css={baseErrorStyles}>{OfficePhoneError}</div>

              {/* CELL PHONE */}
              <label css={labelStyles} htmlFor="CellPhone">
                Cell Phone
                <input
                  css={inputStyles}
                  name="CellPhone"
                  onChange={this.handleUpdate}
                  placeholder="e.g. (512) 555-1919"
                  value={formatPhone(CellPhone)}
                />
              </label>
              <div css={baseErrorStyles}>{CellPhoneError}</div>

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
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                transform: 'translateX(16px)',
              }}>
                <RegisterButton
                  isDisabled={!hasValidInput}
                  onClick={this.handleClickSubmitButton}
                  buttonType="submit"
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

export default RegisterForm;
