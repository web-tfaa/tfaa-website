// External Dependencies
import { CardContentProps } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import styled from 'styled-components';

// Local Variables
const StyledCardContent = styled(CardContent)(({ theme }) => ({
  '.MuiCardContent-root': {
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
}));

// Component Definition
const EnhancedCardContent: React.FC<CardContentProps> = ({
  children,
  ...otherProps
}) => {
  return (
    <StyledCardContent {...otherProps}>
      {children}
    </StyledCardContent>
  );
};

export default EnhancedCardContent;
