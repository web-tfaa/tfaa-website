// External Dependencies
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// Internal Dependencies
import { isLoggedIn } from '../../../utils/auth';

// More info at https://reacttraining.com/react-router/web/example/auth-workflow
// Component Definition
export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isLoggedIn() ? (
        // If we’re not logged in, redirect to the login page.
        <Redirect to={{ pathname: '/members/login' }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);
