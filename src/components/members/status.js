// External Dependencies
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// Internal Dependencies
import {
  getCurrentUser,
  isLoggedIn,
  logout,
} from '../../../utils/auth';

// Component Definition
export default withRouter(({ history }) => {
  let details;
  if (!isLoggedIn()) {
    details = (
      <p className={styles['status__text']}>
        To get the full app experience, you’ll need to{' '}
        <Link to="/members/login">log in</Link>.
      </p>
    );
  } else {
    const { name, email } = getCurrentUser();

    details = (
      <p className={styles['status__text']}>
        Logged in as {name} ({email})!{' '}
        <a
          href="/"
          onClick={event => {
            event.preventDefault();
            logout(() => history.push('/members/login'));
          }}
        >
          log out
        </a>
      </p>
    );
  }

  return <div className={styles.status}>{details}</div>;
});
