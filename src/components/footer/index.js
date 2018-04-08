// External Dependencies
import React from 'react';
import Link from 'gatsby-link';
import format from 'date-fns/format';

// Internal Dependencies
import presets from '../../utils/presets';
import {
  rhythm,
  scale,
  options,
} from '../../utils/typography';

// Local Variables
const currentYear = format(new Date(), ['YYYY']);

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
      flex: 1,
      fontFamily: options.headerFontFamily.join(`,`),
      fontSize: 12,
      justifyContent: 'space-between',
      padding: '1.25em',
      zIndex: 10,
      [presets.Tablet]: {
        fontSize: 16,
        padding: '2em',
      },
    }}
  >
    <div
      css={{
        maxWidth: '60%',
      }}
    >
      &copy; 2016-{currentYear} | Texas Music Administrators Conference
    </div>
    <div
    >
      Built by
      <a
        css={{ marginLeft: 5 }}
        href="http://www.drumsensei.com"
      >
        Drumsensei Media
      </a>
    </div>
  </footer>
