// External Dependencies
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

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
    advanceToNextStep: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      viewingSignUp: true,
    };
  }

  handleClickSignInLink = () => {
    this.setState({
      viewingSignUp: false,
    });
  };

  render() {
    const {
      advanceToNextStep,
      isAuthenticated,
    } = this.props;

    const {
      viewingSignUp,
    } = this.state;

    console.log('isAuthenticated in register-email', isAuthenticated);

    const childrenElements = isAuthenticated
      ? (
        <Fragment>
          <h1>Login Successful</h1>
          <p>Now loading Step 2...</p>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            All members registering after 9/1/2018 will need to sign up for a new login here to complete online registration.
          </p>
          <FormHr />
          <SignUpForm onRegisterSignUp={advanceToNextStep} />
          <FormHr />
          <SignInUpElement onClickSignIn={this.handleClickSignInLink} viewSignUp={false} />
          {!viewingSignUp && <LoginForm onRegisterLogin={advanceToNextStep} />}
        </Fragment>
      );

    return (
      <section>
        <h2>1. Sign up for TMAC website login</h2>
        {childrenElements}
      </section>
    );
  }
}

export default RegisterEmail;
