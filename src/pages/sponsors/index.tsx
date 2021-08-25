// External Dependencies
import {
  Box,
  // Typography,
} from '@material-ui/core';
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
import usePrevious from '../../utils/hooks/usePrevious';
import { SponsorFormValues } from './register';

// Local Typings
interface Props {
  location: unknown;
}

// Component Definition
const Sponsors: FC<Props> = ({ location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sponsorData, setSponsorData] = useState<SponsorFormValues[] | null>(null);
  const previousSponsorData = usePrevious(sponsorData);

  console.log('isLoading', isLoading);

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
      <Box textAlign="center">
        <Helmet>
          <title>TMAC | Sponsors</title>
        </Helmet>

        <Container>
          <h1>Sponsors</h1>

          <Box
            display="flex"
            flexDirection="column"
          >
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
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Sponsors;
