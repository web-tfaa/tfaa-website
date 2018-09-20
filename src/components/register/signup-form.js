// External Dependencies
import MdRemoveRedEye from 'react-icons/lib/md/remove-red-eye';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { navigate } from 'gatsby';

// Internal Dependencies
import AuthUserContext from '../session/AuthUserContext';
import { auth } from '../../firebase';
import { options } from '../../utils/typography';

// Local Styles
const labelStyles = {
  display: 'block',
  fontSize: '67.5%',
  letterSpacing: '0.125em',
  textTransform: 'uppercase',
};

const bottomLabelStyles = {
  ...labelStyles,
  marginTop: 16,
};

const inputStyles = {
  display: 'block',
  fontSize: '1rem',
  minWidth: '70%',
  padding: '0.3rem',
};

const baseErrorStyles = {
  color: 'red',
  fontFamily: options.headerFontFamily.join(`,`),
  marginTop: '0.5rem',
};

// Local Variables
const INITIAL_STATE = {
  email: '',
  emailError: '',
  error: '',
  passwordError: '',
  passwordOne: '',
  passwordTwo: '',
  registerError: null,
};

// Component Definition
class SignUpForm extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    onRegisterSignUp: PropTypes.func,
  };

  static defaultProps = {
    onRegisterSignUp: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
    };

    this.activeComponent = true;
  }

  componentDidUpdate(prevProps) {
    const {
      isAuthenticated,
      onRegisterSignUp,
    } = this.props;

    if (isAuthenticated !== prevProps.isAuthenticated) {
      return onRegisterSignUp
        ? onRegisterSignUp()
        : navigate('/members');
    }
  }

  componentWillUnmount() {
    this.activeComponent = false;
  }

  handleSubmit = event => {
    event.preventDefault();
  };

  handleUpdate = event => {
    if (this.activeComponent) {
      this.setState({
        [event.target.name]: event.target.value,
      }, this.handleUpdateErrors);
    }
  };

  handleClickSignUpButton = () => {
    if (this.activeComponent) {
      const {
        email,
        passwordOne,
      } = this.state;

      auth
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(() => {
          this.setState(() => ({
            ...INITIAL_STATE,
            isAuthenticated: true,
          }));
        })
        .catch(err => {
          this.setState({ error: err });
          });
    }
  };

  toggleRegisterPasswordInput = () => {
    const passOne = document.getElementById('passwordOne');
    const passTwo = document.getElementById('passwordTwo');

    if (passOne.type === 'password' && passTwo.type === 'password') {
      passOne.setAttribute('type', 'text');
      passTwo.setAttribute('type', 'text');
    } else {
      passOne.setAttribute('type', 'password');
      passTwo.setAttribute('type', 'password');
    }
  };

  handleUpdateErrors = () => {
    this.handleUpdateRegisterPasswordError();
  };

  handleUpdateRegisterPasswordError = () => {
    if (this.activeComponent) {
      const { passwordOne, passwordTwo } = this.state;

      const hasInput = passwordOne !== '' && passwordTwo !== '';

      if (!hasInput) {
        this.setState({
          registerError: '',
        });
      } else if (hasInput && passwordOne !== passwordTwo) {
        this.setState({
          registerError: 'Passwords should match',
        });
      } else if (
        hasInput &&
        passwordOne === passwordTwo &&
        passwordOne.length < 8
      ) {
        this.setState({
          registerError: 'Password must be at least 8 characters long',
        });
      } else if (hasInput && passwordOne === passwordTwo) {
        this.setState({
          registerError: '',
        });
      }
    }
  };

  render() {
    const {
      email,
      emailError,
      error,
      passwordOne,
      passwordTwo,
      registerError,
    } = this.state;

    const hasInput = passwordOne !== '' && passwordTwo !== '' && email !== '';
    const isInvalid = !hasInput || registerError || emailError;

    return (
      <form key="signup-form" onSubmit={this.handleSubmit}>
        <label css={labelStyles} htmlFor="email">
          Email Address
          <input
            css={inputStyles}
            name="email"
            onChange={this.handleUpdate}
            placeholder="Email Address"
            type="email"
            value={email}
          />
        </label>
        <div css={baseErrorStyles}>{emailError}</div>
        <div
          css={{
            alignItems: 'center',
            display: 'flex',
            marginBottom: 16,
          }}>
          <label css={bottomLabelStyles} htmlFor="passwordOne">
            Password
            <input
              css={inputStyles}
              id="passwordOne"
              name="passwordOne"
              onChange={this.handleUpdate}
              placeholder="Password"
              type="password"
              value={passwordOne}
            />
          </label>
          <div css={{ margin: '27px 0 0 12px' }}>
            <MdRemoveRedEye
              css={{
                height: 20,
                width: 20,
              }}
              onClick={this.toggleRegisterPasswordInput}
            />
          </div>
        </div>
        <div
          css={{
            alignItems: 'center',
            display: 'flex',
            marginBottom: 16,
          }}>
          <label css={bottomLabelStyles} htmlFor="passwordTwo">
            Confirm Password
            <input
              css={inputStyles}
              id="passwordTwo"
              name="passwordTwo"
              onChange={this.handleUpdate}
              placeholder="Confirm Password"
              type="password"
              value={passwordTwo}
            />
          </label>
        </div>
        <div css={baseErrorStyles}>{registerError}</div>

        {error && (
          <div
            css={{
              color: 'red',
              fontFamily: options.headerFontFamily.join(`,`),
              fontWeight: 500,
              margin: '16px 0',
            }}>
            {error.message}
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <div
          css={{
            display: 'flex',
            justifyContent: 'flex-end',
            maxWidth: '70%',
          }}>
          <button
            css={{ marginTop: '1rem', padding: '8px 12px' }}
            disabled={isInvalid}
            onClick={this.handleClickSignUpButton}
            type="submit">
            Sign Up
          </button>
        </div>

      </form>
    );
  }
}

const SignUpFormWithContext = (props) => (
  <AuthUserContext.Consumer>
    {authUser => <SignUpForm {...props} isAuthenticated={!!authUser} />}
  </AuthUserContext.Consumer>
);

export default SignUpFormWithContext;
