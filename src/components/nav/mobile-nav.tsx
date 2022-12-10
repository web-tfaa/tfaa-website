// External Dependencies
import GradeIcon from '@mui/icons-material/Grade';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { FC, KeyboardEvent, useCallback } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { auth } from '../../firebase';
import { options } from '../../utils/typography';
import AuthUserContext from '../session/AuthUserContext';
import MobileNavItem from './MobileNavItem';

// Local Typings
interface Props {
  isAuthenticated: boolean;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  [theme.breakpoints.up('mobile')]: {
    display: 'none',
  },

  alignItems: 'center',
  background: theme.palette.ui.whisper,
  borderTop: `2px solid ${theme.palette.ui.light}`,
  bottom: 0,
  boxSizing: 'border-box',
  display: 'flex',
  fontFamily: options.headerFontFamily.join(','),
  justifyContent: 'space-around',
  left: 0,
  paddingBottom: 'env(safe-area-inset-bottom)',
  position: 'fixed',
  right: 0,
  zIndex: 11,
}));

// Component Definition
const MobileNav: FC<Props> = ({ isAuthenticated }) => {
  console.log('MobileNav : isAuthenticated', isAuthenticated);

  const handlePressKeyDown = useCallback((event: KeyboardEvent<Element>) => {
    if (['Enter', ' '].includes(event.key)) {
      return isAuthenticated
        ? auth.doSignOut()
        : null;
    }
  }, [isAuthenticated]);

  return (
    <StyledRoot>
      <MobileNavItem
        icon={InfoOutlinedIcon}
        label="About"
        linkTo="/about/"
      />
      <MobileNavItem
        icon={FolderOpenIcon}
        label="Resources"
        linkTo="/resources/"
      />
      <MobileNavItem
        icon={PersonOutlinedIcon}
        label="Members"
        linkTo="/members/"
      />
      <MobileNavItem
        icon={GradeIcon}
        label="Sponsors"
        linkTo="/sponsors/"
      />
      {isAuthenticated && (
        <MobileNavItem
          icon={LogoutIcon}
          label="Sign out"
          onClick={auth.doSignOut}
          onKeyDown={handlePressKeyDown}
        />
      )}
    </StyledRoot>
  );
};

const MobileNavWithContext = (props: any) => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <MobileNav
        {...props}
        isAuthenticated={!!authUser}
      />
    )}
  </AuthUserContext.Consumer>
);

export default MobileNavWithContext;
