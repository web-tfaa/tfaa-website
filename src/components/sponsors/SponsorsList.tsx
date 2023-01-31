// External Dependencies
// import { Link } from 'gatsby-theme-material-ui';
import React, { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';
import { useSponsorData } from '../../utils/hooks/useSponsorData';
import Motifs from '../shared/Motifs';
import SponsorCard from './SponsorCard';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '& > div': {
    width: '100%',
  },

  '.MuiCircularProgress-root': {
    color: theme.palette.tfaa.resources,
  },

  '.resourcessTitle': {
    fontSize: 34,
    fontWeight: 900,
    marginBottom: theme.spacing(4),
  },

  hr: {
    backgroundColor: theme.palette.tfaa.resources,
    borderRadius: 2,
    height: 3,
    marginBottom: theme.spacing(4),
    maxWidth: '70%',
  },

  [theme.breakpoints.down('mobile')]: {
    padding: theme.spacing(18, 6),
  },

  display: 'flex',
  overflow: 'hidden',
  padding: theme.spacing(10),
  position: 'relative',
  width: '100%',
}));

// Flip this to test with fake Sponsor data in local development
const useTestData = true;

// Component Definition
const SponsorsList: FC = () => {
  const {
    isLoading,
    sponsorData,
  } = useSponsorData({ useTestData });

  console.log('sponsorData', sponsorData);

  const classChampionSponsors = sponsorData?.filter((sponsor) => sponsor.SponsorLevel === 'Class Champion');
  const goldMedalSponsors = sponsorData?.filter((sponsor) => sponsor.SponsorLevel === 'Gold Medal');
  const silverMedalSponsors = sponsorData?.filter((sponsor) => sponsor.SponsorLevel === 'Silver Medal');

  return (
    <StyledRoot>
      <Motifs small />

      <div>
        <Typography
          className="resourcessTitle"
          component="h2"
          variant="h4"
        >
          {appNameShort} Sponsors
        </Typography>

        <Divider />

        <Collapse in={isLoading}>
          <CircularProgress />
        </Collapse>

        <Collapse in={!isLoading}>
          <div className="eventsList">
            <SponsorCard
              sponsorData={classChampionSponsors}
              sponsorLevel="Class Champion"
            />
            <SponsorCard
              sponsorData={goldMedalSponsors}
              sponsorLevel="Gold Medal"
            />
            <SponsorCard
              sponsorData={silverMedalSponsors}
              sponsorLevel="Silver Medal"
            />
          </div>
        </Collapse>
      </div>
    </StyledRoot>
  );
};

export default SponsorsList;
