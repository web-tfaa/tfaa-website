// External Dependencies
import CardGiftCard from '@material-ui/icons/CardGiftCard';
import FolderOpen from '@material-ui/icons/FolderOpen';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import PersonOutlined from '@material-ui/icons/PersonOutlined';
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
    <MobileNavItem linkTo="/about/" label="About" icon={InfoOutlined} />
    <MobileNavItem linkTo="/resources/" label="Resources" icon={FolderOpen} />
    <MobileNavItem linkTo="/members/" label="Members" icon={PersonOutlined} />
    <MobileNavItem linkTo="/sponsors/" label="Sponsors" icon={CardGiftCard} />
  </div>
);

export default MobileNav;
