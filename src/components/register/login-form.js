// External Dependencies
import MdRemoveRedEye from 'react-icons/lib/md/remove-red-eye';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { navigate } from 'gatsby';

// Internal Dependencies
import { auth } from '../../firebase';
import { emailRegex } from '../../utils/helpers';
import { options } from '../../utils/typography';

// Local Styles
const labelStyles = {
  display: 'block',
  fontSize: '90%',
  letterSpacing: '0.1rem',
  marginTop: 16,
  textTransform: 'uppercase',
};

const bottomLabelStyles = {
  ...labelStyles,
  marginTop: 16,
};

const inputStyles = {
  display: 'block',
  fontSize: '1rem',
  minWidth: '100%',
  padding: '0.3rem',
};

const baseErrorStyles = {
  color: 'red',
  fontFamily: options.headerFontFamily.join(`,`),
  marginTop: '0.5rem',
};

const INITIAL_STATE = {
  email: '',
  emailError: '',
  error: '',
  isAuthenticated: false,
  password: '',
  passwordError: '',
};

// Component Definition
class LoginForm extends Component {
  static propTypes = {
    onRegisterLogin: PropTypes.func,
  };

  static defaultProps = {
    onRegisterLogin: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
    };

    this.activeComponent = true;
  }

  componentDidUpdate(prevProps, prevState) {
    const { onRegisterLogin } = this.props;
    const { isAuthenticated } = this.state;

    if (isAuthenticated !== prevState.isAuthenticated) {
      return onRegisterLogin
        ? onRegisterLogin()
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

  handleClickSubmitButton = () => {
    if (this.activeComponent) {
      const {
        email,
        password,
      } = this.state;

      auth
        .doSignInWithEmailAndPassword(email, password)
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

  togglePasswordInput = () => {
    const pass = document.getElementById('showhide');

    if (pass.type === 'password') pass.setAttribute('type', 'text');
    else pass.setAttribute('type', 'password');
  };

  handleUpdateErrors = () => {
    this.handleUpdateEmailError();
    this.handleUpdateLoginPasswordError();
  };

  handleUpdateEmailError = () => {
    if (this.activeComponent) {
      const { email } = this.state;

      if (!email) {
        this.setState({
          emailError: 'Email is required',
        });
      } else if (emailRegex.test(email)) {
        this.setState({
          emailError: '',
        });
      } else if (email && !emailRegex.test(email)) {
        this.setState({
          emailError: 'Use a valid email',
        });
      }
    }
  };

  handleUpdateLoginPasswordError = () => {
    if (this.activeComponent) {
      const { password } = this.state;

      const hasInput = password !== '';

      if (!hasInput) {
        this.setState({
          passwordError: 'Password is required',
        });
      } else if (hasInput && password.length < 8) {
        this.setState({
          passwordError: 'Password must be at least 8 characters long',
        });
      } else if (hasInput && password.length > 7) {
        this.setState({
          passwordError: '',
        });
      }
    }
  };

  render() {
    const {
      email,
      emailError,
      error,
      password,
      passwordError,
    } = this.state;

    const hasLoginInput = password !== '' && email !== '';
    const isLoginInvalid = !hasLoginInput || emailError;

    return (
      <div className="login-form">
        <form onSubmit={this.handleSubmit}>
          <label css={labelStyles} htmlFor="email">
            Email Address
            <input
              css={inputStyles}
              name="email"
              onChange={this.handleUpdate}
              placeholder="Email Address"
              type="text"
              value={email}
            />
          </label>
          <div
            css={{
              color: 'red',
              fontFamily: options.headerFontFamily.join(`,`),
              marginTop: 16,
            }}>
            {emailError}
          </div>
          <div
            css={{
              alignItems: 'center',
              display: 'flex',
              marginBottom: 16,
            }}>
            <label css={bottomLabelStyles} htmlFor="password">
              Password
              <input
                css={inputStyles}
                id="showhide"
                name="password"
                onChange={this.handleUpdate}
                placeholder="Password"
                type="password"
                value={password}
              />
            </label>
            <div css={{ margin: '30px 0 0 12px' }}>
              <MdRemoveRedEye
                css={{
                  height: 20,
                  width: 20,
                }}
                onClick={this.togglePasswordInput}
              />
            </div>
          </div>
          <div css={baseErrorStyles}>{passwordError}</div>

          {/* SUBMIT BUTTON */}
          <div
            css={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
            <button
              css={{ marginTop: '1rem', padding: '8px 12px' }}
              disabled={isLoginInvalid}
              onClick={this.handleClickSubmitButton}
              type="submit">
              Sign In
            </button>
          </div>

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
        </form>
      </div>
    );
  }
}

export default LoginForm;
