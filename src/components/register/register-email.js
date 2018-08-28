// External Dependencies
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

// Internal Dependencies
import FormHr from '../shared/form-hr';
import SignUpForm from './signup-form';
import LoginForm from './login-form';
import SignInUpElement from './sign-in-up-element';

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

  handleAdvanceStep = () => {
    const {
      advanceToNextStep,
    } = this.props;

    setTimeout(() =>
      advanceToNextStep(0),
      3500
    );
  };

  handleClickSignInLink = () => {
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

    const childrenElements = isAuthenticated
      ? (
        <Fragment>
          <h2>Login Successful</h2>
          <div
            css={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              margin: 32,
            }}
          >
            <p>Now loading step 2...</p>
            <CircularProgress size={64} thickness={4} />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            All members registering after 9/1/2018 will need to sign up for a new login here to complete online registration.
          </p>
          <FormHr />
          <SignUpForm onRegisterSignUp={this.handleAdvanceStep} />
          <FormHr />
          <SignInUpElement onClickSignIn={this.handleClickSignInLink} viewSignUp={false} />
          {!viewingSignUp && <LoginForm onRegisterLogin={this.handleAdvanceStep} />}
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
