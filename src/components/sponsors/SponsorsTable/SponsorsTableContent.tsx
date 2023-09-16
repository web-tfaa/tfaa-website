// External Dependencies
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { useGetSponsorData } from '../../../utils/hooks/useGetSponsorData';
import {
  TMAC_WEB_EXECUTIVE_SECRETARY,
  TMAC_WEB_ADMIN_EMAIL_LIST,
} from '../../../utils/member-constants';
import { useGetAuthUser } from '../../../utils/hooks/useGetAuthUser';
import CtaButton from '../../shared/CtaButton';
import DrumBanner from '../../shared/DrumBanner';
import EnhancedAlert from '../../../components/shared/EnhancedAlert';
import SponsorListTable from './sponsor-table';

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.adminCard': {
    maxWidth: '75%',
  },
  '.sponsorsTableTitle': {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: theme.spacing(4),
  },

  padding: theme.spacing(8, 10),
  width: '0 auto',
}));

// Flip this to test with fake Sponsor data in local development
const useTestData = false;

// Component Definition
const SponsorsTableContent: React.FC = () => {
  const { currentAuthUser } = useGetAuthUser();

  const isAuthenticated = Boolean(currentAuthUser);

  const {
    isLoading,
    sponsorData,
  } = useGetSponsorData({ useTestData });


  if (isLoading && !isAuthenticated) {
    return <CircularProgress />;
  }

  if (!isAuthenticated) {
    return null;
  }

  const shouldSeeSponsorListLink = currentAuthUser?.email
    && (TMAC_WEB_ADMIN_EMAIL_LIST.includes(currentAuthUser?.email)
    || currentAuthUser?.email === TMAC_WEB_EXECUTIVE_SECRETARY);

  if (!shouldSeeSponsorListLink) {
    return (
      <>
        <DrumBanner drumBannerTitle="Not Allowed" />

        <Box margin={4}>
          <EnhancedAlert
            className="adminCard"
            severity="warning"
            title="Admin Users Only"
            >
            This data is only available for admin users.
          </EnhancedAlert>

          <Box marginTop={4}>
            <CtaButton
              colorVariant="resources"
              fontWeight={600}
              size="large"
              to="/"
              width={180}
              >
              View Home Page
            </CtaButton>
          </Box>
        </Box>
      </>
    );
  }

  return (
    <StyledRoot>
      <Typography
        className="sponsorsTableTitle"
        component="h2"
      >
        Sponsors Table
      </Typography>

      <SponsorListTable data={sponsorData} />
    </StyledRoot>
  );
};

export default SponsorsTableContent;
