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
  fontSize: '67.5%',
  letterSpacing: '0.125em',
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
  marginTop: 16,
};

const lastErrorStyles = {
  ...baseErrorStyles,
  margin: '16px 0',
};

const INITIAL_STATE = {
  firstName: '',
  firstNameError: '',
  lastName: '',
  lastNameError: '',
  error: '',
  isAuthenticated: false,
  password: '',
  passwordError: '',
};

// To check for a valid email address
const regex = /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,}$/i;

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
    this.setState({
      [event.target.name]: event.target.value,
    }, this.handleUpdateErrors(event.target.name, event.target.value));
  }

  handleClickSubmitButton = () => {
    const {
      firstName,
      lastName,
    } = this.state;

    console.log('NICE!', {
      firstName,
      lastName,
    });

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
    if (value && name === 'email') this.handleUpdateEmailError();
    else this.handleUpdateInputError(name, value);
  }

  handleUpdateEmailError = () => {
    const {
      email,
    } = this.state;

    if (!email) {
      this.setState({
        emailError: 'Email is required',
      });
    } else if (regex.test(email)) {
      this.setState({
        emailError: '',
      });
    } else if (email && !regex.test(email)) {
      this.setState({
        emailError: 'Use a valid email',
      });
    }
  }

  handleUpdateInputError = (name, value) => {
    const {
      firstName,
      lastName,
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
    }
  }

  render() {
    const {
      firstName,
      firstNameError,
      lastName,
      lastNameError,
      error,
      isAuthenticated,
      password,
      passwordError,
    } = this.state;

    // console.log('FIRST NAME →', firstName, firstNameError);

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
          <button
            disabled={!hasValidInput}
            type="submit"
            onClick={this.handleClickSubmitButton}
          >
            Submit
          </button>
          {error &&
            <div
              css={{
                color: 'red',
                fontWeight: 500,
                fontFamily: options.headerFontFamily.join(`,`),
                margin: '16px 0',
              }}
            >
              {error.message}
            </div>
          }
        </form>
      </div>
    );
  }
}

export default withRouter(RegisterForm);
