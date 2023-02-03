// External Dependencies
import { CardProps } from '@mui/material';
import Card from '@mui/material/Card';
import React from 'react';

// Internal Dependencies
import EnhancedCardContent from './EnhancedCardContent';

// Component Definition
const EnhancedCard: React.FC<CardProps> = ({
  children,
  ...otherProps
}) => {
  return (
    <Card
      variant="outlined"
      {...otherProps}
    >
      <EnhancedCardContent>
        {children}
      </EnhancedCardContent>
    </Card>
  );
};

export default EnhancedCard;
