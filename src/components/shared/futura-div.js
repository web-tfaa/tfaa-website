// Internal Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// Internal Dependencies
import { options } from '../../utils/typography';

// Local Variables
const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.shape({}),
    PropTypes.string,
  ]).isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = {
  root: {
    fontFamily: options.headerFontFamily.join(','),
    lineHeight: '1.6',
    marginBottom: '1rem',
  },
};

// Component Definition
const FuturaDiv = ({
  children,
  classes,
}) => (
  <div className={classes.root}>
    {children}
  </div>
);

FuturaDiv.propTypes = propTypes;

export default withStyles(styles)(FuturaDiv);
