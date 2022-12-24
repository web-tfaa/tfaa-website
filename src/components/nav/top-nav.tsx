// External Dependencies
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React, {
  FC, KeyboardEventHandler, useCallback, useMemo
} from 'react';
import styled, { useTheme } from 'styled-components';

// Internal Dependencies
import { auth } from '../../firebase';
import AuthUserContext from '../session/AuthUserContext';
import MobileNavMenu from './MobileNavMenu';
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
    img: {
      marginBottom: 0,
    },

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
    [theme.breakpoints.down('mobile')]: {
      padding: 0,
    },
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 2),
  },

  '.mobileNav': {
    [theme.breakpoints.up('mobile')]: {
      display: 'none',
    },
  },

  [theme.breakpoints.up('md')]: {
    height: theme.palette.shapes.topNavHeight,
  },
  [theme.breakpoints.up('mobile')]: {
    position: 'fixed',
    height: theme.palette.shapes.topNavHeight - 16,
  },

  background: theme.palette.common.white,
  borderBottom: `2px solid ${theme.palette.grey['200']}`,
  boxSizing: 'border-box',
  display: 'flex',
  fontFamily: theme.typography.fontFamily,
  justifyContent: 'center',
  flex: 1,
  height: '100%',
  width: '100%',
  zIndex: 2,
}));

// Component Definition
const TopNav: FC<Props> = ({ isAuthenticated }) => {
  const theme = useTheme();

  const handlePressKeyDown = useCallback((event: KeyboardEventHandler<HTMLButtonElement>) => {
    if (['Enter', ' '].includes(event.key)) {
      return isAuthenticated
        ? auth.doSignOut()
        : null;
    }
  }, [isAuthenticated]);

  const logoElement = useMemo(() => (
    <a href="/">
      <div className="logoImageWrapper">
        <img
          alt="TFAA logo"
          className="logoImage"
          src="/tfaa-logo-svg.svg"
        />
      </div>
    </a>
  ), []);

  return (
    <StyledRoot>
      <section className="mobileNav">
        {logoElement}

        <MobileNavMenu />
      </section>

      <div className="logoWrapper">
        <ul className="list">
          <NavItem linkTo="/">
            {logoElement}
          </NavItem>
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
