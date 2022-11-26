// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import presets from '../../utils/presets';
import { options } from '../../utils/typography';
import { currentYearLong } from '../../utils/helpers';

// Local Variables
const StyledRoot = styled.footer({
  '.footer-left': {
    maxWidth: '60%',

    '& a': {
      marginLeft: 5,

      '&:visited': {
        color: 'black',
      },
    },
  },

  '.footer-right': {
    textAlign: 'right',

    '& a': {
      marginLeft: 5,

      '&:visited': {
        color: 'black',
      },
    },
  },

  [presets.Tablet]: {
    fontSize: 16,
    padding: '2em',
    position: 'static',
  },
  alignItems: 'center',
  background: '#fbfafc',
  borderTop: '4px solid #2D456F',
  bottom: 68,
  boxShadow: '-2px 0 5px #444',
  boxSizing: 'border-box',
  display: 'flex',
  flex: 1,
  fontFamily: options.headerFontFamily.join('/'),
  fontSize: 12,
  justifyContent: 'space-between',
  padding: '1.25em',
  position: 'relative',
  zIndex: 10,
});

// Component Definition
const Footer: FC = () => (
  <StyledRoot className="footer">
    <div className="footer-left">
      &copy; {currentYearLong} |
      <a href="https://www.texasmusicadmin.com/">
        Texas Music Administrators Conference
      </a>
    </div>
    <div className="footer-right">
      <div>
        Built by
        <a
          href="https://www.mikemathew.com/"
          rel="noreferrer noopener"
          target="_blank"
        >
          Drumsensei Media
        </a>
      </div>
    </div>
  </StyledRoot>
);

export default Footer;
