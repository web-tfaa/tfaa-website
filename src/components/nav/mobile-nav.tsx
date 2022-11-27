// External Dependencies
import GradeIcon from '@mui/icons-material/Grade';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import MobileNavItem from './MobileNavItem';
import presets from '../../utils/presets';
import { options } from '../../utils/typography';

const StyledRoot = styled.div(({ theme }) => ({
  [presets.Tablet]: {
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
const MobileNav: FC = () => (
  <StyledRoot>
    <MobileNavItem
      linkTo="/about/"
      label="About"
      icon={InfoOutlinedIcon}
    />
    <MobileNavItem
      linkTo="/resources/"
      label="Resources"
      icon={FolderOpenIcon}
    />
    <MobileNavItem
      linkTo="/members/"
      label="Members"
      icon={PersonOutlinedIcon}
    />
    <MobileNavItem
      linkTo="/sponsors/"
      label="Sponsors"
      icon={GradeIcon}
    />
  </StyledRoot>
);

export default MobileNav;
