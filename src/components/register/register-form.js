// External Dependencies
import React, { Component } from 'react';
import Link from 'gatsby-link';
import { navigateTo } from 'gatsby-link';
import { withRouter } from 'react-router-dom';

// Internal Dependencies
import Container from '../../components/shared/container';
import presets, { colors } from '../../utils/presets';
import { options } from '../../utils/typography';
import {
  auth,
  firebase,
} from '../../firebase';

// Local Styles
const rootStyles = {
  margin: '1rem 0',
};

const labelStyles = {
  display: 'block',
  fontFamily: options.bodyFontFamily.join(`,`),
  fontSize: '90%',
  letterSpacing: '0.025rem',
  marginTop: 16,
  textTransform: 'uppercase',
};

const bottomLabelStyles = {
  ...labelStyles,
};

const inputStyles = {
  display: 'block',
  fontSize: '1rem',
  padding: '0.3rem',
  minWidth: '70%',
};

const buttonStyles = {
  backgroundColor: 'rebeccapurple',
  border: 0,
  color: 'white',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  marginTop: '0.5rem',
  padding: '0.25rem 1rem',
  transition: 'background-color 150ms linear',
};

const baseErrorStyles = {
  color: 'red',
  fontFamily: options.headerFontFamily.join(`,`),
  marginTop: '0.5rem',
};

const lastErrorStyles = {
  ...baseErrorStyles,
  margin: '16px 0',
};

const INITIAL_STATE = {
  isAuthenticated: false,
  firstName: '',
  firstNameError: '',
  lastName: '',
  lastNameError: '',
  title: '',
  titleError: '',
  district: '',
  districtError: '',
  address1: '',
  address1Error: '',
  address2: '',
  city: '',
  cityError: '',
  zip: '',
  zipError: '',
  email: '',
  emailError: '',
  officePhone: '',
  officePhoneError: '',
  cellPhone: '',
  cellPhoneError: '',
  officeFax: '',
};

// To check for a valid email address
const emailRegex = /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,}$/i;
const zipRegex = /^\d{5}(?:[-\s]\d{4})?$/i;

// Local Functions
const formatPhone = (phone) => {
  let cleanPhone = phone;
  if (cleanPhone.startsWith('1')) cleanPhone = cleanPhone.slice(1);
  if (cleanPhone.length !== 10) return phone;
  return `(${cleanPhone.substr(0, 3)}) ${cleanPhone.substr(3, 3)}-${cleanPhone.substr(6, 4)}`;
}

const stripPhone = (phone) => phone.replace(/[^0-9]+/g, '');

