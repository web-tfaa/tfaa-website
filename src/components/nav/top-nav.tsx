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
      flexGrow: 1,
      listStyle: 'none',
      margin: 0,
      maskImage: `linear-gradient(to right, transparent, white ${rhythm(
        1 / 8,
      )}, white 98%, transparent)`,
      overflowX: 'auto',
      padding: theme.spacing(0, 2),
    },

    display: 'none',
  },

  '.logoImage': {
  },

  '.logoImageWrapper': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  '.logoNavItem': {
    '&:hover': {
      opacity: 1,
      textDecoration: 'none',
    },
  },

  '.logoWrapper': {
    alignItems: 'center',
    display: 'flex',
    fontFamily: options.headerFontFamily.join(','),
    // height: '100%',
    justifyContent: 'center',
    // margin: '0 auto',
    padding: theme.spacing(0, 2),
    // width: '100%',
  },

  '.signOutLinkWrapper': {
    float: 'right',
  },

  [presets.Tablet]: {
    position: 'fixed',
  },

  background: `${hex2rgba('#fbfafc', 0.95)}`,
  borderBottom: '4px solid #2D456F',
  boxShadow: '3px 0 5px #2D456F',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  flex: 1,
  height: theme.palette.shapes.topNavHeight,
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
        <NavItem
          className="logoNavItem"
          linkTo="/"
        >
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
              className="signOutLinkWrapper"
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
