// External Dependencies
import { Box } from '@mui/material';
import React, { FC, KeyboardEventHandler, useCallback } from 'react';
import hex2rgba from 'hex2rgba';
import styled from 'styled-components';

// Internal Dependencies
import { auth } from '../../firebase';
import { rhythm, options } from '../../utils/typography';
import AuthUserContext from '../session/AuthUserContext';
import presets from '../../utils/presets';
import NavItem from './NavItem';
import CtaButton from '../shared/CtaButton';

// Local Typings
interface Props {
  isAuthenticated: boolean;
}

// Local Variables
const StyledRoot = styled.nav(({ theme }) => ({
  '.list': {
    [presets.Tablet]: {
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
    [presets.Tablet]: {
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
    fontFamily: options.headerFontFamily.join(','),
    justifyContent: 'center',
    padding: theme.spacing(0, 2),
  },

  [theme.breakpoints.up('md')]: {
    height: theme.palette.shapes.topNavHeight,
  },
  [presets.Tablet]: {
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
  const handlePressKeyDown = useCallback((event: KeyboardEventHandler<HTMLDivElement>) => {
    if (['Enter', ' '].includes(event.key)) {
      auth.doSignOut();
    }
  }, []);

  return (
    <StyledRoot>
      <div className="logoWrapper">
        <NavItem linkTo="/">
          <div className="logoImageWrapper">
            <img
              alt="TFAA logo"
              className="logoImage"
              src="./tfaa-logo-svg.svg"
            />
          </div>
        </NavItem>

        <ul className="list">
          <NavItem linkTo="/about/">About</NavItem>
          <NavItem linkTo="/events/">Events</NavItem>
          <NavItem linkTo="/resources/">Resources</NavItem>
          <NavItem linkTo="/members/">Membership</NavItem>
          <NavItem linkTo="/sponsors/">Sponsors</NavItem>
          {isAuthenticated ? (
            <div
              onClick={auth.doSignOut}
              onKeyDown={handlePressKeyDown}
              role="button"
              tabIndex={0}
            >
              <NavItem linkTo="/">Sign Out</NavItem>
            </div>
          ) : (
            <Box
              display="flex"
              alignItems="center"
              marginLeft={2}
            >
              <CtaButton color="orange">Members Login</CtaButton>
            </Box>
          )}
        </ul>
      </div>
    </StyledRoot>
  );
};

const TopNavWithContext = (props) => (
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
