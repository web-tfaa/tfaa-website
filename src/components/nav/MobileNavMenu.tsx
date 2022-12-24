// External Dependencies
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React, { FC } from 'react';
import styled, { useTheme } from 'styled-components';

// Local Variables
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  '&.menuIcon': {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1.5),
  }
}));

// Component Definition
const MobileNavMenu: FC = () => {
  const theme = useTheme();

  return (
    <>
      <StyledIconButton className="menuIcon">
        <MenuIcon
          fontSize="large"
          htmlColor={theme.palette.tfaa.about}
        />
      </StyledIconButton>
    </>
  );
};

export default MobileNavMenu;
