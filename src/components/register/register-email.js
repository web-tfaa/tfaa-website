// External Dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Internal Dependencies
import FormHr from '../shared/form-hr';
import SignUpForm from './signup-form';
import LoginForm from './login-form';
import presets, { colors } from '../../utils/presets';
import SignInUpElement from './sign-in-up-element';
import { options } from '../../utils/typography';

// Component Definition
class RegisterEmail extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      viewingSignUp: true,
    };
  }

  handleClickSignInLink = () => {
    console.log('dope');
    this.setState({
      viewingSignUp: false,
    });
  };

  render() {
    const {
      isAuthenticated,
    } = this.props;

    const {
      viewingSignUp,
    } = this.state;

    console.log('isAuthenticated in register-email', isAuthenticated, { viewingSignUp });

    return (
      <section>
        <h2>1. Sign up for TMAC website login</h2>
        <p>
          All members registering after 9/1/2018 will need to sign up for a new login here to complete online registration.
        </p>
        <FormHr />
        <SignUpForm />
        <FormHr />
        <SignInUpElement onClickSignIn={this.handleClickSignInLink} viewSignUp={false} />
        {!viewingSignUp && <LoginForm />}
      </section>
    );
  }
}

export default RegisterEmail;
