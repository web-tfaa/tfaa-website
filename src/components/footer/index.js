// External Dependencies
import React from 'react'
import Link from "gatsby-link";
import hex2rgba from 'hex2rgba';

// Internal Dependencies
import { rhythm, scale, options } from "../../utils/typography"

// Component Definition
export default () =>
  <footer
    css={{
      alignItems: 'center',
      background: `${hex2rgba('#fbfafc', 0.8)}`,
      borderTop: '4px solid #2D456F',
      bottom: 0,
      boxShadow: '-2px 0 5px #444',
      boxSizing: 'border-box',
      color: `inherit`,
      display: 'flex',
      fontFamily: options.headerFontFamily.join(`,`),
      height: 64,
      justifyContent: 'space-between',
      left: 0,
      margin: '0 auto',
      maxWidth: 960,
      padding: '1em 2em',
      position: 'absolute',
      right: 0,
    }}
  >
    <div>&copy; 2016-2018 | Texas Music Administrators Conference</div>
    <div>Built by
      <a
        css={{
          marginLeft: '0.25em',
          textShadow: 'none',
        }}
        href="http://www.drumsensei.com"
      >
        Drumsensei Media
      </a>
    </div>
  </footer>