// Component Definition
class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  handleUpdate = (event) => {
    if (event.target.name.endsWith('Phone') || event.target.name.endsWith('Fax')) {
      this.setState({
        [event.target.name]: stripPhone(event.target.value),
      }, this.handleUpdateErrors(event.target.name, event.target.value));
    }
    else this.setState({
      [event.target.name]: event.target.value,
    }, this.handleUpdateErrors(event.target.name, event.target.value));
  }

  handleClickSubmitButton = () => {
    const {
      firstName,
      lastName,
    } = this.state;

    console.log('NICE!', this.state);

    // auth.doSignInWithEmailAndPassword(email, password)
    //   .then(() => {
    //     this.setState(() => ({
    //       ...INITIAL_STATE,
    //       isAuthenticated: true,
    //     }));
    //   })
    //   .catch(err => {
    //     this.setState({ error: err });
    //   });
  }

  handleUpdateErrors = (name, value) => {
    if (name === 'email') this.handleUpdateEmailError(value);
    else if (name === 'zip') this.handleUpdateZipError(value);
    else this.handleUpdateInputError(name, value);
  }

  handleUpdateEmailError = (value) => {
    if (!value) {
      this.setState({
        emailError: 'Email is required',
      });
    } else if (value && emailRegex.test(value)) {
      this.setState({
        emailError: '',
      });
    } else if (value && !emailRegex.test(value)) {
      this.setState({
        emailError: 'Use a valid email',
      });
    }
  }

  handleUpdateZipError = (value) => {
    if (!value) {
      this.setState({
        zipError: 'ZIP Code is required',
      });
    } else if (value && zipRegex.test(value)) {
      this.setState({
        zipError: '',
      });
    } else if (value && !zipRegex.test(value)) {
      this.setState({
        zipError: 'Use a valid ZIP Code',
      });
    }
  }

  handleUpdateInputError = (name, value) => {
    const {
      firstName,
      lastName,
      title,
      district,
      address1,
      city,
      zip,
      officePhone,
      cellPhone,
    } = this.state;

    switch (name) {
      case 'firstName':
        if (!firstName && value) {
          this.setState({ firstNameError: '' });
        } else if (firstName && !value) {
          this.setState({ firstNameError: 'First Name is required' });
        }
        break;
      case 'lastName':
        if (!lastName && value) {
          this.setState({ lastNameError: '' });
        } else if (lastName && !value) {
          this.setState({ lastNameError: 'Last Name is required' });
        }
        break;
      case 'title':
        if (!title && value) {
          this.setState({ titleError: '' });
        } else if (title && !value) {
          this.setState({ titleError: 'Title is required' });
        }
        break;
      case 'district':
        if (!district && value) {
          this.setState({ districtError: '' });
        } else if (district && !value) {
          this.setState({ districtError: 'District is required' });
        }
        break;
      case 'address1':
        if (!address1 && value) {
          this.setState({ address1Error: '' });
        } else if (address1 && !value) {
          this.setState({ address1Error: 'Address 1 is required' });
        }
        break;
      case 'city':
        if (!city && value) {
          this.setState({ cityError: '' });
        } else if (city && !value) {
          this.setState({ cityError: 'City is required' });
        }
        break;
      case 'officePhone':
        if (!officePhone && value) {
          this.setState({ officePhoneError: '' });
        } else if (officePhone && !value) {
          this.setState({ officePhoneError: 'Office Phone is required' });
        }
        break;
      case 'cellPhone':
        console.log('value!', value);
        if (!cellPhone && value) {
          this.setState({ cellPhoneError: '' });
        } else if (cellPhone && !value) {
          this.setState({ cellPhoneError: 'Cell Phone is required' });
        }
        break;
    }
  }

  render() {
    const {
      isAuthenticated,
      firstName,
      firstNameError,
      lastName,
      lastNameError,
      title,
      titleError,
      district,
      districtError,
      address1,
      address1Error,
      address2,
      city,
      cityError,
      zip,
      zipError,
      email,
      emailError,
      officePhone,
      officePhoneError,
      cellPhone,
      cellPhoneError,
      officeFax,
    } = this.state;

    if (isAuthenticated) navigateTo('/members');

    const hasInput = firstName !== '' && lastName !== '';

    const hasValidInput = hasInput;

    return (
      <div className="login-form">
        <form onSubmit={this.handleSubmit}>

          {/* FIRST NAME */}
          <label css={labelStyles}>
            First Name
          </label>
          <input
            css={inputStyles}
            type="text"
            name="firstName"
            onChange={this.handleUpdate}
            placeholder="e.g. Sally"
            value={firstName}
          />
          <div css={baseErrorStyles}>
            {firstNameError}
          </div>

          {/* LAST NAME */}
          <label css={labelStyles}>
            Last Name
          </label>
          <input
            css={inputStyles}
            name="lastName"
            onChange={this.handleUpdate}
            placeholder="e.g. Drumm"
            value={lastName}
          />
          <div css={baseErrorStyles}>
            {lastNameError}
          </div>

          {/* TITLE */}
          <label css={labelStyles}>
            Title
          </label>
          <input
            css={inputStyles}
            name="title"
            onChange={this.handleUpdate}
            placeholder="e.g. Director of Fine Arts"
            value={title}
          />
          <div css={baseErrorStyles}>
            {titleError}
          </div>

          {/* DISTRICT */}
          <label css={labelStyles}>
            District
          </label>
          <input
            css={inputStyles}
            name="district"
            onChange={this.handleUpdate}
            placeholder="e.g. Texas ISD"
            value={district}
          />
          <div css={baseErrorStyles}>
            {districtError}
          </div>

          {/* ADDRESS 1 */}
          <label css={labelStyles}>
            Address 1
          </label>
          <input
            css={inputStyles}
            name="address1"
            onChange={this.handleUpdate}
            placeholder="e.g. 123 Main St."
            value={address1}
          />
          <div css={baseErrorStyles}>
            {address1Error}
          </div>

          {/* ADDRESS 2 */}
          <label css={labelStyles}>
            Address 2
          </label>
          <input
            css={inputStyles}
            name="address2"
            onChange={this.handleUpdate}
            placeholder="e.g. Suite 19"
            value={address2}
          />

          {/* CITY */}
          <label css={labelStyles}>
            City
          </label>
          <input
            css={inputStyles}
            name="city"
            onChange={this.handleUpdate}
            placeholder="e.g. Dallas"
            value={city}
          />
          <div css={baseErrorStyles}>
            {cityError}
          </div>

          {/* ZIP */}
          <label css={labelStyles}>
            ZIP Code
          </label>
          <input
            css={inputStyles}
            name="zip"
            onChange={this.handleUpdate}
            placeholder="e.g. 75150"
            value={zip}
          />
          <div css={baseErrorStyles}>
            {zipError}
          </div>

          {/* EMAIL */}
          <label css={labelStyles}>
            Email
          </label>
          <input
            css={inputStyles}
            name="email"
            onChange={this.handleUpdate}
            placeholder="e.g. music@austinisd.edu"
            value={email}
          />
          <div css={baseErrorStyles}>
            {emailError}
          </div>

          {/* OFFICE PHONE */}
          <label css={labelStyles}>
            Office Phone
          </label>
          <input
            css={inputStyles}
            name="officePhone"
            onChange={this.handleUpdate}
            placeholder="e.g. (512) 555-1919"
            value={formatPhone(officePhone)}
          />
          <div css={baseErrorStyles}>
            {officePhoneError}
          </div>

          {/* CELL PHONE */}
          <label css={labelStyles}>
            Cell Phone
          </label>
          <input
            css={inputStyles}
            name="cellPhone"
            onChange={this.handleUpdate}
            placeholder="e.g. (512) 555-1919"
            value={formatPhone(cellPhone)}
          />
          <div css={baseErrorStyles}>
            {cellPhoneError}
          </div>

          {/* OFFICE FAX */}
          <label css={labelStyles}>
            Office Fax
          </label>
          <input
            css={inputStyles}
            name="officeFax"
            onChange={this.handleUpdate}
            placeholder="e.g. (512) 555-1919"
            value={formatPhone(officeFax)}
          />

          {/* SUBMIT BUTTON */}
          <button
            css={{ marginTop: '1rem', padding: '8px 12px' }}
            disabled={!hasValidInput}
            type="submit"
            onClick={this.handleClickSubmitButton}
          >
            Submit
          </button>

        </form>
      </div>
    );
  }
}

export default withRouter(RegisterForm);
