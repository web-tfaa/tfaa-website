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
    },
    fontSize: 40,
    fontWeight: 500,
    margin: theme.spacing(0, 14, 2),
  },

  p: {
    [theme.breakpoints.down('lg')]: {
      fontSize: 26,
    },
    fontSize: 30,
    fontWeight: 700,
    margin: theme.spacing(0, 20, 2),
  },

  '.statisticsItemsContainer': {
    [theme.breakpoints.down('lg')]: {
      flexWrap: 'wrap',
    },
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(4, 0),
  },

  '.statisticsText': {
    textAlign: 'center',
  },

  [theme.breakpoints.down('mobile')]: {
    flexWrap: 'wrap',
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
      <Typography
        className="statisticsText"
        variant="h5"
      >
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
