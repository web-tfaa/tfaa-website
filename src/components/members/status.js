// External Dependencies
import React from 'react';
import withFirebaseAuth from 'react-auth-firebase';
import { Link, withRouter } from 'react-router-dom';

// Internal Dependencies
import {
  getCurrentUser,
  logout,
} from '../../utils/auth';
import { status } from '../../utils/colors';
import firebase from '../../utils/firebase-config';

// Local Styles
const statusRootStyles = {
  background: status,
  fontSize: '87.5%',
  width: `0 auto`,
  padding: '0.5rem',
};

const statusTextStyles = {
  margin: '0 auto',
  maxWidth: 640,
  textAlign: 'right',
};

// Component Definition
const Status = (props) => {
  const {
    user,
  } = props;

  let details;
  if (!user) {
    details = (
      <p css={statusTextStyles}>
        To access the Members area, you’ll need to{' '}
        <Link to="/members/login">log in</Link>.
      </p>
    );
  } else {
    const {
      name,
      email,
    } = getCurrentUser();

    details = (
      <p css={statusTextStyles}>
        Logged in as {name} ({email}){' '}
        <a
          href="/"
          onClick={event => {
            event.preventDefault();
            logout(() => history.push('/'));
          }}
        >
          log out
        </a>
      </p>
    );
  }

  return <div css={statusRootStyles}>{details}</div>;
};

const authConfig = {
  email: {
    verifyOnSignup: true, // Sends verification email to user upon sign up
    saveUserInDatabase: true // Saves user in database at /users ref
  },
};

export default withFirebaseAuth(withRouter(Status), firebase, authConfig);
