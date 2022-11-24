// External Dependencies
import { FC, KeyboardEventHandler, useCallback } from 'react';
import hex2rgba from 'hex2rgba';
import styled from 'styled-components';

// Internal Dependencies
import AuthUserContext from '../session/AuthUserContext';
import presets from '../../utils/presets';
import { auth } from '../../firebase';
import { rhythm, options } from '../../utils/typography';
import NavItem from './NavItem';

// Local Typings
interface Props {
  isAuthenticated: boolean;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.list': {
    [presets.Tablet]: {
      display: 'flex',
      flexGrow: 1,
      listStyle: 'none',
      margin: 0,
      maskImage: `linear-gradient(to right, transparent, white ${rhythm(
        1 / 8,
      )}, white 98%, transparent)`,
      overflowX: 'auto',
      padding: 0,
    },

    display: 'none',
  },

  '.logoImage': {
    marginBottom: 0,
  },

  '.logoImageWrapper': {
    alignItems: 'center',
    color: 'inherit',
    display: 'flex',
    marginRight: rhythm(1 / 2),
    textDecoration: 'none',
  },

  '.logoNavItem': {
    '&:hover': {
      opacity: 1,
      textDecoration: 'none',
    },
  },

  '.logoText': {
    fontSize: 24,
    marginLeft: '0.8em',
    textDecoration: 'none',
  },

  '.logoWrapper': {
    alignItems: 'flex-end',
    borderBottom: '4px solid #2D456F',
    boxShadow: '3px 0 5px #2D456F',
    boxSizing: 'border-box',
    display: 'flex',
    fontFamily: options.headerFontFamily.join(','),
    height: '100%',
    margin: '0 auto',
    paddingLeft: rhythm(3 / 4),
    paddingRight: rhythm(3 / 4),
    width: '100%',
  },

  '.signOutLinkWrapper': {
    float: 'right',
  },

  [presets.Tablet]: {
    position: 'fixed',
  },

  background: `${hex2rgba('#fbfafc', 0.95)}`,
  display: 'flex',
  flex: 1,
  height: presets.headerHeight,
  left: 0,
  right: 0,
  zIndex: '2',
}));

// Component Definition
const TopNav: FC<Props> = ({ isAuthenticated }) => {
  const handlePressKeyDown = useCallback((event: KeyboardEventHandler<HTMLDivElement>) => {
    if (['Enter', ' '].includes(event.key)) {
      auth.doSignOut();
    }
  }, []);

  return (
    <StyledRoot role="navigation">
      <div className="logoWrapper">
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

        <ul className="list">
          <NavItem linkTo="/about/">About</NavItem>
          <NavItem linkTo="/events/">Events</NavItem>
          <NavItem linkTo="/resources/">Resources</NavItem>
          <NavItem linkTo="/members/">Membership</NavItem>
          <NavItem linkTo="/sponsors/">Sponsors</NavItem>
          {isAuthenticated && (
            <div
              className="signOutLinkWrapper"
              onClick={auth.doSignOut}
              onKeyDown={handlePressKeyDown}
              role="button"
              tabIndex={0}
            >
              <NavItem linkTo="/">Sign Out</NavItem>
            </div>
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
