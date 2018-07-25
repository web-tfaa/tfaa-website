// External Dependencies
import MdRemoveRedEye from 'react-icons/lib/md/remove-red-eye';
import React, { Component } from 'react';
import {
  Link,
  push,
} from 'gatsby';
import { withRouter } from 'react-router-dom';

// Internal Dependencies
import presets, { colors } from '../../utils/presets';
import { options } from '../../utils/typography';
import {
  auth,
} from '../../firebase';

// Local Styles
// const rootStyles = {
//   margin: '1rem 0',
// };

const labelStyles = {
  display: 'block',
  fontSize: '90%',
  letterSpacing: '0.1rem',
  marginTop: 16,
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
  minWidth: '100%',
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

const INITIAL_STATE = {
  email: '',
  emailError: '',
  error: '',
  isAuthenticated: false,
  password: '',
  passwordError: '',
};

// To check for a valid email address
const regex = /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,}$/i;

// Component Definition
class LoginForm extends Component {
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

  togglePasswordInput = () => {
    const pass = document.getElementById('showhide');

    if (pass.type === 'password') pass.setAttribute('type', 'text')
    else pass.setAttribute('type', 'password');
  }

  handleClickSignUp = () => {
    push('/members/sign-up');
  }

  handleUpdateErrors = () => {
    this.handleUpdateEmailError();
    this.handleUpdateLoginPasswordError();
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

  handleUpdateLoginPasswordError = () => {
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
      email,
      emailError,
      error,
      isAuthenticated,
      password,
      passwordError,
    } = this.state;

    if (isAuthenticated) push('/members');

    const signUpElement = [
      <hr key="login-form-divider"  css={{ background: 'darkred', height: 3 }} />,
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
        onClick={this.handleClickSignUp}
      >
        Sign Up!
      </span>
    ];

    const hasLoginInput = password !== '' && email !== '';
    const isLoginInvalid =
      !hasLoginInput ||
      emailError;

    return (
      <div className="login-form">
        <form onSubmit={this.handleSubmit}>
          <label css={labelStyles}>
            Email Address
          </label>
          <input
            css={inputStyles}
            type="text"
            name="email"
            onChange={this.handleUpdate}
            placeholder="Email Address"
            value={email}
          />
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

          {/* SUBMIT BUTTON */}
          <div
            css={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <button
              css={{ marginTop: '1rem', padding: '8px 12px' }}
              disabled={isLoginInvalid}
              type="submit"
              onClick={this.handleClickSubmitButton}
            >
              Sign In
            </button>
          </div>

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

        <p>
          <Link to="/members/pw-forget">Forgot Password?</Link>
        </p>

        {signUpElement}
      </div>
    );
  }
}

export default withRouter(LoginForm);
