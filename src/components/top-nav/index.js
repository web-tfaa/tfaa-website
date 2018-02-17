// External Dependencies
import React from 'react'
import Link from "gatsby-link";
import hex2rgba from 'hex2rgba';

// Internal Dependencies
import typography, { rhythm, scale } from "../../utils/typography"
import presets, { colors } from "../../utils/presets"
import { vP, vPHd, vPVHd, vPVVHd } from "../../utils/gutters"

// Local Variables
// const texasFlagBlue = '#002868';

const navItemStyles = {
  ...scale(-1 / 3),
  boxSizing: `border-box`,
  display: `inline-block`,
  color: `inherit`,
  textDecoration: `none`,
  textTransform: `uppercase`,
  letterSpacing: `0.03em`,
  lineHeight: `calc(${presets.headerHeight} - 6px)`,
  padding: `6px ${rhythm(1 / 2)} 0`,
  position: `relative`,
  top: 0,
  transition: `color .15s ease-out`,
  "&:hover": {
    opacity: 0.8,
    textDecoration: 'underline',
  },
}

const NavItem = ({ linkTo, children, styles }) => (
  <li
    css={{
      display: `inline-block`,
      margin: 0,
      ...styles,
    }}
  >
    <Link to={linkTo} css={navItemStyles}>
      {children}
    </Link>
  </li>
);

// Component Definition
export default ({ pathname }) => {
  const isHomepage = pathname == '/';
  const isBlog = pathname == '/blog';

  const gutters = isHomepage
  ? {
      paddingLeft: vP,
      paddingRight: vP,
      paddingTop: rhythm(1.5),
      [presets.Hd]: {
        paddingLeft: vPHd,
        paddingRight: vPHd,
      },
      [presets.VHd]: {
        paddingLeft: vPVHd,
        paddingRight: vPVHd,
      },
      [presets.VVHd]: {
        paddingLeft: vPVVHd,
        paddingRight: vPVVHd,
      },
    }
  : {}

  let styles = {};
  if (isHomepage) {
    // styles.backgroundColor = `rgba(255,255,255,0)`
    styles.borderBottomColor = `transparent`
    styles[presets.Tablet] = {
      position: isHomepage || isBlog ? `absolute` : `fixed`,
    }
  } else if (isBlog) {
    styles.backgroundColor = `#fff`
    styles[presets.Tablet] = {
      borderBottomColor: `transparent`,
      position: isHomepage || isBlog ? `absolute` : `fixed`,
      backgroundColor: colors.ui.whisper,
    }
  }

  return (
    <div
      role="navigation"
      css={{
        background: `${hex2rgba('#fbfafc', 0.8)}`,
        position: isHomepage ? `absolute` : false,
        height: presets.headerHeight,
        zIndex: `2`,
        left: 0,
        right: 0,
        [presets.Tablet]: {
          position: 'fixed',
        },
        ...styles,
      }}
    >
      <div
        css={{
          //maxWidth: rhythm(presets.maxWidth),
          boxSizing: 'border-box',
          borderBottom: '4px solid #2D456F',
          boxShadow: '3px 0 5px #2D456F',
          margin: `0 auto`,
          paddingLeft: rhythm(3 / 4),
          paddingRight: rhythm(3 / 4),
          ...gutters,
          fontFamily: typography.options.headerFontFamily.join(`,`),
          display: `flex`,
          alignItems: `flex-end`,
          width: `100%`,
          height: `100%`,
        }}
      >
        <NavItem
          css={{
            "&:hover": {
              opacity: 1,
              textDecoration: 'none',
            },
          }}
          linkTo={`/`}
        >
          <div
            css={{
              alignItems: `center`,
              color: `inherit`,
              display: `flex`,
              textDecoration: `none`,
              marginRight: rhythm(1/2),
            }}
          >
            <img
              style={{ marginBottom: 0 }}
              height="30px"
              src="http://res.cloudinary.com/drumsensei/image/upload/v1518414495/tmac-logo_upybjp.jpg"
            />
            <div css={{
              marginLeft: '0.8em',
              fontSize: 24,
              textDecoration: 'none',
            }}>
              TMAC
            </div>
          </div>
        </NavItem>
        <ul
          css={{
            display: `none`,
            [presets.Tablet]: {
              display: `flex`,
              margin: 0,
              padding: 0,
              listStyle: `none`,
              flexGrow: 1,
              overflowX: `auto`,
              maskImage: `linear-gradient(to right, transparent, white ${rhythm(1/8)}, white 98%, transparent)`,
            },
          }}
        >
          <NavItem linkTo="/about/">About</NavItem>
          <NavItem linkTo="/resources/">Resources</NavItem>
          <NavItem linkTo="/members/">Members</NavItem>
          <NavItem linkTo="/sponsors/">Sponsors</NavItem>
        </ul>
      </div>
  </div>
  );
}
