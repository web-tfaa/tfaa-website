// External Dependencies
import {
  Button, IconButton, InputAdornment, TextField,
} from '@mui/material';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import React, {
  useCallback, useEffect, useReducer, useState
} from 'react';
import styled from 'styled-components';
import VisiblityIcon from '@mui/icons-material/Visibility';
import VisiblityOffIcon from '@mui/icons-material/VisibilityOff';

// Internal Dependencies
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

const StyledRoot = styled.div(({ theme }) => ({
  '.button': {
    fontFamily: 'Futura PT, Roboto',
  },

  '.buttonContainer': {
    display: 'flex',
    justifyContent: 'flex-end',
    maxWidth: '70%',
  },

  '.error-message': {
    color: theme.palette.error.main,
    fontFamily: options.headerFontFamily.join(','),
    margin: theme.spacing(2, 0),
  },

  '.icon-button-container': {
    margin: '30px 0 0 12px',
  },

  '.password-container': {
    alignItems: 'center',
    display: 'flex',
    marginBottom: theme.spacing(2),
  },

  '.input': {
    display: 'block',
    fontSize: '1rem',
    minWidth: '70%',
  },

  '.label': {
    display: 'block',
    fontSize: '90%',
    letterSpacing: '0.1rem',
    marginTop: theme.spacing(2),
    textTransform: 'uppercase',
  },
}));

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
  const isMounted = useIsMounted();

  const [passwordError, setPasswordError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
  }, [isMounted]);

  useEffect(() => {
    if (isAuthenticated) {
      return onRegisterLogin ? onRegisterLogin() : navigate('/members');
    }
  }, [isAuthenticated, onRegisterLogin]);

  const handleClickSubmitButton = useCallback(() => {
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
  }, [email, isMounted, password]);

  const handleUpdateLoginPasswordError = useCallback(() => {
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
  }, [isMounted, password]);

  useEffect(() => {
    if (isMounted && previousState !== state) {
      handleUpdateLoginPasswordError();
    }
  }, [handleUpdateLoginPasswordError, isMounted, previousState, state]);

  const handleUpdate = useCallback((event) => {
    if (isMounted) {
      dispatchState({
        type: 'updateForm',
        payload: {
          [event.target.name]: event.target.value,
        },
      });
    }
  }, [isMounted]);

  const hasLoginInput = password !== '' && email !== '';
  const isLoginInvalid = !hasLoginInput || Boolean(emailError);

  const handleClickShowPassword = () => {
    setShowPassword((state) => !state);
  };

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <StyledRoot className="login-form">
      <form onSubmit={handleSubmit}>
        <TextField
          autoComplete="username"
          className="input"
          id="username-login"
          label="Email"
          name="email"
          onChange={handleUpdate}
          placeholder="Email Address"
          type="email"
          value={email}
          variant="outlined"
        />
        <div className="error-message">
          {emailError}
        </div>

        <div className="password-container">
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    size="large"
                  >
                    {showPassword ? <VisiblityIcon /> : <VisiblityOffIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            autoComplete="current-password"
            className="input"
            error={Boolean(passwordError)}
            helperText={passwordError}
            id="password-login"
            name="password"
            label="Password"
            onChange={handleUpdate}
            type={showPassword ? 'text' : 'password'}
            value={password}
            variant="outlined"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <div className="buttonContainer">
          <Button
            className="button"
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
          <div className="error-message">
            {error.message}
          </div>
        )}
      </form>
    </StyledRoot>
  );
};

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default LoginForm;
