// External Dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Internal Dependencies
import FormHr from '../shared/form-hr';
import LoginForm from './login-form';
import LoadingContainer from '../shared/LoadingContainer';
import SignInUpElement from './sign-in-up-element';
import SignUpForm from './signup-form';
import { appNameShort } from '../../utils/app-constants';

// Local Variables
const propTypes = {
  onCompleteStep: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

// Component Definition
class RegisterEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCompletedRegisterEmail: false,
      viewingSignUp: true,
    };
  }

  handleCompleteEmailStep = () => {
    const { onCompleteStep } = this.props;
    const { hasCompletedRegisterEmail } = this.state;

    if (hasCompletedRegisterEmail) {
      setTimeout(() => onCompleteStep(0), 1500);
    }
  };

  handleClickSignInLink = () => {
    this.setState({
      viewingSignUp: false,
    });
  };

  handleUpdateCompletedStep = () => {
    this.setState({
      hasCompletedRegisterEmail: true,
    }, this.handleCompleteEmailStep);
  };

  render() {
    const { isAuthenticated } = this.props;

    const {
      hasCompletedRegisterEmail,
      viewingSignUp,
    } = this.state;

    const childrenElements = isAuthenticated && hasCompletedRegisterEmail ? (
      <LoadingContainer
        step={2}
        title="Login Successful"
      />
    ) : (
      <>
        <FormHr />

        <SignUpForm onRegisterSignUp={this.handleUpdateCompletedStep} />

        <FormHr />

        <SignInUpElement
          onClickSignIn={this.handleClickSignInLink}
          viewSignUp={false}
        />

        {!viewingSignUp && (
          <LoginForm onRegisterLogin={this.handleUpdateCompletedStep} />
        )}
      </>
    );

    return (
      <section>
        <h2>1. Sign up for {appNameShort} website login</h2>
        {childrenElements}
      </section>
    );
  }
}

RegisterEmail.propTypes = propTypes;

export default RegisterEmail;
