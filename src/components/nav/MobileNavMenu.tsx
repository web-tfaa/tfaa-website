// External Dependencies
import { PopoverOrigin } from '@mui/material/Popover';
import { navigate } from 'gatsby';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import React, { FC } from 'react';
import styled, { useTheme } from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';

// Local Typings
interface Props {
  isSignedIn: boolean;
  onSignOut: () => void;
  pathname: string;
}

// Local Variables
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  '&.menuIcon': {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1.5),
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '.bullet': {
    fontSize: 36,
    lineHeight: 1,
  },

  '.isActive': {
    backgroundColor: theme.palette.action.selected,
    // backgroundColor: theme.palette.altBackground,
  },

  '#aboutBullet, #sponsorsBullet': {
    color: theme.palette.tfaa.about,
  },
  '#eventsBullet': {
    color: theme.palette.tfaa.events,
  },
  '#membershipBullet': {
    color: theme.palette.tfaa.membership,
  },
  '#resourcesBullet': {
    color: theme.palette.tfaa.resources,
  }
}));

const anchorOrigin: PopoverOrigin = {
  horizontal: 'right',
  vertical: 'bottom',
};
const transformOrigin: PopoverOrigin = {
  horizontal: 'right',
  vertical: 'top',
};

// Component Definition
const MobileNavMenu: FC<Props> = ({
  isSignedIn,
  onSignOut,
  pathname,
}) => {
  const theme = useTheme();

  const isAboutPage = pathname.endsWith('/about');
  const isEventsPage = pathname.endsWith('/events');
  const isResourcesPage = pathname.endsWith('/resources');
  const isMembershipPage = pathname.endsWith('/members');
  const isSponsorsPage = pathname.endsWith('/sponsors');

  // Menu logic
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePressAbout = () => {
    if (!isAboutPage) {
      navigate('/about');
    }
    handleClose();
  };

  const handlePressEvents = () => {
    if (!isEventsPage) {
      navigate('/events');
    }
    handleClose();
  };

  const handlePressResources = () => {
    if (!isResourcesPage) {
      navigate('/resources');
    }
    handleClose();
  };

  const handlePressMembership = () => {
    if (!isMembershipPage) {
      navigate('/members');
    }
    handleClose();
  };

  const handlePressSponsors = () => {
    if (!isSponsorsPage) {
      navigate('/sponsors');
    }
    handleClose();
  };

  const handlePressSignInOut = () => {
    if (!isSignedIn) {
      navigate('/members/login');
    } else {
      onSignOut();
    }
    handleClose();
  };

  return (
    <>
      <StyledIconButton
        aria-controls={open ? 'mobile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        className="menuIcon"
        id="mobile-menu-button"
        onClick={handleClick}
      >
        <MenuIcon
          fontSize="large"
          htmlColor={theme.palette.tfaa.about}
        />
      </StyledIconButton>

      <StyledMenu
        id="mobile-menu"
        aria-labelledby="mobile-menu-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        <MenuItem
          className={clsx(isAboutPage ? 'isActive' : '')}
          onClick={handlePressAbout}
        >
          <ListItemIcon
            className="bullet"
            id="aboutBullet"
          >
            •
          </ListItemIcon>

          <ListItemText>
            About {appNameShort}
          </ListItemText>
        </MenuItem>

        <MenuItem
          className={clsx(isEventsPage ? 'isActive' : '')}
          onClick={handlePressEvents}
        >
          <ListItemIcon
            className="bullet"
            id="eventsBullet"
          >
            •
          </ListItemIcon>

          <ListItemText>
            Events
          </ListItemText>
        </MenuItem>

        <MenuItem
          className={clsx(isResourcesPage ? 'isActive' : '')}
          onClick={handlePressResources}
        >
          <ListItemIcon
            className="bullet"
            id="resourcesBullet"
          >
            •
          </ListItemIcon>

          <ListItemText>
            Resources
          </ListItemText>
        </MenuItem>

        <MenuItem
          className={clsx(isMembershipPage ? 'isActive' : '')}
          onClick={handlePressMembership}
        >
          <ListItemIcon
            className="bullet"
            id="membershipBullet"
          >
            •
          </ListItemIcon>

          <ListItemText>
            Membership
          </ListItemText>
        </MenuItem>

        <MenuItem
          className={clsx(isSponsorsPage ? 'isActive' : '')}
          onClick={handlePressSponsors}
        >
          <ListItemIcon
            className="bullet"
            id="sponsorsBullet"
          >
            •
          </ListItemIcon>

          <ListItemText>
            Sponsors
          </ListItemText>
        </MenuItem>

        <MenuItem onClick={handlePressSignInOut}>
          <ListItemIcon>
            {isSignedIn
              ? <LogoutIcon fontSize="small" />
              : <LoginIcon fontSize="small" />}
          </ListItemIcon>

          <ListItemText>
            Members {isSignedIn ? 'sign out' : 'login'}
          </ListItemText>

        </MenuItem>
      </StyledMenu>
    </>
  );
};

export default MobileNavMenu;
