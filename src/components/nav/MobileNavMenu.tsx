// External Dependencies
import { PopoverOrigin } from '@mui/material/Popover';
import { navigate } from 'gatsby';
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

  '#aboutBullet': {
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
  horizontal: 'left',
  vertical: 'bottom',
};
const transformOrigin: PopoverOrigin = {
  horizontal: 'left',
  vertical: 'top',
};

// Component Definition
const MobileNavMenu: FC<Props> = ({
  isSignedIn,
  onSignOut,
}) => {
  const theme = useTheme();

  // Menu logic
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={handleClose}>
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

        <MenuItem onClick={handleClose}>
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

        <MenuItem onClick={handleClose}>
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

        <MenuItem onClick={handleClose}>
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
