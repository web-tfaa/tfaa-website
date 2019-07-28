// External Dependencies
import CardGiftCardIcon from '@material-ui/icons/CardGiftCard';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
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
    <MobileNavItem linkTo="/sponsors/" label="Sponsors" icon={CardGiftCardIcon} />
  </div>
);

export default MobileNav;
