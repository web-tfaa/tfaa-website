// External Dependencies
import hex2rgba from 'hex2rgba';
import React from 'react';
import { css } from 'glamor';
import { Link } from 'gatsby';

// Internal Dependencies
import { rhythm, scale, options } from '../../utils/typography';
import presets from '../../utils/presets';

// Local Variables
const texasFlagBlue = '#002868';
const texasFlagRed = '#BF0A30';

let stripeAnimation = css.keyframes({
  "0%": { backgroundPosition: `0 0` },
  "100%": { backgroundPosition: `30px 60px` },
})

// Component Definition
const CtaButton = ({ to, overrideCSS, children }) => (
  <Link
    css={{
      ...overrideCSS,
      ...scale(1 / 5),
      display: `inline-block`,
      border: `1px solid ${texasFlagRed}`,
      fontFamily: options.headerFontFamily.join(`,`),
      padding: `${rhythm(2 / 5)} ${rhythm(1 / 2)}`,
      borderRadius: presets.radius,
      [presets.Tablet]: {
        ...scale(2 / 5),
        padding: `${rhythm(1 / 4)} ${rhythm(3 / 5)}`,
      },
      [presets.VHd]: {
        padding: `${rhythm(1 / 2)} ${rhythm(1)}`,
      },
      // Increase specificity
      "&&": {
        border: `1px solid ${texasFlagRed}`,
        boxShadow: `none`,
        color: texasFlagRed,
        fontWeight: `normal`,
        backgroundColor: `transparent`,
        backgroundSize: `30px 30px`,
        textDecoration: 'none',
        transition: `all ${presets.animation.speedDefault} ${
          presets.animation.curveDefault
        }`,
        ":hover, &:focus": {
          backgroundSize: `30px 30px`,
          backgroundColor: texasFlagRed,
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0, 0.1) 25%, transparent 25%, transparent 50%, rgba(0,0,0, 0.1) 50%, rgba(0,0,0, 0.1) 75%, transparent 75%, transparent)`,
          color: `#fff`,
          animation: `${stripeAnimation} 2.8s linear infinite`,
        },
        ":focus": {
          outline: 0,
          boxShadow: `0 0 0 0.2rem ${hex2rgba(texasFlagBlue, 0.25)}`,
        },
        ":after": {
          content: ``,
          display: `block`,
        },
      },
    }}
    to={to}
  >
    {children}
  </Link>
)

export default CtaButton
