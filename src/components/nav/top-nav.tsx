// External Dependencies
import { Box } from '@mui/material';
import React, { FC, KeyboardEvent, useCallback } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { auth } from '../../firebase';
import { options } from '../../utils/typography';
import AuthUserContext from '../session/AuthUserContext';
import NavItem from './NavItem';
import CtaButton from '../shared/CtaButton';

// Local Typings
interface Props {
  isAuthenticated: boolean;
}

// Local Variables
const StyledRoot = styled.nav(({ theme }) => ({
  '.list': {
    [theme.breakpoints.up('mobile')]: {
      alignItems: 'center',
      display: 'flex',
      margin: 0,
      padding: theme.spacing(0, 2),
    },

    display: 'none',
  },

  '.logoImageWrapper': {
    [theme.breakpoints.up('md')]: {
      height: '100%',
      width: '100%',
    },
    [theme.breakpoints.up('mobile')]: {
      height: '80%',
      width: '80%',
    },

    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    height: 72,
    width: 132,
  },

  '.logoWrapper': {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 2),
  },

  [theme.breakpoints.up('md')]: {
    height: theme.palette.shapes.topNavHeight,
  },
  [theme.breakpoints.up('mobile')]: {
    position: 'fixed',
    height: theme.palette.shapes.topNavHeight - 16,
  },

  background: theme.palette.common.white,
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  flex: 1,
  height: '100%',
  width: '100%',
  zIndex: 2,
}));

// Component Definition
const TopNav: FC<Props> = ({ isAuthenticated }) => {
  const handlePressKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
    if (['Enter', ' '].includes(event.key)) {
      return isAuthenticated
        ? auth.doSignOut()
        : null;
    }
  }, [isAuthenticated]);

  return (
    <StyledRoot>
      <div className="logoWrapper">
        <NavItem linkTo="/">
          <div className="logoImageWrapper">
            <img
              alt="TFAA logo"
              className="logoImage"
              src="/tfaa-logo-svg.svg"
            />
          </div>
        </NavItem>

        <ul className="list">
          <NavItem linkTo="/about/">About</NavItem>
          <NavItem linkTo="/events/">Events</NavItem>
          <NavItem linkTo="/resources/">Resources</NavItem>
          <NavItem linkTo="/members/">Membership</NavItem>
          <NavItem linkTo="/sponsors/">Sponsors</NavItem>

          <Box
            display="flex"
            alignItems="center"
            marginLeft={2}
          >
            {isAuthenticated ? (
              <CtaButton
                colorVariant="signIn"
                onClick={auth.doSignOut}
                onKeyDown={handlePressKeyDown}
                to="/members/login"
              >
                Sign Out
              </CtaButton>
            ) : (
              <CtaButton
                colorVariant="signIn"
                onKeyDown={handlePressKeyDown}
                to="/members/login"
              >
                Members Login
              </CtaButton>
            )}
          </Box>
        </ul>
      </div>
    </StyledRoot>
  );
};

const TopNavWithContext = (props: any) => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <TopNav
        {...props}
        isAuthenticated={!!authUser}
      />
    )}
  </AuthUserContext.Consumer>
);

export default TopNavWithContext;
