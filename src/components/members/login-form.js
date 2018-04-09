// External Dependencies
import React, { Component } from 'react';
import MdRemoveRedEye from 'react-icons/lib/md/remove-red-eye';
import { withRouter } from 'react-router-dom';

// Internal Dependencies
import Container from '../shared/container';
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
  padding: '0.25rem',
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

  handleUpdatePasswordTwo = (event) => {
    this.setState({
      passwordTwo: event.target.value,
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

  updateError = (message) => {
    this.setState({
      error: message,
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
        <button
          key="no-account-sign-up-button"
          onClick={this.handleClickRegister}
          type="submit"
        >
          Register
        </button>
      ]
      : (
        <form onSubmit={this.handleSubmit}>
          <label css={labelStyles}>
            Username
            <input
              css={inputStyles}
              type="text"
              name="email"
              onChange={(event) => this.handleUpdate(event)}
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
              onChange={(event) => this.handleUpdate(event)}
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
            Re-enter Password
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
              onChange={(event) => this.handleUpdatePasswordTwo(event)}
              placeholder="Confirm Password"
              value={passwordTwo}
            />
          </div>
          <div css={{ color: 'red' }}>
            {error}
          </div>
          <button
            type="submit"
            onClick={this.handleClickSignUpButton}
          >
            Sign Up
          </button>
        </form>
      );

    // When passwords don't match, we update the error message
    if (passwordOne !== '' && passwordTwo !== '' && passwordOne !== passwordTwo) {
      this.updateError('Passwords should match');
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
          </form>
        }
        {signUpElement}
      </div>
    );
  }
}

export default withRouter(LoginForm);
