// External Dependencies
import { Typography } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

// Local Typings
interface Props {
  color: string;
  subtitle: string;
  title: string;
}
interface StyledRootProps {
  $color: string;
}

// Local Variables
const StyledRoot = styled.section<StyledRootProps>(({ $color, theme }) => ({
  h3: {
    color: theme.palette.common.white,
    fontSize: 30,
    fontWeight: 700,
  },

  alighnItems: 'center',
  backgroundColor: $color,
  color: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
  height: 180,
  justifyContent: 'center',
  padding: theme.spacing(0, 2),
  textAlign: 'center',
  width: 'calc(100vw / 5)',
}));

// Component Definition
const TakeActionItem: FC<Props> = ({
  color,
  subtitle,
  title,
}) => {
  return (
    <StyledRoot $color={color}>
      <Typography variant="h3">
        {title}
      </Typography>

      <Typography variant="body2">
        {subtitle}
      </Typography>
    </StyledRoot>
  );
};

export default TakeActionItem;
