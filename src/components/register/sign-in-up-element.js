// External Dependencies
import { Box } from '@mui/material';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import presets from '../../utils/presets';
import { options } from '../../utils/typography';

// Local Variables
const propTypes = {
  onClickSignIn: PropTypes.func,
  viewSignUp: PropTypes.bool,
};

const defaultProps = {
  onClickSignIn: null,
  viewSignUp: false,
};

const StyledSpan = styled.span(({ theme }) => ({
  '&:hover': {
    background: theme.palette.ui.bright,
    cursor: 'pointer',
  },

  color: 'inherit',
  textDecoration: 'none',
  transition: `all ${presets.animation.speedFast} ${
    presets.animation.curveDefault
  }`,
  borderBottom: `1px solid ${theme.palette.ui.bright}`,
  boxShadow: `inset 0 -2px 0px 0px ${theme.palette.ui.bright}`,
  fontFamily: options.headerFontFamily.join(','),
  fontWeight: 'bold',
}));

// Component Definition
const SignInUpElement = ({
  onClickSignIn,
  viewSignUp,
}) => {
  const handleClickSignIn = useCallback(() => {
    onClickSignIn ? onClickSignIn() : navigate('/members/login');
  }, [onClickSignIn]);

  const handleClickSignUp = useCallback(() => {
    navigate('/members/sign-up');
  }, []);

  return (
    <Box marginBottom={4}>
      <Box marginBottom={2}>
        {`${viewSignUp ? "Don't" : 'Already'}`} have an account?
      </Box>

      <StyledSpan
        onClick={
            viewSignUp
              ? handleClickSignUp
              : onClickSignIn || handleClickSignIn
          }
        onKeyPress={
            viewSignUp
              ? handleClickSignUp
              : onClickSignIn || handleClickSignIn
          }
        role="button"
        tabIndex={0}
      >
        {`Sign ${viewSignUp ? 'Up' : 'In'}!`}
      </StyledSpan>
    </Box>
  );
};

SignInUpElement.propTypes = propTypes;
SignInUpElement.defaultProps = defaultProps;

export default SignInUpElement;
