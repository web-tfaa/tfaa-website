// External Dependencies
import { alpha } from '@mui/material';
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

  },

  backgroundColor: alpha(theme.palette.tfaa.resources, 0.9),
  borderColor: alpha(theme.palette.tfaa.resources, 0.9),
  marginBottom: 0,
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
