// External Dependencies
import Container from '@mui/material/Container';
import React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import {
  TMAC_WEB_EXECUTIVE_SECRETARY,
  TMAC_WEB_ADMIN_EMAIL_LIST,
} from '../../../utils/member-constants';
import { useGetAuthUser } from '../../../utils/hooks/useGetAuthUser';
import DrumBanner from '../../shared/DrumBanner';
import NewSponsorFormUI from './NewSponsorFormUI';
import RestrictedAccess from '../../shared/RestrictedAccess';

// Local Variables
const StyledRoot = styled(Container)(({ theme }) => ({
  '.addSponsorTitle': {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: theme.spacing(4),
  },

  padding: theme.spacing(8, 10),
  width: '0 auto',
}));

// Component Definition
const SponsorsNewContent: React.FC = () => {
  const { currentAuthUser } = useGetAuthUser();

  const isAuthenticated = Boolean(currentAuthUser);

  if (!isAuthenticated) {
    return null;
  }

  const shouldSeeAddSponsorUI = currentAuthUser?.email
    && (TMAC_WEB_ADMIN_EMAIL_LIST.includes(currentAuthUser?.email)
    || currentAuthUser?.email === TMAC_WEB_EXECUTIVE_SECRETARY);

  if (!shouldSeeAddSponsorUI) {
    return <RestrictedAccess />;
  }

  return (
    <>
      <DrumBanner drumBannerTitle="Add Sponsor" />

      <StyledRoot maxWidth="md">
        <Typography
          className="addSponsorTitle"
          component="h2"
        >
          Add Sponsor
        </Typography>

        <NewSponsorFormUI />
      </StyledRoot>
    </>
  );
};

export default SponsorsNewContent;
