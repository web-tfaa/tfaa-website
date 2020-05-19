// External Dependencies
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useEffect, useReducer, useState } from 'react';
import { navigate } from 'gatsby';
import { makeStyles } from '@material-ui/styles';

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

const useStyles = makeStyles({
  button: {
    fontFamily: 'Futura PT, Roboto',
  },
});

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
  fontFamily: options.headerFontFamily.join(','),
  marginTop: '0.5rem',
};

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
  const classes = useStyles();

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
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      return onRegisterSignUp ? onRegisterSignUp() : navigate('/members');
    }
  }, [isAuthenticated, onRegisterSignUp]);

  const handleClickSignUpButton = () => {
    if (isMounted) {
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

  const handleUpdateErrors = () => {
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
  };

  useEffect(() => {
    if (isMounted && previousState !== state) {
      console.log('nopeee');
      handleUpdateErrors();
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

  const hasInput = passwordOne !== '' && passwordTwo !== '' && email !== '';
  const isInvalid = !hasInput || Boolean(registerError || emailError);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form key="signup-form" onSubmit={handleSubmit}>
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
      <div css={baseErrorStyles}>{emailError}</div>
      <div
        css={{
          alignItems: 'center',
          display: 'flex',
          marginBottom: 16,
        }}
      >
        <label css={bottomLabelStyles} htmlFor="passwordOne">
          Password
          <input
            css={inputStyles}
            id="passwordOne"
            name="passwordOne"
            onChange={handleUpdate}
            placeholder="Password"
            type="password"
            value={passwordOne}
          />
        </label>
        <div css={{ margin: '27px 0 0 12px' }}>
          <RemoveRedEyeIcon onClick={toggleRegisterPasswordInput} />
        </div>
      </div>
      <div
        css={{
          alignItems: 'center',
          display: 'flex',
          marginBottom: 16,
        }}
      >
        <label css={bottomLabelStyles} htmlFor="passwordTwo">
          Confirm Password
          <input
            css={inputStyles}
            id="passwordTwo"
            name="passwordTwo"
            onChange={handleUpdate}
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
            fontFamily: options.headerFontFamily.join(','),
            fontWeight: 500,
            margin: '16px 0',
          }}
        >
          {error.message}
        </div>
      )}

      {/* SUBMIT BUTTON */}
      <div
        css={{
          display: 'flex',
          justifyContent: 'flex-end',
          maxWidth: '70%',
        }}
      >
        <Button
          className={classes.button}
          color="primary"
          // css={{ marginTop: '1rem', padding: '8px 12px' }}
          disabled={isInvalid}
          onClick={handleClickSignUpButton}
          type="submit"
          variant="contained"
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
};

SignUpForm.propTypes = propTypes;
SignUpForm.defaultProps = defaultProps;

const SignUpFormWithContext = (props) => (
  <AuthUserContext.Consumer>
    {(authUser) => <SignUpForm {...props} isAuthenticated={!!authUser} />}
  </AuthUserContext.Consumer>
);

export default SignUpFormWithContext;
