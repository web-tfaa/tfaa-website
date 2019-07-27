// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';

// Icons
import {
  CardGiftCard,
  FolderOpen,
  InfoOutline,
  PersonOutline,
} from 'react-icons/md';

// Internal Dependencies
import presets, { colors } from '../../utils/presets';
import { rhythm, scale, options } from '../../utils/typography';

// Local Variables
const texasFlagBlue = '#002868';

// Component Definition
const MobileNavItem = ({ linkTo, label, icon: Icon }) => (
  <Link
    to={linkTo}
    css={{
      color: colors.gray.dark,
      fontSize: scale(-1 / 2).fontSize,
      letterSpacing: '0.0075rem',
      lineHeight: 1,
      padding: `${rhythm(options.blockMarginBottom / 4)} ${rhythm(
        options.blockMarginBottom,
      )} ${rhythm(options.blockMarginBottom / 2)} `,
      textDecoration: 'none',
      textAlign: 'center',
    }}
  >
    <div
      css={{
        display: 'block',
        margin: '0 auto',
      }}
    >
      <Icon fill={texasFlagBlue} height="32px" width="32px" />
    </div>
    <div
      css={{
        marginTop: 8,
      }}
    >
      {label}
    </div>
  </Link>
);
MobileNavItem.propTypes = {
  linkTo: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
};

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
    <MobileNavItem linkTo="/about/" label="About" icon={InfoOutline} />
    <MobileNavItem linkTo="/resources/" label="Resources" icon={FolderOpen} />
    <MobileNavItem linkTo="/members/" label="Members" icon={PersonOutline} />
    <MobileNavItem linkTo="/sponsors/" label="Sponsors" icon={CardGiftCard} />
  </div>
);

export default MobileNav;
