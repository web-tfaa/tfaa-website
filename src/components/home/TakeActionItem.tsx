// External Dependencies
import { Link } from 'gatsby-theme-material-ui';
import { Typography } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

// Local Typings
interface Props {
  color: string;
  subtitle: string;
  title: string;
  to: string;
}
interface StyledRootProps {
  $color: string;
}

// Local Variables
const StyledRoot = styled.section<StyledRootProps>(({ $color, theme }) => ({
  h3: {
    [theme.breakpoints.down('lg')]: {
      fontSize: 24,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 22,
    },
    [theme.breakpoints.down('mobile')]: {
      fontSize: 18,
    },

    color: theme.palette.common.white,
    fontSize: 30,
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },

  p: {
    [theme.breakpoints.down('lg')]: {
      fontSize: 16,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 15,
    },
    [theme.breakpoints.down('mobile')]: {
      fontSize: 14,
    },
    fontSize: 17,
  },

  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(4, 2, 4),
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3, 2, 3),
  },
  [theme.breakpoints.down('mobile')]: {
    width: 'calc(100vw / 3)',
  },

  alignItems: 'center',
  backgroundColor: $color,
  color: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  height: '100%',
  justifyContent: 'flex-start',
  padding: theme.spacing(5, 3, 5),
  textAlign: 'center',
  width: 'calc(100vw / 5)',
}));

// Component Definition
const TakeActionItem: FC<Props> = ({
  color,
  subtitle,
  title,
  to,
}) => {
  return (
    <Link to={to}>
      <StyledRoot $color={color}>
        <Typography variant="h3">
          {title}
        </Typography>

        <Typography variant="body2">
          {subtitle}
        </Typography>
      </StyledRoot>
    </Link>
  );
};

export default TakeActionItem;
