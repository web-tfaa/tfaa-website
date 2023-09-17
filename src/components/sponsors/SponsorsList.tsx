// External Dependencies
import Box from '@mui/material/Box';
import React, { useMemo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';
import { useGetSponsorData } from '../../utils/hooks/useGetSponsorData';
import Motifs from '../shared/Motifs';
import SponsorGrid from './SponsorGrid';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '& > div': {
    width: '100%',
  },

  '.MuiCircularProgress-root': {
    color: theme.palette.tfaa.resources,
  },

  '.sponsorInfo > a': {
    fontSize: 19,
  },

  '.sponsorInfo > img': {
    maxWidth: 800,
    width: '100%',
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

const StyledOpenInNewIcon = styled(OpenInNewIcon)({
  '&&': {
    color: 'inherit',
    fontSize: '0.8em',
    marginLeft: '0.25em',
  }
}) as typeof OpenInNewIcon;


// Flip this to test with fake Sponsor data in local development
const useTestData = false;

// Component Definition
const SponsorsList: React.FC = () => {
  const {
    isLoading,
    sponsorData,
  } = useGetSponsorData({ useTestData });

  const hasSponsorData = sponsorData && sponsorData?.length > 0;

  const sponsorInfoElement = useMemo(() => (
    <div className="sponsorInfo">
      <img
        alt={`${appNameShort} sponsorship levels`}
        src="https://res.cloudinary.com/tmac/image/upload/v1692272429/Sponsor_Levels_combined.png"
      />

      <Box marginTop={3}>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScixBGNVLwsLURlTHn0Y35Ix11uYOM9s4gEG00SPH3BVhPrZA/viewform?usp=sharing"
          target="_blank"
        >
          Please select this link to complete the Sponsorship Registration Form and submit payments.
          <StyledOpenInNewIcon />
        </a>
      </Box>
    </div>
  ), []);

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

        {hasSponsorData && (
          <>
            <SponsorGrid sponsorData={sponsorData} />

            <Divider />
          </>
        )}

        <Collapse in={isLoading}>
          <CircularProgress />
        </Collapse>

        <Collapse in={!isLoading}>
          {sponsorInfoElement}
        </Collapse>
      </div>
    </StyledRoot>
  );
};

export default SponsorsList;
