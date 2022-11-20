// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import { makeStyles } from '@mui/styles';

// Local Variables
const propTypes = {
  onClick: PropTypes.func.isRequired,
};

const useStyles = makeStyles({
  icon: {
    height: 20,
    width: 20,
  },
});

// Component Definition
const RemoveRedEyeIcon = (props) => {
  const { onClick } = props;
  const classes = useStyles(props);
  return (
    <RemoveRedEye
      className={classes.icon}
      onClick={onClick}
    />
  );
};

RemoveRedEyeIcon.propTypes = propTypes;

export default RemoveRedEyeIcon;
