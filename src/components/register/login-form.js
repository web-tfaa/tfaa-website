// External Dependencies
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useEffect, useReducer, useState } from 'react';
import { navigate } from 'gatsby';
import { makeStyles } from '@material-ui/styles';

// Internal Dependencies
import RemoveRedEyeIcon from '../shared/RemoveRedEyeIcon';
import useIsMounted from '../../utils/hooks/useIsMounted';
import usePrevious from '../../utils/hooks/usePrevious';
import { auth } from '../../firebase';
import { options } from '../../utils/typography';

// Local Variables
const propTypes = {
  onRegisterLogin: PropTypes.func,
};

const defaultProps = {
  onRegisterLogin: null,
};

const useStyles = makeStyles({
  button: {
    fontFamily: 'Futura PT, Roboto',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    maxWidth: '70%',
  },
});

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
  minWidth: '70%',
  padding: '0.3rem',
};

const baseErrorStyles = {
  color: 'red',
  fontFamily: options.headerFontFamily.join(','),
  marginTop: '0.5rem',
};

const LOGIN_FORM_REDUCER_INITIAL_STATE = {
  email: '',
  emailError: '',
  error: '',
  password: '',
  passwordError: '',
};

function loginFormReducer(state, { type, payload }) {
  switch (type) {
    case 'updateForm':
      return {
        ...state,
        ...payload,
      };
    case 'clearForm':
      return LOGIN_FORM_REDUCER_INITIAL_STATE;
    default:
      return LOGIN_FORM_REDUCER_INITIAL_STATE;
  }
}

// Component Definition
const LoginForm = ({ onRegisterLogin }) => {
  const classes = useStyles();

  const isMounted = useIsMounted();

  const [passwordError, setPasswordError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState('');

  const [state, dispatchState] = useReducer(loginFormReducer, LOGIN_FORM_REDUCER_INITIAL_STATE);

  const previousState = usePrevious(state);

  const {
    email,
    emailError,
    error,
    password,
  } = state;

  useEffect(() => {
    return () => {
      if (isMounted) {
        dispatchState({ type: 'clearForm' });
      }
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      return onRegisterLogin ? onRegisterLogin() : navigate('/members');
    }
  }, [isAuthenticated, onRegisterLogin]);

  const handleClickSubmitButton = () => {
    if (isMounted && typeof window !== 'undefined') {
      auth
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
          dispatchState({ type: 'clearForm' });
          setIsAuthenticated(true);
        })
        .catch((error) => {
          dispatchState({
            type: 'updateForm',
            payload: {
              error,
            },
          });
        });
    }
  };

  const togglePasswordInput = () => {
    const pass = document.getElementById('showhide');

    if (pass.type === 'password') pass.setAttribute('type', 'text');
    else pass.setAttribute('type', 'password');
  };

  const handleUpdateLoginPasswordError = () => {
    if (isMounted) {
      const hasInput = password !== '';

      if (!hasInput) {
        setPasswordError('');
      } else if (hasInput && password.length < 8) {
        setPasswordError('Password must be at least 8 characters long');
      } else if (hasInput && password.length > 7) {
        setPasswordError('');
      }
    }
  };

  useEffect(() => {
    if (isMounted && previousState !== state) {
      handleUpdateLoginPasswordError();
    }
  }, [state]);

  const handleUpdate = (event) => {
    if (isMounted) {
      dispatchState({
        type: 'updateForm',
        payload: {
          [event.target.name]: event.target.value,
        },
      });
    }
  };

  const hasLoginInput = password !== '' && email !== '';
  const isLoginInvalid = !hasLoginInput || emailError;

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <label css={labelStyles} htmlFor="email">
          Email Address
          <input
            css={inputStyles}
            name="email"
            onChange={handleUpdate}
            placeholder="Email Address"
            type="email"
            value={email}
          />
        </label>
        <div
          css={{
            color: 'red',
            fontFamily: options.headerFontFamily.join(','),
            marginTop: 16,
          }}
        >
          {emailError}
        </div>
        <div
          css={{
            alignItems: 'center',
            display: 'flex',
            marginBottom: 16,
          }}
        >
          <label css={bottomLabelStyles} htmlFor="password">
            Password
            <input
              css={inputStyles}
              id="showhide"
              name="password"
              onChange={handleUpdate}
              placeholder="Password"
              type="password"
              value={password}
            />
          </label>
          <div css={{ margin: '30px 0 0 12px' }}>
            <RemoveRedEyeIcon onClick={togglePasswordInput} />
          </div>
        </div>
        <div css={baseErrorStyles}>{passwordError}</div>

        {/* SUBMIT BUTTON */}
        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            color="primary"
            disabled={isLoginInvalid}
            onClick={handleClickSubmitButton}
            type="submit"
            variant="contained"
          >
            Sign In
          </Button>
        </div>

        {error && (
          <div
            css={{
              color: 'red',
              fontFamily: options.headerFontFamily.join(','),
              fontWeight: 500,
              margin: '16px 0',
            }}
          >
            {error.message}
          </div>
        )}
      </form>
    </div>
  );
};

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default LoginForm;
