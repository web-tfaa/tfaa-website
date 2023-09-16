// External Dependencies
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
import DrumBanner from '../../shared/DrumBanner';
import SponsorListTable from './sponsor-table';
import RestrictedAccess from '../../shared/RestrictedAccess';

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
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
    return <RestrictedAccess />;
  }

  return (
    <>
      <DrumBanner drumBannerTitle="Sponsors Table" />

      <StyledRoot>
        <Typography
          className="sponsorsTableTitle"
          component="h2"
        >
          Sponsors Table
        </Typography>

        <SponsorListTable data={sponsorData} />
      </StyledRoot>
    </>
  );
};

export default SponsorsTableContent;
