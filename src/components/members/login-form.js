// External Dependencies
import React, { Component } from 'react';
import Link from 'gatsby-link';
import MdRemoveRedEye from 'react-icons/lib/md/remove-red-eye';
import { withRouter } from 'react-router-dom';

// Internal Dependencies
import Container from '../shared/container';
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
  textTransform: 'uppercase',
};

const bottomLabelStyles = {
  ...labelStyles,
  marginTop: 16,
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

const INITIAL_STATE = {
  email: '',
  emailError: '',
  error: '',
  isAuthenticated: false,
  password: '',
  passwordError: '',
  passwordOne: '',
  passwordTwo: '',
  registerError: null,
  showSignUp: false,
};

// to check for a valid email address
const regex = /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,}$/i;

// Component Definition
class LoginForm extends Component {
  state = {
    ...INITIAL_STATE,
  };

  handleSubmit = (event) => {
    event.preventDefault();
  }

  handleUpdate = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, this.handleUpdateErrors);
  }

  handleClickSubmitButton = () => {
    const {
      email,
      password,
    } = this.state;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({
          ...INITIAL_STATE,
          isAuthenticated: true,
        }));
      })
      .catch(err => {
        this.setState({ error: err });
      });
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

  togglePasswordInput = () => {
    const pass = document.getElementById('showhide');

    if (pass.type === 'password') pass.setAttribute('type', 'text')
    else pass.setAttribute('type', 'password');
  }

  handleClickRegister = () => {
    this.setState({
      ...INITIAL_STATE,
      showSignUp: true,
    });
  }

  handleUpdateErrors = () => {
    this.handleUpdateEmailError();
    this.handleUpdateRegisterPasswordError();
    this.handleUpdateLoginPasswordError();
  }

  handleUpdateEmailError = () => {
    const {
      email,
    } = this.state;

    console.log('heeyyyy');

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

  handleUpdateLoginPasswordError = (message) => {
    const {
      password,
    } = this.state;

    const hasInput = password !== '';

    if (!hasInput) {
      this.setState({
        passwordError: 'Password is required',
      });
    } else if (hasInput && password.length < 8) {
      this.setState({
        passwordError: 'Password must be at least 8 characters long',
      });
    } else if (hasInput && password.length > 7) {
      this.setState({
        passwordError: '',
      });
    }
  }

  render() {
    const {
      history,
      signOut,
      user,
    } = this.props;

    const {
      email,
      emailError,
      error,
      isAuthenticated,
      password,
      passwordError,
      passwordOne,
      passwordTwo,
      registerError,
      showSignUp,
    } = this.state;

    if (isAuthenticated) history.push('/members');

    const hasInput = passwordOne !== '' && passwordTwo !== '' && email !== '';
    const isInvalid =
      !hasInput ||
      registerError ||
      emailError;

    const signUpElement = !showSignUp
      ? [
        <hr key="login-form-divider" />,
        <div
          css={{ marginBottom: 16 }}
          key="no-account-text"
        >
          Don&apos;t have an account?
        </div>,
        <span
          css={{
            color: `inherit`,
            textDecoration: `none`,
            transition: `all ${presets.animation.speedFast} ${
              presets.animation.curveDefault
            }`,
            borderBottom: `1px solid ${colors.ui.bright}`,
            boxShadow: `inset 0 -2px 0px 0px ${colors.ui.bright}`,
            fontFamily: options.headerFontFamily.join(`,`),
            fontWeight: `bold`,
            '&:hover': {
              background: colors.ui.bright,
              cursor: 'pointer',
            }
          }}
          key="no-account-sign-up-span"
          onClick={this.handleClickRegister}
        >
          Sign Up!
        </span>
      ]
      : [
        <div
          css={{ marginBottom: 16 }}
          key="register-message"
        >
          Registration is open to TMAC members. For information about joining TMAC, head over to the&nbsp;
          <Link to="/members#google-form-members">Members page</Link>.
        </div>,
        <form
          key="register-form"
          onSubmit={this.handleSubmit}
        >
          <label css={labelStyles}>
            Username
            <input
              css={inputStyles}
              type="text"
              name="email"
              onChange={this.handleUpdate}
              placeholder="Email Address"
              value={email}
            />
          </label>
          <div
            css={{
              color: 'red',
              fontFamily: options.headerFontFamily.join(`,`),
              marginTop: 16,
            }}
          >
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
              type="password"
              name="passwordOne"
              onChange={this.handleUpdate}
              placeholder="Password"
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
              type="password"
              name="passwordTwo"
              onChange={this.handleUpdate}
              placeholder="Confirm Password"
              value={passwordTwo}
            />
          </div>
          <div
            css={{
              color: 'red',
              fontFamily: options.headerFontFamily.join(`,`),
              margin: '16px 0',
            }}
          >
            {registerError}
          </div>
          <button
            disabled={isInvalid}
            type="submit"
            onClick={this.handleClickSignUpButton}
          >
            Sign Up
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
      ];

    const hasLoginInput = password !== '' && email !== '';
    const isLoginInvalid =
      !hasLoginInput ||
      emailError;

    return (
      <div className="login-form">
        {!showSignUp &&
          <form onSubmit={this.handleSubmit}>
            <label css={labelStyles}>
              Username
              <input
                css={inputStyles}
                type="text"
                name="email"
                onChange={this.handleUpdate}
                placeholder="Email Address"
                value={email}
              />
            </label>
            <div
              css={{
                color: 'red',
                fontFamily: options.headerFontFamily.join(`,`),
                marginTop: 16,
              }}
            >
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
                id="showhide"
                type="password"
                name="password"
                onChange={this.handleUpdate}
                placeholder="Password"
                value={password}
              />
              <div css={{ marginLeft: 8 }}>
                <MdRemoveRedEye
                  css={{
                    height: 20,
                    width: 20,
                  }}
                  onClick={this.togglePasswordInput}
                />
              </div>
            </div>
            <div
              css={{
                color: 'red',
                fontFamily: options.headerFontFamily.join(`,`),
                margin: '16px 0',
              }}
            >
              {passwordError}
            </div>
            <button
              disabled={isLoginInvalid}
              type="submit"
              onClick={this.handleClickSubmitButton}
            >
              Sign In
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
        }
        {signUpElement}
      </div>
    );
  }
}

export default withRouter(LoginForm);
