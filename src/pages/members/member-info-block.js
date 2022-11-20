// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@mui/styles';

// Local Variables
const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
}));

// Component Definition
const MemberInfoBlock = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {children}
    </div>
  );
};

MemberInfoBlock.propTypes = propTypes;

export default MemberInfoBlock;
