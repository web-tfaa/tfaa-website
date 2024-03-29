// External Dependencies
import Box from '@mui/material/Box';
import React, {
  KeyboardEventHandler, useCallback, useMemo
} from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';

// Internal Dependencies
import { auth } from '../../firebase';
import { useIsAuthenticated } from '../../utils/hooks/useIsAuthenticated';
import MobileNavMenu from './MobileNavMenu';
import NavItem from './NavItem';
import CtaButton from '../shared/CtaButton';

// Local Typings
interface Props {
  pathname: string;
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
    width: 175,
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

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  paddingTop: theme.spacing(3),
  width: '100%',
  zIndex: 1000,
}));

// Component Definition
const TopNav: React.FC<Props> = ({ pathname }) => {
  const isAuthenticated = useIsAuthenticated();

  const handleNavigateToSignInPage = () => navigate('/members/login');

  const handleSignInOrOut = useCallback((event: KeyboardEventHandler<HTMLButtonElement>) => {
    if (['Enter', ' '].includes(event.key)) {
      return isAuthenticated
        ? auth.doSignOut()
        : handleNavigateToSignInPage;
    }
  }, [isAuthenticated]);

  const logoElement = useMemo(() => (
    <div className="logoImageWrapper">
      <img
        alt="TFAA logo"
        className="logoImage"
        src="/tfaa-logo-svg.svg"
      />
    </div>
  ), []);

  const membersSignInButtonElement = useMemo(() => (
    <CtaButton
      colorVariant="signIn"
      to="/members/login"
    >
      Members Login
    </CtaButton>
  ), []);

  const membersSignOutButtonElement = useMemo(() => (
    <CtaButton
      colorVariant="signIn"
      onKeyDown={handleSignInOrOut}
      variant="outlined"
    >
      Sign Out
    </CtaButton>
  ), [handleSignInOrOut]);

  return (
    <StyledRoot>
      <section className="mobileNav">
        <Box paddingBottom={3}>
          <a href="/">
            {logoElement}
          </a>
        </Box>

        <Box
          paddingBottom={2}
          width={256}
        >
          {isAuthenticated ? membersSignOutButtonElement : membersSignInButtonElement}
        </Box>

        <MobileNavMenu
          isSignedIn={isAuthenticated}
          onSignOut={auth.doSignOut}
          pathname={pathname}
        />
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
            component="li"
            display="flex"
            alignItems="center"
            marginLeft={2}
            marginTop={1.5}
          >
            {isAuthenticated ? (
              <CtaButton
                colorVariant="signIn"
                onClick={auth.doSignOut}
                onKeyDown={handleSignInOrOut}
                to="/members/login"
              >
                Sign Out
              </CtaButton>
            ) : membersSignInButtonElement}
          </Box>
        </ul>
      </div>
    </StyledRoot>
  );
};

export default TopNav;
