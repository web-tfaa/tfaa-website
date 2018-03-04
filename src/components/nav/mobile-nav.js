// External Dependencies
import React from 'react';
import Link from 'gatsby-link';

// Internal Dependencies
import presets, { colors } from '../../utils/presets';
import typography, { rhythm, scale, options } from '../../utils/typography';

// Icons
import faceIcon from 'react-icons/lib/md/face';
import locationCityIcon from 'react-icons/lib/md/location-city';
import queueMusicIcon from 'react-icons/lib/md/queue-music';
import schoolIcon from 'react-icons/lib/md/school';

// Component Definition
const MobileNavItem = ({ linkTo, label, icon: Icon }) => (
  <Link
    to={linkTo}
    css={{
      color: colors.gatsby,
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
        // height: 32,
        display: `block`,
        margin: `0 auto`,
      }}
    >
      <Icon
        fill="black"
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
      position: `fixed`,
      display: `flex`,
      justifyContent: `space-around`,
      alignItems: `center`,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      borderTop: `1px solid ${colors.ui.light}`,
      background: colors.ui.whisper,
      fontFamily: typography.options.headerFontFamily.join(`,`),
      [presets.Tablet]: {
        display: `none`,
      },
    }}
  >
    <MobileNavItem
      linkTo="/about/"
      label="About"
      icon={faceIcon}
    />
    <MobileNavItem
      linkTo="/resources/"
      label="Resources"
      icon={locationCityIcon}
    />
    <MobileNavItem
      linkTo="/members/"
      label="Members"
      icon={queueMusicIcon}
    />
    <MobileNavItem
      linkTo="/sponsors/"
      label="Sponsors"
      icon={schoolIcon}
    />
  </div>
);
