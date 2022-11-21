// External Dependencies
import {
  Alert,
  AlertProps,
  AlertTitle,
  Collapse,
} from '@mui/material';
import { FC } from 'react';
import styled from 'styled-components';

// Local Typings
interface Props extends AlertProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
}

// Local Variables
const StyledAlert = styled(Alert)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey['300']}`
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
  const alertElement = (
    <StyledAlert
      onClose={onClose}
      severity={severity}
      {...other}
    >
      {Boolean(title) && <AlertTitle>{title}</AlertTitle>}
      {children}
    </StyledAlert>
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
