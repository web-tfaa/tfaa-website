// External Dependencies
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// Internal Dependencies
import {
  getCurrentUser,
  isLoggedIn,
  logout,
} from '../../utils/auth';
import { status } from '../../utils/colors';

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
export default withRouter(({ history }) => {
  let details;
  if (!isLoggedIn()) {
    details = (
      <p css={statusTextStyles}>
        To access the Members area, you’ll need to{' '}
        <Link to="/members/login">log in</Link>.
      </p>
    );
  } else {
    const { name, email } = getCurrentUser();

    details = (
      <p css={statusTextStyles}>
        Logged in as {name} ({email}){' '}
        <a
          href="/"
          onClick={event => {
            event.preventDefault();
            logout(() => history.push('/members'));
          }}
        >
          log out
        </a>
      </p>
    );
  }

  return <div css={statusRootStyles}>{details}</div>;
});
