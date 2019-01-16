// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

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
    display: 'flex',
    flex: '0 1 auto',
    flexWrap: 'wrap',
    background: '#fff',
    boxShadow: '0 5px 20px rgba(25, 17, 34, 0.1)',
    transform: 'translateZ(0)',
  },
};

// Component Definition
const Cards = ({
  children,
  classes,
}) => (
  <div className={classes.root}>
    {children}
  </div>
);

Cards.propTypes = propTypes;

export default withStyles(styles)(Cards);
