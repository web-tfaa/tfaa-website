// External Dependencies
import { Box, Button } from '@mui/material';
import { navigate } from 'gatsby';
import React, {
  useCallback, useEffect, useReducer, useState
} from 'react';
import styled from 'styled-components';

// Internal Dependencies
import RemoveRedEyeIcon from '../shared/RemoveRedEyeIcon';
import useIsMounted from '../../utils/hooks/useIsMounted';
import usePrevious from '../../utils/hooks/usePrevious';
import { auth } from '../../firebase';
import { useGetAuthUser } from '../../utils/hooks/useGetAuthUser';
import CtaButton from '../shared/CtaButton';

// Local Typings
interface Props {
  onRegisterSignUp: () => void;
}

// Local Variables
const StyledForm = styled.form(({ theme }) => ({
  '.bottomLabel': {
    marginTop: theme.spacing(2),
  },

  '.buttonContainer': {
    display: 'flex',
    justifyContent: 'flex-end',
    maxWidth: '70%',
  },

  '.error': {
    color: theme.palette.error.main,
    fontWeight: 500,
    margin: theme.spacing(2, 0),
  },

  '.regsiterError': {
    color: theme.palette.error.main,
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
    fontSize: '70%',
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
const SignupForm: React.FC<Props> = ({ onRegisterSignUp }) => {
  const { currentAuthUser } = useGetAuthUser();
  const isMounted = useIsMounted();

  const isAuthenticated = Boolean(currentAuthUser);

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
      onRegisterSignUp
        ? onRegisterSignUp()
        : navigate('/members');
    }
  }, [isAuthenticated, onRegisterSignUp]);

  const handleClickSignUpButton = () => {
    if (isMounted && typeof window !== 'undefined') {
      auth
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(() => {
          dispatchState({ type: 'clearForm' });
        })
        .catch((error: any) => {
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
        <CtaButton
          className="button"
          colorVariant="about"
          disabled={isInvalid}
          fontWeight={600}
          onClick={handleClickSignUpButton}
          size="large"
          type="submit"
        >
          Sign Up
        </CtaButton>
      </div>
    </StyledForm>
  );
};

export default SignupForm;
