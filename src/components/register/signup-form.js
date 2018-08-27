// External Dependencies
import MdRemoveRedEye from 'react-icons/lib/md/remove-red-eye';
import React, { Component } from 'react';
import { push } from 'gatsby';

// Internal Dependencies
import { options } from '../../utils/typography';
import { auth } from '../../firebase';

// Local Styles
const labelStyles = {
  display: 'block',
  fontSize: '67.5%',
  letterSpacing: '0.125em',
  textTransform: 'uppercase',
};

const bottomLabelStyles = {
  ...labelStyles,
  marginTop: 16,
};

const inputStyles = {
  display: 'block',
  fontSize: '1rem',
  minWidth: '70%',
  padding: '0.3rem',
};

const baseErrorStyles = {
  color: 'red',
  fontFamily: options.headerFontFamily.join(`,`),
  marginTop: '0.5rem',
};

// const buttonStyles = {
//   backgroundColor: 'rebeccapurple',
//   border: 0,
//   color: 'white',
//   fontSize: '1.25rem',
//   fontWeight: 'bold',
//   marginTop: '0.5rem',
//   padding: '0.25rem 1rem',
//   transition: 'background-color 150ms linear',
// };

// Local Variables
const INITIAL_STATE = {
  email: '',
  emailError: '',
  error: '',
  passwordError: '',
  passwordOne: '',
  passwordTwo: '',
  registerError: null,
};

// To check for a valid email address
const regex = /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,}$/i;

// Component Definition
class SignUpForm extends Component {
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
    }, this.handleUpdateErrors);
  }

  handleClickSignUpButton = () => {
    const {
      email,
      passwordOne,
    } = this.state;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authuser => {
        this.setState(() => ({
          ...INITIAL_STATE,
          isAuthenticated: true,
        }));
      })
      .catch(err => {
        this.setState({ error: err });
      });
  }

  toggleRegisterPasswordInput = () => {
    const passOne = document.getElementById('passwordOne');
    const passTwo = document.getElementById('passwordTwo');

    if (passOne.type === 'password' && passTwo.type === 'password') {
      passOne.setAttribute('type', 'text')
      passTwo.setAttribute('type', 'text')
    }
    else {
      passOne.setAttribute('type', 'password');
      passTwo.setAttribute('type', 'password');
    }
  }

  handleUpdateErrors = () => {
    this.handleUpdateEmailError();
    this.handleUpdateRegisterPasswordError();
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

  handleUpdateRegisterPasswordError = (message) => {
    const {
      passwordOne,
      passwordTwo,
    } = this.state;

    const hasInput = passwordOne !== '' && passwordTwo !== '';

    if (!hasInput) {
      this.setState({
        registerError: '',
      });
    } else if (hasInput && passwordOne !== passwordTwo) {
      this.setState({
        registerError: 'Passwords should match',
      });
    } else if (hasInput && passwordOne === passwordTwo && passwordOne.length < 8) {
      this.setState({
        registerError: 'Password must be at least 8 characters long',
      });
    } else if (hasInput && passwordOne === passwordTwo) {
      this.setState({
        registerError: '',
      });
    }
  }

  render() {
    const {
      email,
      emailError,
      error,
      isAuthenticated,
      passwordOne,
      passwordTwo,
      registerError,
    } = this.state;

    if (isAuthenticated) push('/members');

    const hasInput = passwordOne !== '' && passwordTwo !== '' && email !== '';
    const isInvalid =
      !hasInput ||
      registerError ||
      emailError;

    return (
      <form
        key="signup-form"
        onSubmit={this.handleSubmit}
      >
        <label css={labelStyles}>
          Username
        </label>
        <input
          css={inputStyles}
          name="email"
          onChange={this.handleUpdate}
          placeholder="Email Address"
          type="text"
          value={email}
        />
        <div css={baseErrorStyles}>
          {emailError}
        </div>
        <label css={bottomLabelStyles}>
          Password
        </label>
        <div
          css={{
            alignItems: 'center',
            display: 'flex',
            marginBottom: 16,
          }}
        >
          <input
            css={inputStyles}
            id="passwordOne"
            name="passwordOne"
            onChange={this.handleUpdate}
            placeholder="Password"
            type="password"
            value={passwordOne}
          />
          <div css={{ marginLeft: 8 }}>
            <MdRemoveRedEye
              css={{
                height: 20,
                width: 20,
              }}
              onClick={this.toggleRegisterPasswordInput}
            />
          </div>
        </div>
        <label css={bottomLabelStyles}>
          Confirm Password
        </label>
        <div
          css={{
            alignItems: 'center',
            display: 'flex',
            marginBottom: 16,
          }}
        >
          <input
            css={inputStyles}
            id="passwordTwo"
            name="passwordTwo"
            onChange={this.handleUpdate}
            placeholder="Confirm Password"
            type="password"
            value={passwordTwo}
          />
        </div>
        <div css={baseErrorStyles}>
          {registerError}
        </div>

        {/* SUBMIT BUTTON */}
        <div
          css={{
            display: 'flex',
            justifyContent: 'flex-end',
            maxWidth: '70%',
          }}
        >
          <button
            css={{ marginTop: '1rem', padding: '8px 12px' }}
            disabled={isInvalid}
            onClick={this.handleClickSignUpButton}
            type="submit"
          >
            Sign Up
          </button>
        </div>

        {error &&
          <div
            css={{
              color: 'red',
              fontFamily: options.headerFontFamily.join(`,`),
              fontWeight: 500,
              margin: '16px 0',
            }}
          >
            {error.message}
          </div>
        }
      </form>
    );
  }
}

export default SignUpForm;