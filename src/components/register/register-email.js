// External Dependencies
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

// Internal Dependencies
import FormHr from '../shared/form-hr';
import LoginForm from './login-form';
import presets, { colors } from '../../utils/presets';
import SignInUpElement from './sign-in-up-element';
import { options } from '../../utils/typography';


// Component Definition
class RegisterEmail extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  render() {
    const {
      isAuthenticated,
    } = this.props;

    console.log('isAuthenticated in register-email', isAuthenticated);

    return (
      <section>
        <h2>1. Sign up for TMAC website login</h2>
        <FormHr />
        <LoginForm />
        <FormHr />
        <SignInUpElement />
      </section>
    );
  }
}

export default RegisterEmail;
