// External Dependencies
import { Typography } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { STATISTICS_DATA } from './home-constants';
import HomeStatisticsItem from './HomeStatisticsItem';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  h5: {
    [theme.breakpoints.down('lg')]: {
      fontSize: 36,
      margin: theme.spacing(0, 6, 2),
    },
    [theme.breakpoints.down('mobile')]: {
      fontSize: 30,
      margin: 0,
      textAlign: 'left',
    },

    fontSize: 40,
    fontWeight: 900,
    margin: theme.spacing(0, 12, 2),
    textAlign: 'center',
  },

  '.statisticsItemsContainer': {
    [theme.breakpoints.down('lg')]: {
      flexWrap: 'wrap',
    },
    [theme.breakpoints.down('mobile')]: {
      padding: theme.spacing(0),
    },

    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(4, 0),
  },

  '.statisticsText': {
    [theme.breakpoints.down('lg')]: {
      fontSize: 26,
      margin: theme.spacing(0, 10, 2),
    },
    [theme.breakpoints.down('mobile')]: {
      display: 'none',
    },

    fontSize: 30,
    fontWeight: 700,
    margin: theme.spacing(2, 20),
    textAlign: 'center',
  },

  [theme.breakpoints.down('mobile')]: {
    flexWrap: 'wrap',
    padding: theme.spacing(4),
  },
  background: theme.palette.tfaa.backgroundMediumLight,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(8, 20, 5),
  width: '100%',
}));

// Component Definition
const HomeStatistics: FC = () => {
  return (
    <StyledRoot>
      <Typography variant="h5">
        We invest in leadership development because we believe every Texas
        child deserves to actively engage in creating and performing
        great works of art.
      </Typography>

      <div className="statisticsItemsContainer">
        {STATISTICS_DATA.map((item) => (
          <HomeStatisticsItem
            key={item.statValue}
            label={item.statLabel}
            value={item.statValue}
          />
        ))}
      </div>

      <Typography className="statisticsText">
        We are an organization that actively collaborates with administrators,
        teaching-artists, arts organizations, students, and the community.
        We are better when we stand together.
      </Typography>
    </StyledRoot>
  );
};

export default HomeStatistics;
