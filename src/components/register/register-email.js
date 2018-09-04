// External Dependencies
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

// Material-UI Dependencies
import CircularProgress from '@material-ui/core/CircularProgress';

// Internal Dependencies
import FormHr from '../shared/form-hr';
import SignUpForm from './signup-form';
import LoginForm from './login-form';
import SignInUpElement from './sign-in-up-element';

// Component Definition
class RegisterEmail extends Component {
  static propTypes = {
    onCompleteStep: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      hasCompletedRegisterEmail: false,
      viewingSignUp: true,
    };

    this.activeComponent = true;
  }

  componentWillUnmount() {
    this.activeComponent = false;
  }

  handleCompleteEmailStep = () => {
    if (this.activeComponent) {
      const { onCompleteStep } = this.props;
      const { hasCompletedRegisterEmail } = this.state;

      if (hasCompletedRegisterEmail) {
        setTimeout(() => onCompleteStep(0), 3500);
      }
    }
  };

  handleClickSignInLink = () => {
    if (this.activeComponent) {
      this.setState({
        viewingSignUp: false,
      });
    }
  };

  handleUpdateCompletedStep = () => {
    if (this.activeComponent) {
      this.setState({
        hasCompletedRegisterEmail: true,
      }, () => this.handleCompleteEmailStep());
    }
  }

  render() {
    const { isAuthenticated } = this.props;

    const {
      hasCompletedRegisterEmail,
      viewingSignUp,
    } = this.state;

    const childrenElements = isAuthenticated && hasCompletedRegisterEmail ? (
      <div
        css={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          margin: 32,
        }}>
        <h2>Login Successful</h2>
        <p css={{ marginBottom: 32 }}>Now loading step 2...</p>
        <CircularProgress size={64} thickness={4} />
      </div>
    ) : (
      <Fragment>
        <p>
          All members registering after 9/1/2018 will need to sign up for a new
          login here to complete online registration.
        </p>
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
