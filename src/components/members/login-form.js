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

  togglePasswordInput = () => {
    const pass = document.getElementById('showhide');
    console.log('hello!', pass);
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

  render() {
    const {
      // signUpWithEmail,
      signOut,
      user,
      error,
      history,
    } = this.props;

    const {
      email,
      password,
      showSignUp,
    } = this.state;

    console.log('user', user);

    const isAuthenticated = false;

    if (isAuthenticated) history.push('/members');

    const signUpElement = !showSignUp
      ? [
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
              onChange={this.handleUpdate}
            />
          </label>
          <label css={bottomLabelStyles}>
            Password
          </label>
          <div
            css={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <input
              css={inputStyles}
              id="showhide"
              type="password"
              name="password"
              onChange={this.handleUpdate}
            />
            <div css={{ marginLeft: 8 }}>
              <MdRemoveRedEye
                css={{
                  width: 20,
                  height: 20,
                }}
                onClick={this.togglePasswordInput}
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={this.handleClickSignUpButton}
          >
            Sign Up
          </button>
        </form>
      );

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label css={labelStyles}>
            Username
            <input
              css={inputStyles}
              type="text"
              name="email"
              onChange={this.handleUpdate}
            />
          </label>
          <label css={bottomLabelStyles}>
            Password
          </label>
          <div
            css={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <input
              css={inputStyles}
              id="showhide"
              type="password"
              name="password"
              onChange={this.handleUpdate}
            />
            <div css={{ marginLeft: 8 }}>
              <MdRemoveRedEye
                css={{
                  width: 20,
                  height: 20,
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
        {signUpElement}
      </div>
    );
  }
}

export default withRouter(LoginForm);
