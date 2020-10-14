// External Dependencies
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';
import React from 'react';

// Local Variables
const propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  severity: PropTypes.oneOf(['warning', 'info']),
  title: PropTypes.node,
};

const defaultProps = {
  isOpen: true,
  onClose: null,
  severity: 'info',
  title: null,
};

// Set up for future work to allow clicking a close icon to remove the alert

// Component Definition
const EnhancedAlert = ({
  children,
  isOpen = true,
  onClose,
  severity,
  title,
  ...other
}) => {
  const alertElement = (
    <Alert
      onClose={onClose}
      severity={severity}
      {...other}
    >
      {Boolean(title) && <AlertTitle>{title}</AlertTitle>}
      {children}
    </Alert>
  );

  return onClose ? (
    <Collapse in={isOpen}>
      {alertElement}
    </Collapse>
  ) : (
    alertElement
  );
};

EnhancedAlert.propTypes = propTypes;
EnhancedAlert.defaultProps = defaultProps;

export default EnhancedAlert;
