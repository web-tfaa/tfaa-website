// External Dependencies
import React from 'react';
import Link from 'gatsby-link';

// Internal Dependencies
import presets, { colors } from '../../utils/presets';
import typography, { rhythm, scale, options } from '../../utils/typography';

// Icons
import CardGiftCard from 'react-icons/lib/md/card-giftcard';
import FolderOpen from 'react-icons/lib/md/folder-open';
import InfoOutline from 'react-icons/lib/md/info-outline';
import PersonOutline from 'react-icons/lib/md/person-outline';

// Local Variables
const texasFlagBlue = '#002868';

// Component Definition
const MobileNavItem = ({ linkTo, label, icon: Icon }) => (
  <Link
    to={linkTo}
    css={{
      color: colors.gray.dark,
      fontSize: scale(-1 / 2).fontSize,
      letterSpacing: `0.0075rem`,
      lineHeight: 1,
      padding: `${rhythm(options.blockMarginBottom / 4)} ${rhythm(
        options.blockMarginBottom
      )} ${rhythm(options.blockMarginBottom / 2)} `,
      textDecoration: `none`,
      textAlign: `center`,
    }}
  >
    <div
      css={{
        display: `block`,
        margin: `0 auto`,
      }}
    >
      <Icon
        fill={texasFlagBlue}
        height="32px"
        width="32px"
      />
    </div>
    <div
      css={{
        marginTop: 8,
      }}
    >{label}</div>
  </Link>
);

export default () => (
  <div
    css={{
      alignItems: `center`,
      background: colors.ui.whisper,
      borderTop: `1px solid ${colors.ui.light}`,
      bottom: 0,
      display: `flex`,
      fontFamily: typography.options.headerFontFamily.join(`,`),
      justifyContent: `space-around`,
      left: 0,
      paddingBottom: `env(safe-area-inset-bottom)`,
      position: `fixed`,
      right: 0,
      zIndex: 11,
      [presets.Tablet]: {
        display: `none`,
      },
    }}
  >
    <MobileNavItem
      linkTo="/about/"
      label="About"
      icon={InfoOutline}
    />
    <MobileNavItem
      linkTo="/resources/"
      label="Resources"
      icon={FolderOpen}
    />
    <MobileNavItem
      linkTo="/members/"
      label="Members"
      icon={PersonOutline}
    />
    <MobileNavItem
      linkTo="/sponsors/"
      label="Sponsors"
      icon={CardGiftCard}
    />
  </div>
);
