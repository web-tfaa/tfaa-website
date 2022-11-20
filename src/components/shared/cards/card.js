// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@mui/styles';

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
};

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${colors.ui.light}`,
    boxSizing: 'border-box',
    display: 'flex',
    paddingBottom: theme.spacing(1),
    transform: 'translateZ(0)',
    width: '100%',
    [presets.Tablet]: {
      boxShadow: `0 1px 0 0 ${colors.ui.light}`,
      '&:nth-child(5),&:nth-child(6)': {
        boxShadow: 'none',
      },
      '&:nth-child(2n)': {
        borderLeft: `1px solid ${colors.ui.light}`,
      },
    },
    [presets.Hd]: {
      flex: '1 0 100%',
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
    width: '100%',
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
}));

// Component Definition
const Card = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.innerContainer}>
        {children}
      </div>
    </div>
  );
};

Card.propTypes = propTypes;

export default Card;
