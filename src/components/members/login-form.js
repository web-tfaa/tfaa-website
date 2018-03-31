// External Dependencies
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Internal Dependencies
import firebase from '../../utils/firebase-config';
import withFirebaseAuth from 'react-auth-firebase';

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

  render() {
    const {
      signInWithEmail,
      signUpWithEmail,
      signOut,
      user,
      error,
      // handleSubmit,
      // handleUpdate,
      history,
    } = this.props;

    const { email, password } = this.state;

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
          <label css={labelStyles}>
            Password
            <input
              css={inputStyles}
              type="password"
              name="password"
              onChange={this.handleUpdate}
            />
          </label>
          <button
            type="submit"
            onClick={() => signInWithEmail(email, password)}
          >
            SignIn
          </button>
        </form>
        <form onSubmit={this.handleSubmit}>
          ...form input to take email and password for sign up
          <button
            type="submit"
            onClick={() => signUpWithEmail(email, password)}
          >
            SignUp
          </button>
        </form>
      </div>
    );
  }
}


const authConfig = {
  email: {
    verifyOnSignup: true, // Sends verification email to user upon sign up
    saveUserInDatabase: true // Saves user in database at /users ref
  },
};

export default withFirebaseAuth(withRouter(LoginForm), firebase, authConfig);
