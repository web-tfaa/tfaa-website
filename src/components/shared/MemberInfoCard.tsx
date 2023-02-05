// External Dependencies
import { alpha, lighten } from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';;

// Local Typings
interface Props {
  cardTitle: string;
  children: React.ReactNode | React.ReactNode[];
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.memberInfoCardTitle': {
    fontSize: 32,
    fontWeight: 700,
  },

  backgroundColor: alpha(theme.palette.tfaa.resources, 0.1),
  border: `1px solid ${lighten(theme.palette.tfaa.resources, 0.7)}`,
  borderRadius: 19,
  padding: theme.spacing(3),
  width: '100%',
}));

// Component Definition
const MemberInfoCard: React.FC<Props> = ({
  cardTitle,
  children,
  ...otherProps
}) => {
  return (
    <StyledRoot {...otherProps}>
      <Typography
        className="memberInfoCardTitle"
        component="h2"
      >
        {cardTitle}
      </Typography>

      {children}
    </StyledRoot>
  );
};

export default MemberInfoCard;
