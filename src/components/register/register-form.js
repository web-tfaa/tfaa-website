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
  First_Name: '',
  First_NameError: '',
  Last_Name: '',
  Last_NameError: '',
  Title: '',
  TitleError: '',
  District: '',
  DistrictError: '',
  Address_1: '',
  Address_1Error: '',
  // Address2 is not required, so cannot have an error
  Address_2: '',
  City: '',
  CityError: '',
  Zip_Code: '',
  Zip_CodeError: '',
  Email: '',
  EmailError: '',
  Office_Phone: '',
  Office_PhoneError: '',
  Cell_Phone: '',
  Cell_PhoneError: '',
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

    // This will identify each row in the database and serve as the document name
    const documentId = `${form.First_Name}_${form.Last_Name}`;

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
    else if (name === 'Zip_Code') this.handleUpdateZipCodeError(value);
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
          Zip_CodeError: 'ZIP Code is required',
        });
      } else if (value && zipCodeRegex.test(value)) {
        this.setState({
          Zip_CodeError: '',
        });
      } else if (value && !zipCodeRegex.test(value)) {
        this.setState({
          Zip_CodeError: 'Use a valid ZIP Code',
        });
      }
    }
  };

  handleUpdateInputError = (name, value) => {
    if (this.activeComponent) {
      const {
        First_Name,
        Last_Name,
        Title,
        District,
        Address_1,
        City,
        Office_Phone,
        Cell_Phone,
      } = this.state;

      switch (name) {
        case 'First_Name':
          if (!First_Name && value) {
            this.setState({ First_NameError: '' });
          } else if (First_Name && !value) {
            this.setState({ First_NameError: 'First Name is required' });
          }
          break;
        case 'Last_Name':
          if (!Last_Name && value) {
            this.setState({ Last_NameError: '' });
          } else if (Last_Name && !value) {
            this.setState({ Last_NameError: 'Last Name is required' });
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
        case 'Address_1':
          if (!Address_1 && value) {
            this.setState({ Address_1Error: '' });
          } else if (Address_1 && !value) {
            this.setState({ Address_1Error: 'Address 1 is required' });
          }
          break;
        case 'City':
          if (!City && value) {
            this.setState({ CityError: '' });
          } else if (City && !value) {
            this.setState({ CityError: 'City is required' });
          }
          break;
        case 'Office_Phone':
          if (!Office_Phone && value) {
            this.setState({ Office_PhoneError: '' });
          } else if (Office_Phone && !value) {
            this.setState({ Office_PhoneError: 'Office Phone is required' });
          }
          break;
        case 'Cell_Phone':
          if (!Cell_Phone && value) {
            this.setState({ Cell_PhoneError: '' });
          } else if (Cell_Phone && !value) {
            this.setState({ Cell_PhoneError: 'Cell Phone is required' });
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
      Address_1,
      Address_1Error,
      Address_2,
      Cell_Phone,
      Cell_PhoneError,
      City,
      CityError,
      District,
      DistrictError,
      Email,
      EmailError,
      First_Name,
      First_NameError,
      hasCompletedRegisterInfoForm,
      honeypot,
      isAuthenticated,
      Last_Name,
      Last_NameError,
      Office_Phone,
      Office_PhoneError,
      Title,
      TitleError,
      Zip_Code,
      Zip_CodeError,
    } = this.state;

    if (isAuthenticated) navigate('/members');

    const hasInput =
      First_Name !== '' &&
      Last_Name !== '' &&
      Title !== '' &&
      District !== '' &&
      Address_1 !== '' &&
      City !== '' &&
      Zip_Code !== '' &&
      Email !== '' &&
      Office_Phone !== '' &&
      Cell_Phone !== '';

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
              <label css={labelStyles} htmlFor="First_Name">
                First Name
                <input
                  css={inputStyles}
                  name="First_Name"
                  onChange={this.handleUpdate}
                  placeholder="e.g. Sally"
                  type="text"
                  value={First_Name}
                />
              </label>
              <div css={baseErrorStyles}>{First_NameError}</div>

              {/* LAST NAME */}
              <label css={labelStyles} htmlFor="Last_Name">
                Last Name
                <input
                  css={inputStyles}
                  name="Last_Name"
                  onChange={this.handleUpdate}
                  placeholder="e.g. Drumm"
                  value={Last_Name}
                />
              </label>
              <div css={baseErrorStyles}>{Last_NameError}</div>

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
              <label css={labelStyles} htmlFor="Address_1">
                Address 1
                <input
                  css={inputStyles}
                  name="Address_1"
                  onChange={this.handleUpdate}
                  placeholder="e.g. 123 Main St."
                  value={Address_1}
                />
              </label>
              <div css={baseErrorStyles}>{Address_1Error}</div>

              {/* ADDRESS 2 */}
              <label css={labelStyles} htmlFor="Address_2">
                Address 2
                <input
                  css={inputStyles}
                  name="Address_2"
                  onChange={this.handleUpdate}
                  placeholder="e.g. Suite 19"
                  value={Address_2}
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
              <label css={labelStyles} htmlFor="Zip_Code">
                ZIP Code
                <input
                  css={inputStyles}
                  name="Zip_Code"
                  onChange={this.handleUpdate}
                  placeholder="e.g. 75150"
                  value={Zip_Code}
                />
              </label>
              <div css={baseErrorStyles}>{Zip_CodeError}</div>

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
              <label css={labelStyles} htmlFor="Office_Phone">
                Office Phone
                <input
                  css={inputStyles}
                  name="Office_Phone"
                  onChange={this.handleUpdate}
                  placeholder="e.g. (512) 555-1919"
                  value={formatPhone(Office_Phone)}
                />
              </label>
              <div css={baseErrorStyles}>{Office_PhoneError}</div>

              {/* CELL PHONE */}
              <label css={labelStyles} htmlFor="Cell_Phone">
                Cell Phone
                <input
                  css={inputStyles}
                  name="Cell_Phone"
                  onChange={this.handleUpdate}
                  placeholder="e.g. (512) 555-1919"
                  value={formatPhone(Cell_Phone)}
                />
              </label>
              <div css={baseErrorStyles}>{Cell_PhoneError}</div>

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
