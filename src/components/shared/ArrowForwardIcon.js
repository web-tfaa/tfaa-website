// External Dependencies
import ArrowForward from '@mui/icons-material/ArrowForward';
import React from 'react';
import { makeStyles } from '@mui/styles';

// Local Variables
const useStyles = makeStyles({
  icon: {
    transform: 'translateY(8px)',
    marginLeft: '0.5em',
  },
});

// Component Definition
const ArrowForwardIcon = (props) => {
  const classes = useStyles(props);
  return <ArrowForward className={classes.icon} />;
};

export default ArrowForwardIcon;
