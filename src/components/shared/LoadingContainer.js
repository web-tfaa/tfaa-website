// External Dependencies
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

// Local Variables
const propTypes = {
  step: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  loadingText: {
    marginBottom: 32,
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    margin: 32,
  },
});

// Component Definition
const LoadingContainer = (props) => {
  const {
    step,
    title,
  } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <h2>{title}</h2>
      <p className={classes.loadingText}>
        Now loading step {step}...
      </p>
      <CircularProgress size={64} thickness={4} />
    </div>
  );
};

LoadingContainer.propTypes = propTypes;

export default LoadingContainer;
