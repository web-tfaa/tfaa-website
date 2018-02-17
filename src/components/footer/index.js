// External Dependencies
import React from 'react'
import Link from "gatsby-link";

// Internal Dependencies
import { rhythm, scale, options } from "../../utils/typography"

// Component Definition
export default () =>
  <footer
    css={{
      alignItems: 'center',
      background: '#fbfafc',
      borderTop: '4px solid #2D456F',
      boxShadow: '-2px 0 5px #444',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '2em',
    }}
  >
    <div>&copy; 2016-2018 | Texas Music Administrators Conference</div>
    <div>Built by
      <a
        css={{ marginLeft: 5 }}
        href="http://www.drumsensei.com"
      >
        Drumsensei Media
      </a>
    </div>
  </footer>
