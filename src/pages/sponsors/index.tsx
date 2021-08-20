// External Dependencies
import {
  Box,
  Typography,
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import React, { FC, useEffect, useState } from 'react';

// Internal Dependencies
import { doGetUsers } from '../../firebase/db';
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import SponsorCard, {
  SPONSORSHIP_LEVELS,
  SPONSORSHIP_PRICE,
} from '../../components/shared/sponsor-card';
import usePrevious from '../../utils/hooks/usePrevious';

// Local Typings
interface Props {
  location: unknown;
}

// Local Variables
const emptySponsorList = [];

// Component Definition
const Sponsors: FC<Props> = ({ location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sponsorData, setSponsorData] = useState<unknown[] | null>(null);
  const previousSponsorData = usePrevious(sponsorData);

  console.log('isLoading', isLoading);
  console.log('previousSponsorData', previousSponsorData);
  console.log('sponsorData', sponsorData);

  // Fetch sponsor data when component mounts
  useEffect(() => {
    setIsLoading(true);
    doGetUsers('sponsor', emptySponsorList, setSponsorData);
  }, []);

  useEffect(() => {
    if (!previousSponsorData && sponsorData) {
      setIsLoading(false);
    }
  }, [previousSponsorData, sponsorData]);

  return (
    <Layout location={location}>
      <Box textAlign="center">
        <Helmet>
          <title>TMAC | Sponsors</title>
        </Helmet>

        <Container>
          <Typography>Sponsors</Typography>

          <Box
            display="flex"
            flexDirection="column"
          >
            <SponsorCard
              sponsorData={[]}
              subtitle={SPONSORSHIP_PRICE[SPONSORSHIP_LEVELS.SILVER_MEDAL]}
              title={SPONSORSHIP_LEVELS.SILVER_MEDAL}
            />
            <SponsorCard
              sponsorData={[]}
              subtitle={SPONSORSHIP_PRICE[SPONSORSHIP_LEVELS.GOLD_MEDAL]}
              title={SPONSORSHIP_LEVELS.GOLD_MEDAL}
            />
            <SponsorCard
              sponsorData={[]}
              title={SPONSORSHIP_LEVELS.CLASS_CHAMPION}
            />
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Sponsors;
