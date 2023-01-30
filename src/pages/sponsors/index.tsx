// External Dependencies
// import {
//   Box,
//   CircularProgress,
//   Collapse,
// } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { ReCaptchaProvider } from '../../components/shared/ReCaptchaProvider';
import Layout from '../../components/layout';
import SponsorsBanner from '../../components/sponsors/SponsorsBanner';
import SponsorsHeroBannerImage from '../../components/sponsors/SponsorsHeroBannerImage';
// import { doGetUsers } from '../../firebase/db';
// import Container from '../../components/shared/container';
// import SponsorCard, {
//   SPONSORSHIP_LEVELS,
//   SPONSORSHIP_PRICE,
// } from '../../components/shared/sponsor-card';
// import { SponsorFormValues } from './register';
// import usePrevious from '../../utils/hooks/usePrevious';

// Local Typings
interface Props {
  location: Location;
}

// Local Variables
const StyledRoot = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  width: '100vw',
});

// Component Definition
const Sponsors: FC<Props> = ({ location }) => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [sponsorData, setSponsorData] = useState<SponsorFormValues[] | null>(null);
  // const previousSponsorData = usePrevious(sponsorData);

  // const handleUpdateSponsorData = (newSponsorData: SponsorFormValues[] | null) => {
  //   setSponsorData(newSponsorData);
  // };

  // // Fetch sponsor data when component mounts
  // useEffect(() => {
  //   const emptySponsorList = [];

  //   setIsLoading(true);
  //   doGetUsers('sponsor', emptySponsorList, handleUpdateSponsorData);
  // }, []);

  // useEffect(() => {
  //   if (!previousSponsorData && sponsorData) {
  //     setIsLoading(false);
  //   }
  // }, [previousSponsorData, sponsorData]);

  return (
    <Layout
      location={location}
      pageTitle="Sponsors"
    >
      <ReCaptchaProvider>
        <StyledRoot>
          <SponsorsBanner />

          <SponsorsHeroBannerImage />
        </StyledRoot>
      </ReCaptchaProvider>
    </Layout>
  );
};

export default Sponsors;
