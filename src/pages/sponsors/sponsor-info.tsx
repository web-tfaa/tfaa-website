// External Dependencies
import { Box } from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';
import { isTodayAfterJuly31st } from '../../utils/helpers';
import Container from '../../components/shared/container';
import CtaButton from '../../components/shared/CtaButton';
import Layout from '../../components/layout';
import RegistrationPausedAlert from '../../components/shared/RegistrationPausedAlert';
import SponsorsBanner from '../../components/sponsors/SponsorsBanner';

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
const SponsorInfo: React.FC<Props> = ({ location }) => {
  // We normally shut down registration and sponsorship after TMEA each year and open it up on 8/1
  const showSponsorshipInfo = isTodayAfterJuly31st;

  return (
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

            {!showSponsorshipInfo
              ? (
                <RegistrationPausedAlert isMembership={false} />
              ) : (
                <>
                  <Typography>
                    To become a {appNameShort} sponsor, please complete these three steps:
                  </Typography>

                  <ol>
                    <li>
                      Sign up for a {appNameShort} website login or sign in if you already have a website login.
                    </li>

                    <li>
                      Complete the Sponsorship Form.
                    </li>

                    <li>
                      To pay, mail invoice with check to the {appNameShort} Executive Secretary.
                    </li>
                  </ol>
              </>
            )}
          </Box>

          {showSponsorshipInfo && (
            <>
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
            </>
          )}
        </Container>
      </StyledRoot>
    </Layout>
  );
};

export default SponsorInfo;
