// External Dependencies
import React, {
  FC, KeyboardEventHandler, useCallback, useMemo
} from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { auth } from '../../firebase';
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
  const handlePressKeyDown = useCallback((event: KeyboardEventHandler<HTMLButtonElement>) => {
    if (['Enter', ' '].includes(event.key)) {
      return isAuthenticated
        ? auth.doSignOut()
        : null;
    }
  }, [isAuthenticated]);

  const logoElement = useMemo(() => (
    <NavItem
      className="logoNavItem"
      linkTo="/"
    >
      <div className="logoImageWrapper">
        <img
          alt="TMAC logo"
          className="logoImage"
          height="30px"
          src="https://res.cloudinary.com/tmac/image/upload/v1523131020/tmac-logo.jpg"
        />
        <div className="logoText">
          TMAC
        </div>
      </div>
    </NavItem>
  ), []);

  return (
    <StyledRoot>
      <div className="logoWrapper">
        {logoElement}

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
