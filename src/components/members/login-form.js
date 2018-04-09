// External Dependencies
import React, { Component } from 'react';
import Link from 'gatsby-link';
import MdRemoveRedEye from 'react-icons/lib/md/remove-red-eye';
import { withRouter } from 'react-router-dom';

// Internal Dependencies
import Container from '../shared/container';
import presets, { colors } from '../../utils/presets';
import { options } from '../../utils/typography';
// import firebase from '../../utils/firebase-config';

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

// Component Definition
class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    passwordOne: '',
    passwordTwo: '',
    registerError: '',
    showSignUp: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
  }

  handleUpdate = (event) => {
    console.log('event is:', event.target.name);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleClickSubmitButton = () => {
    const {
      signInWithEmail,
    } = this.props;

    const {
      email,
      password,
    } = this.state;

    signInWithEmail(email, password);
      // .then(res => history.push('/members'))
      // .catch(err => console.log('An error occurred:', err));
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
      showSignUp: true,
    });
  }

  handleClickSignUpButton = () => {
    this.setState({
      showSignUp: false,
    });
  }

  handleUpdateRegisterError = (message) => {
    this.setState({
      registerError: message,
    });
  }

  render() {
    const {
      // signUpWithEmail,
      error,
      history,
      signOut,
      user,
    } = this.props;

    const {
      email,
      password,
      passwordOne,
      passwordTwo,
      registerError,
      showSignUp,
    } = this.state;

    console.log('this.state', this.state);

    const isAuthenticated = false;

    if (isAuthenticated) history.push('/members');

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
          <button
            type="submit"
            onClick={this.handleClickSignUpButton}
          >
            Sign Up
          </button>
          <div
            css={{
              color: 'red',
              fontFamily: options.headerFontFamily.join(`,`),
              marginTop: 16,
            }}
          >
            {registerError}
          </div>
        </form>
      ];

    // When passwords don't match, we update the error message
    if (passwordOne !== '' && passwordTwo !== '' && passwordOne !== passwordTwo) {
      this.handleUpdateRegisterError('Passwords should match');
    }

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
            <button
              type="submit"
              onClick={this.handleClickSubmitButton}
            >
              Sign In
            </button>
            {error && <div>{error.message}</div>}
          </form>
        }
        {signUpElement}
      </div>
    );
  }
}

export default withRouter(LoginForm);
