// External Dependencies
import { navigate } from 'gatsby';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import PropTypes from 'prop-types';
import React, {
  useCallback, useEffect, useReducer, useState
} from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import VisiblityIcon from '@mui/icons-material/Visibility';
import VisiblityOffIcon from '@mui/icons-material/VisibilityOff';
import styled from 'styled-components';

// Internal Dependencies
import { auth } from '../../firebase';
import { options } from '../../utils/typography';
import CtaButton from '../../components/shared/CtaButton';
import useIsMounted from '../../utils/hooks/useIsMounted';
import usePrevious from '../../utils/hooks/usePrevious';

// Local Variables
const propTypes = {
  onRegisterLogin: PropTypes.func,
};

const defaultProps = {
  onRegisterLogin: null,
};

const StyledRoot = styled.div(({ theme }) => ({
  '.buttonContainer': {
    display: 'flex',
    padding: theme.spacing(4, 0, 2),
  },

  '.className': {
    width: '100%',
  },

  '.errorMessage': {
    color: theme.palette.error.main,
    fontWeight: 500,
    margin: theme.spacing(2, 0),
  },

  '.icon-button-container': {
    margin: '30px 0 0 12px',
  },

  '.textFieldInput': {
    marginBotton: theme.spacing(6),
  },

  form: {
    '& > div:first-child': {
      marginBottom: theme.spacing(4),
    },
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 420,
  }
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
  const isLoginInvalid = !hasLoginInput || Boolean(emailError) || Boolean(error?.message);

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
          className="textField"
          id="username-login"
          inputProps={{
            className: 'textFieldInput',
          }}
          label="Email"
          name="email"
          onChange={handleUpdate}
          placeholder="Email Address"
          type="email"
          value={email}
          variant="outlined"
        />

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
          className="textField"
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

        {error && (
          <Typography className="errorMessage">
            {error.message}
          </Typography>
        )}

        {/* SUBMIT BUTTON */}
        <div className="buttonContainer">
          <CtaButton
            colorVariant="resources"
            disabled={isLoginInvalid}
            fontWeight={600}
            onClick={handleClickSubmitButton}
            size="large"
            type="submit"
            width={200}
          >
            Sign In
          </CtaButton>
        </div>
      </form>
    </StyledRoot>
  );
};

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default LoginForm;
