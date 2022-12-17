// External Dependencies
import { Typography } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

// Local Typings
interface Props {
  label: string;
  value: string;
}

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.statisticsLabel': {
    fontSize: 20,
    fontWeight: theme.typography.fontWeightBold,
    margin: theme.spacing(0, 4),
  },

  '.statisticsValue': {
    [theme.breakpoints.down('lg')]: {
      fontSize: 54,
    },
    color: theme.palette.tfaa.about,
    fontSize: 60,
    margin: 0,
  },
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'space-between',
  columnGap: theme.spacing(4),
  minHeight: 160,
  textAlign: 'center',
  width: 256,
}));

// Component Definition
const HomeStatisticsItem: FC<Props> = ({ label, value }) => {
  return (
    <StyledRoot>
      <Typography className="statisticsValue">
        {value}
      </Typography>

      <Typography className="statisticsLabel">
        {label}
      </Typography>
    </StyledRoot>
  );
};

export default HomeStatisticsItem;
