// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import injectSheet from 'react-jss';

// Internal Dependencies
import presets, { colors } from '../../../utils/presets';
import { rhythm } from '../../../utils/typography';
import { vP, vPHd, vPVHd } from '../../../utils/gutters';

// Local Variables
const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = {
  root: {
    borderBottom: `1px solid ${colors.ui.light}`,
    boxSizing: 'border-box',
    display: 'flex',
    transform: 'translateZ(0)',
    paddingBottom: 16,
    [presets.Tablet]: {
      flex: '0 0 50%',
      maxWidth: '50%',
      boxShadow: `0 1px 0 0 ${colors.ui.light}`,
      '&:nth-child(5),&:nth-child(6)': {
        boxShadow: 'none',
      },
      '&:nth-child(2n)': {
        borderLeft: `1px solid ${colors.ui.light}`,
      },
    },
    [presets.Hd]: {
      flex: '0 0 100%',
      maxWidth: '100%',
      borderLeft: `1px solid ${colors.ui.light}`,
      '&:nth-child(4)': {
        boxShadow: 'none',
      },
      '&:nth-child(3n+1)': {
        borderLeft: 0,
      },
    },
  },
  innerContainer: {
    padding: rhythm(presets.gutters.default / 2),
    paddingBottom: 0,
    transform: 'translateZ(0)',
    [presets.Mobile]: {
      padding: vP,
      paddingBottom: 0,
    },
    [presets.Phablet]: {
      padding: vP,
    },
    [presets.VHd]: {
      padding: vPHd,
    },
    [presets.VVHd]: {
      padding: vPVHd,
    },
  },
};

// const cover = {
//   bottom: 0,
//   left: 0,
//   position: `absolute`,
//   right: 0,
//   top: 0,
// };

// Component Definition
const Card = ({
  children,
  classes,
}) => (
  <div className={classes.root}>
    <div className={classes.innerContainer}>
      {children}
    </div>
  </div>
);

Card.propTypes = propTypes;

export default injectSheet(styles)(Card);
