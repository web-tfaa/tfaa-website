// External Dependencies
import {
  Alert,
  AlertProps,
  AlertTitle,
} from '@material-ui/lab';
import { Collapse } from '@material-ui/core';
import React, { FC } from 'react';

// Local Typings
interface Props extends AlertProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
}

// Set up for future work to allow clicking a close icon to remove the alert

// Component Definition
const EnhancedAlert: FC<Props> = ({
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

export default EnhancedAlert;
