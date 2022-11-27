// External Dependencies
import { Box, Button } from '@mui/material';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import React, {
  useCallback, useEffect, useReducer, useState
} from 'react';
import styled from 'styled-components';

// Internal Dependencies
import AuthUserContext from '../session/AuthUserContext';
import RemoveRedEyeIcon from '../shared/RemoveRedEyeIcon';
import useIsMounted from '../../utils/hooks/useIsMounted';
import usePrevious from '../../utils/hooks/usePrevious';
import { auth } from '../../firebase';
import { options } from '../../utils/typography';

// Local Variables
const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onRegisterSignUp: PropTypes.func,
};

const defaultProps = {
  onRegisterSignUp: null,
};

const StyledForm = styled.form(({ theme }) => ({
  '.bottomLabel': {
    marginTop: theme.spacing(2),
  },

  '.button': {
    fontFamily: 'Futura PT, Roboto',
  },

  '.buttonContainer': {
    display: 'flex',
    justifyContent: 'flex-end',
    maxWidth: '70%',
  },

  '.error': {
    color: theme.palette.error.main,
    fontFamily: options.headerFontFamily.join(','),
    marginTop: '0.5rem',
  },

  '.regsiterError': {
    color: theme.palette.error.main,
    fontFamily: options.headerFontFamily.join(','),
    fontWeight: 500,
    margin: theme.spacing(2, 0),
  },

  '.visibilityIcon': {
    margin: '27px 0 0 12px',
  },

  input: {
    display: 'block',
    fontSize: '1rem',
    minWidth: '70%',
    padding: '0.3rem',
  },

  label: {
    display: 'block',
    fontSize: '67.5%',
    letterSpacing: '0.125em',
    textTransform: 'uppercase',
  },
}));

const SIGNUP_FORM_REDUCER_INITIAL_STATE = {
  email: '',
  emailError: '',
  error: '',
  passwordOne: '',
  passwordTwo: '',
};

function signupFormReducer(state, { type, payload }) {
  switch (type) {
    case 'updateForm':
      return {
        ...state,
        ...payload,
      };
    case 'clearForm':
      return SIGNUP_FORM_REDUCER_INITIAL_STATE;
    default:
      return SIGNUP_FORM_REDUCER_INITIAL_STATE;
  }
}

// Component Definition
const SignUpForm = ({ isAuthenticated, onRegisterSignUp }) => {
  const isMounted = useIsMounted();

  const [registerError, setRegisterError] = useState('');

  const [state, dispatchState] = useReducer(signupFormReducer, SIGNUP_FORM_REDUCER_INITIAL_STATE);

  const previousState = usePrevious(state);

  const {
    email, emailError, error, passwordOne, passwordTwo,
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
      return onRegisterSignUp ? onRegisterSignUp() : navigate('/members');
    }
  }, [isAuthenticated, onRegisterSignUp]);

  const handleClickSignUpButton = () => {
    if (isMounted && typeof window !== 'undefined') {
      auth
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(() => {
          dispatchState({ type: 'clearForm' });
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

  const toggleRegisterPasswordInput = () => {
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

  const handleUpdateErrors = useCallback(() => {
    if (isMounted) {
      const hasInput = passwordOne !== '' && passwordTwo !== '';

      if (!hasInput) {
        setRegisterError('');
      } else if (hasInput && passwordOne !== passwordTwo) {
        setRegisterError('Passwords should match');
      } else if (hasInput && passwordOne === passwordTwo && passwordOne.length < 8) {
        setRegisterError('Password must be at least 8 characters long');
      } else if (hasInput && passwordOne === passwordTwo) {
        setRegisterError('');
      }
    }
  }, [isMounted, passwordOne, passwordTwo]);

  useEffect(() => {
    if (isMounted && previousState !== state) {
      handleUpdateErrors();
    }
  }, [handleUpdateErrors, isMounted, previousState, state]);

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

  const hasInput = passwordOne !== '' && passwordTwo !== '' && email !== '';
  const isInvalid = !hasInput || Boolean(registerError || emailError);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <StyledForm
      key="signup-form"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="email"
      >
        Email Address
        <input
          name="email"
          onChange={handleUpdate}
          placeholder="Email Address"
          type="email"
          value={email}
        />
      </label>

      <div className="error">{emailError}</div>

      <Box
        alignItems="center"
        display="flex"
        marginBottom={2}
      >
        <label
          className="bottomLabel"
          htmlFor="passwordOne"
        >
          Password
          <input
            id="passwordOne"
            name="passwordOne"
            onChange={handleUpdate}
            placeholder="Password"
            type="password"
            value={passwordOne}
          />
        </label>
        <div className="visibilityIcon">
          <RemoveRedEyeIcon onClick={toggleRegisterPasswordInput} />
        </div>
      </Box>

      <Box
        alignItems="center"
        display="flex"
        marginBottom={2}
      >
        <label
          className="bottomLabel"
          htmlFor="passwordTwo"
        >
          Confirm Password
          <input
            id="passwordTwo"
            name="passwordTwo"
            onChange={handleUpdate}
            placeholder="Confirm Password"
            type="password"
            value={passwordTwo}
          />
        </label>
      </Box>

      <div className="error">{registerError}</div>

      {error && (
        <div className="regsiterError">
          {error.message}
        </div>
      )}

      {/* SUBMIT BUTTON */}
      <div className="buttonContainer">
        <Button
          className="button"
          color="primary"
          disabled={isInvalid}
          onClick={handleClickSignUpButton}
          type="submit"
          variant="contained"
        >
          Sign Up
        </Button>
      </div>
    </StyledForm>
  );
};

SignUpForm.propTypes = propTypes;
SignUpForm.defaultProps = defaultProps;

const SignUpFormWithContext = (props) => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <SignUpForm
        {...props}
        isAuthenticated={!!authUser}
      />
    )}
  </AuthUserContext.Consumer>
);

export default SignUpFormWithContext;
