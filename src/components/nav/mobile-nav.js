// External Dependencies
// import CardGiftCardIcon from '@mui/icons-material/CardGiftCard';
import GradeIcon from '@mui/icons-material/Grade';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import React from 'react';

// Internal Dependencies
import MobileNavItem from './MobileNavItem';
import presets, { colors } from '../../utils/presets';
import { options } from '../../utils/typography';

// Component Definition
const MobileNav = () => (
  <div
    css={{
      alignItems: 'center',
      background: colors.ui.whisper,
      borderTop: `1px solid ${colors.ui.light}`,
      bottom: 0,
      display: 'flex',
      fontFamily: options.headerFontFamily.join(','),
      justifyContent: 'space-around',
      left: 0,
      paddingBottom: 'env(safe-area-inset-bottom)',
      position: 'fixed',
      right: 0,
      zIndex: 11,
      [presets.Tablet]: {
        display: 'none',
      },
    }}
  >
    <MobileNavItem linkTo="/about/" label="About" icon={InfoOutlinedIcon} />
    <MobileNavItem linkTo="/resources/" label="Resources" icon={FolderOpenIcon} />
    <MobileNavItem linkTo="/members/" label="Members" icon={PersonOutlinedIcon} />
    <MobileNavItem linkTo="/sponsors/" label="Sponsors" icon={GradeIcon} />
  </div>
);

export default MobileNav;
