// External Dependencies
import { CardProps } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import styled from 'styled-components';

// Local Variables
const StyledCard = styled(Card)(({ theme }) => ({
  '.MuiCardContent-root': {
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },
}));

// Component Definition
const EnhancedCard: React.FC<CardProps> = ({
  children,
  ...otherProps
}) => {
  return (
    <StyledCard
      variant="outlined"
      {...otherProps}
    >
      <CardContent>
        {children}
      </CardContent>
    </StyledCard>
  );
};

export default EnhancedCard;
