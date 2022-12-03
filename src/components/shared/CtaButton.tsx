// External Dependencies
import { Button } from '@mui/material';
import { useTheme } from 'styled-components';
import React, { FC } from 'react';

// Local Typings
interface Props {
  children: React.ReactNode;
  color: CtaColor;
}
type CtaColor = 'cyan' | 'orange';

// Component Definition
const CtaButton: FC<Props> = ({ children, color }) => {
  const theme = useTheme();

  return (
    <Button
      sx={{
        backgroundColor: color === 'cyan'
          ? theme.palette.cta.cyan
          : theme.palette.cta.orange,
        borderRadius: 8,
        fontFamily: 'sans-serif',
        fontSize: 18,
        fontWeight: theme.typography.fontWeightBold,
        textTransform: 'none',

      }}
      variant="contained"
    >
      {children}
    </Button>
  );
};

export default CtaButton;
