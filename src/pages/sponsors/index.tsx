// External Dependencies
import {
  Box,
  CircularProgress,
  Collapse,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import React, {
  FC, useEffect, useState
} from 'react';

// Internal Dependencies
import { doGetUsers } from '../../firebase/db';
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import SponsorCard, {
  SPONSORSHIP_LEVELS,
  SPONSORSHIP_PRICE,
} from '../../components/shared/sponsor-card';
import { ReCaptchaProvider } from '../../components/shared/ReCaptchaProvider';
import { SponsorFormValues } from './register';
import usePrevious from '../../utils/hooks/usePrevious';

// Local Typings
interface Props {
  location: Location;
}

// Component Definition
const Sponsors: FC<Props> = ({ location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sponsorData, setSponsorData] = useState<SponsorFormValues[] | null>(null);
  const previousSponsorData = usePrevious(sponsorData);

  const handleUpdateSponsorData = (newSponsorData: SponsorFormValues[] | null) => {
    setSponsorData(newSponsorData);
  };

  // Fetch sponsor data when component mounts
  useEffect(() => {
    const emptySponsorList = [];

    setIsLoading(true);
    doGetUsers('sponsor', emptySponsorList, handleUpdateSponsorData);
  }, []);

  useEffect(() => {
    if (!previousSponsorData && sponsorData) {
      setIsLoading(false);
    }
  }, [previousSponsorData, sponsorData]);

  return (
    <Layout location={location}>
      <ReCaptchaProvider>
        <Box textAlign="center">
          <Helmet>
            <title>TMAC | Sponsors</title>
          </Helmet>

          <Container>
            <h1>Sponsors</h1>

            <Box
              alignItems={isLoading ? 'center' : 'inherit'}
              display="flex"
              flexDirection="column"
              width={isLoading ? 600 : 'inherit'}
            >
              {isLoading && (
                <CircularProgress
                  size={64}
                  thickness={4}
                />
              )}

              <Collapse in={!isLoading}>
                <SponsorCard
                  sponsorData={sponsorData?.filter((sponsor) =>
                    sponsor.SponsorLevel === SPONSORSHIP_LEVELS.CLASS_CHAMPION)}
                  title={SPONSORSHIP_LEVELS.CLASS_CHAMPION}
                />
                <SponsorCard
                  sponsorData={sponsorData?.filter((sponsor) =>
                    sponsor.SponsorLevel === SPONSORSHIP_LEVELS.GOLD_MEDAL)}
                  subtitle={SPONSORSHIP_PRICE[SPONSORSHIP_LEVELS.GOLD_MEDAL]}
                  title={SPONSORSHIP_LEVELS.GOLD_MEDAL}
                />
                <SponsorCard
                  sponsorData={sponsorData?.filter((sponsor) =>
                    sponsor.SponsorLevel === SPONSORSHIP_LEVELS.SILVER_MEDAL)}
                  subtitle={SPONSORSHIP_PRICE[SPONSORSHIP_LEVELS.SILVER_MEDAL]}
                  title={SPONSORSHIP_LEVELS.SILVER_MEDAL}
                />
              </Collapse>
            </Box>
          </Container>
        </Box>
      </ReCaptchaProvider>
    </Layout>
  );
};

export default Sponsors;
