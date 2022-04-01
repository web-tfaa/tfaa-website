// External Dependencies
import {
  Alert,
  AlertProps,
  AlertTitle,
} from '@material-ui/lab';
import { Collapse } from '@material-ui/core';
import { FC } from 'react';
import { makeStyles } from '@material-ui/styles';

// Local Typings
interface Props extends AlertProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
}

// Local Variables
const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.grey['300']}`
  },
}));

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
  const classes = useStyles();

  const alertElement = (
    <Alert
      className={classes.root}
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
