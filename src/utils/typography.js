// External Dependencies
import Typography from 'typography';

// Internal Dependencies
import {
  MIN_DEFAULT_MEDIA_QUERY,
  MIN_LARGER_DISPLAY_MEDIA_QUERY,
  MOBILE_MEDIA_QUERY,
  TABLET_MEDIA_QUERY,
} from 'typography-breakpoint-constants';
import presets, { colors } from './presets';

const texasFlagBlue = '#002868';

const _options = {
  headerFontFamily: [
    'Futura PT',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
  bodyFontFamily: ['Spectral', 'Georgia', 'Times New Roman', 'Times', 'serif'],
  monospaceFontFamily: [
    'Space Mono',
    'SFMono-Regular',
    'Menlo',
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace',
  ],
  muiFontFamily: [
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
  baseFontSize: '18px',
  baseLineHeight: 1.4,
  headerLineHeight: 1.075,
  headerColor: colors.gray.dark,
  bodyColor: colors.gray.copy,
  blockMarginBottom: 0.75,
  scaleRatio: 2,
  overrideStyles: ({ rhythm, scale }, options) => {
    return {
      'h1,h2,h4,h5,h6': {
        marginTop: rhythm(options.blockMarginBottom * 2),
        marginBottom: rhythm(options.blockMarginBottom),
        letterSpacing: '-0.0075em',
      },
      'ul, ol': {
        marginTop: rhythm(options.blockMarginBottom),
      },
      h1: {
        ...scale(4 / 5),
      },
      h3: {
        ...scale(2 / 5),
        lineHeight: 1,
        marginTop: rhythm(options.blockMarginBottom),
        marginBottom: rhythm(options.blockMarginBottom / 2),
      },
      h4: {
        ...scale(1 / 5),
      },
      h5: {
        ...scale(0),
      },
      blockquote: {
        paddingLeft: rhythm(options.blockMarginBottom),
        marginLeft: 0,
        borderLeft: `${rhythm(options.blockMarginBottom / 4)} solid ${colors.ui.light}`,
      },
      hr: {
        backgroundColor: colors.ui.lilac,
      },
      // Target image captions. This is kind of a fragile selector...
      '.gatsby-resp-image-link + em': {
        ...scale(-1 / 5),
        lineHeight: 1.3,
        paddingTop: rhythm(3 / 8),
        marginBottom: rhythm(options.blockMarginBottom * 2),
        display: 'block',
        textAlign: 'center',
        fontStyle: 'normal',
        color: colors.gray.calm,
        position: 'relative',
      },
      '.gatsby-resp-image-link + em a': {
        fontWeight: 'normal',
        fontFamily: options.headerFontFamily.join(','),
        color: texasFlagBlue,
      },
      '.main-body a': {
        color: 'inherit',
        textDecoration: 'none',
        transition: `all ${presets.animation.speedFast} ${presets.animation.curveDefault}`,
        borderBottom: `1px solid ${colors.ui.bright}`,
        boxShadow: `inset 0 -2px 0px 0px ${colors.ui.bright}`,
        fontFamily: options.headerFontFamily.join(','),
        fontWeight: 'bold',
      },
      '.main-body .hotel-link': {
        fontFamily: options.headerFontFamily.join(','),
      },
      '.post-body a': {
        fontSize: '102%',
        color: texasFlagBlue,
      },
      '.main-body a:hover': {
        background: colors.ui.bright,
      },
      '.main-body .hotel-link:hover': {
        background: 'rgba(128, 222, 234, 0.5)',
      },
      '.main-body a.anchor': {
        color: 'inherit',
        fill: texasFlagBlue,
        textDecoration: 'none',
        borderBottom: 'none',
        boxShadow: 'none',
      },
      '.main-body a.anchor:hover': {
        background: 'none',
      },
      '.main-body a.gatsby-resp-image-link': {
        boxShadow: 'none',
        borderBottom: 'transparent',
        marginTop: rhythm(options.blockMarginBottom * 2),
        marginBottom: rhythm(options.blockMarginBottom * 2),
      },
      '.main-body a.gatsby-resp-image-link:hover': {
        background: 'none',
        boxShadow: 'none',
      },
      '.main-body label:not(.MuiFormLabel-root)': {
        fontFamily: options.headerFontFamily.join(','),
        fontWeight: 600,
        marginBottom: '0.25rem',
      },
      '.main-body input:not(.MuiInputBase-input)': {
        letterSpacing: '0.5px',
        padding: '8px 12px',
      },
      '.main-body input[type=text] input[type=password]': {
        border: `1.5px solid ${colors.ui.bright}`,
        borderRadius: 2,
        fontFamily: options.headerFontFamily.join(','),
        padding: '0.5rem',
      },
      '.main-body input:focus :not(.MuiInputBase-input)': {
        border: `2px solid ${texasFlagBlue}`,
      },
      '::-webkit-input-placeholder': {
        color: colors.gray.calm,
        opacity: 0.55,
      },
      '::-moz-placeholder': {
        color: colors.gray.calm,
        opacity: 0.55,
      },
      ':-ms-input-placeholder': {
        color: colors.gray.calm,
        opacity: 0.55,
      },
      '.gatsby-highlight, .post .gatsby-resp-iframe-wrapper, .post .gatsby-resp-image-link': {
        marginLeft: rhythm(-options.blockMarginBottom),
        marginRight: rhythm(-options.blockMarginBottom),
      },
      '.gatsby-resp-image-link': {
        borderRadius: `${presets.radius}px`,
        overflow: 'hidden',
      },
      '@media (max-width:634px)': {
        '.gatsby-highlight, .gatsby-resp-image-link': {
          borderRadius: 0,
          borderLeft: 0,
          borderRight: 0,
        },
      },
      [`${presets.Tablet} and (max-width:980px)`]: {
        '.has-sidebar .gatsby-highlight': {
          marginLeft: 0,
          marginRight: 0,
        },
      },
      [MOBILE_MEDIA_QUERY]: {
        // Make baseFontSize on mobile 16px.
        html: {
          fontSize: `${(16 / 16) * 100}%`,
        },
      },
      [TABLET_MEDIA_QUERY]: {
        html: {
          fontSize: `${(17 / 16) * 100}%`,
        },
      },
      [MIN_DEFAULT_MEDIA_QUERY]: {
        '.gatsby-highlight, .post .gatsby-resp-iframe-wrapper, .post .gatsby-resp-image-link': {
          marginLeft: rhythm(-options.blockMarginBottom * 1.5),
          marginRight: rhythm(-options.blockMarginBottom * 1.5),
        },
        '.gatsby-highlight': {
          padding: rhythm(options.blockMarginBottom * 1.5),
          marginBottom: rhythm(options.blockMarginBottom * 1.5),
        },
        '.gatsby-highlight-code-line': {
          marginRight: `${rhythm(-options.blockMarginBottom * 1.5)}`,
          marginLeft: `${rhythm(-options.blockMarginBottom * 1.5)}`,
          paddingRight: rhythm(options.blockMarginBottom * 1.5),
          paddingLeft: `${rhythm(((options.blockMarginBottom * 1.5) / 5) * 4)}`,
          borderLeftWidth: `${rhythm(((options.blockMarginBottom * 1.5) / 5) * 1)}`,
        },
      },
      [MIN_LARGER_DISPLAY_MEDIA_QUERY]: {
        html: {
          fontSize: `${(21 / 16) * 100}%`,
        },
      },
    };
  },
};

const typography = new Typography(_options);
const {
  options,
  rhythm,
  scale,
} = typography;

export {
  options,
  rhythm,
  scale,
  typography as default,
};
