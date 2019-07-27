// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';

// Internal Dependencies
import { colors } from '../../utils/presets';
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
      <Icon htmlColor={texasFlagBlue} height="0.5em" width="0.5em" />
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
  icon: PropTypes.shape({}).isRequired,
};

export default MobileNavItem;
