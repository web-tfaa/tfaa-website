// External Dependencies
import { Box } from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';
// import { isTodayAfterJune30th } from '../../utils/helpers';
import Container from '../../components/shared/container';
// import EnhancedAlert from '../../components/shared/EnhancedAlert';
import Layout from '../../components/layout';
import SponsorsBanner from '../../components/sponsors/SponsorsBanner';
import CtaButton from '../../components/shared/CtaButton';

// Local Typings
interface Props {
  isAuthenticated: boolean;
  location: Location;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.notComplete': {
    marginTop: theme.spacing(4),
    textAlign: 'right',
  },

  '.sponsorInfoTitle': {
    fontSize: 34,
    fontWeight: 900,
    marginBottom: theme.spacing(4),
  },

  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  width: '100vw',
}));

// Component Definition
const SponsorInfo: React.FC<Props> = ({ location }) => (
  <Layout
    location={location}
    pageTitle="Sponsor Information"
  >
    <StyledRoot>
      <SponsorsBanner />

      <Container>
        <Box
          display="flex"
          flexDirection="column"
          padding={4}
        >
          <Typography
            className="sponsorInfoTitle"
            component="h2"
            variant="h4"
          >
            Sponsor {appNameShort}
          </Typography>

          {/* {!isTodayAfterJune30th
            ? (
              <Box mt={3}>
                <EnhancedAlert title="Sponsorship Notice">
                  TMAC Sponsorship will open up again on July 1st.
                </EnhancedAlert>
              </Box>
            ) : (
              <> */}
          <Typography>
            To become a {appNameShort} sponsor please complete these three steps:
          </Typography>

          <ol>
            <li>
              Sign up for a {appNameShort} website login or sign in if you already have a website login.
            </li>

            <li>
              Complete the Sponsorship Form.
            </li>

            <li>
              To pay, mail invoice with check to the {appNameShort} Treasurer.
            </li>
          </ol>
        </Box>

        {/* {isTodayAfterJune30th && (
        <> */}
        <Box
          display="flex"
          justifyContent="flex-end"
        >
          <CtaButton
            fontWeight={600}
            rightArrow
            size="large"
            to="/sponsors/register"
            width={240}
          >
            Begin Sponsorship
          </CtaButton>
        </Box>

        <Typography className="notComplete">
          * Sponsorship is not complete until payment is received.
        </Typography>
      </Container>
    </StyledRoot>
  </Layout>
);

export default SponsorInfo;
