// External Dependencies
import React from 'react';
import { Router, navigate } from '@reach/router';

// Internal Dependencies
import { isLoggedIn } from '../../../utils/auth';

// Component Definition
export default ({ component: Component, ...rest }) => {
  if (!isLoggedIn() && window.location.pathname !== '/login') {
    // If we are not logged in, redirect to the home page
    navigate('/login');
    return null;
  }

  return (
    <Router
      <Component {...rest} />
    <Router/>
  );
};
