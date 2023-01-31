// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { ReCaptchaProvider } from '../../components/shared/ReCaptchaProvider';
import Layout from '../../components/layout';
import SponsorsBanner from '../../components/sponsors/SponsorsBanner';
import SponsorsHeroBannerImage from '../../components/sponsors/SponsorsHeroBannerImage';
import SponsorsList from '../../components/sponsors/SponsorsList';
import WhereWeHaveBeen from '../../components/about/WhereWeHaveBeen';

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
  return (
    <Layout
      location={location}
      pageTitle="Sponsors"
    >
      <ReCaptchaProvider>
        <StyledRoot>
          <SponsorsBanner />

          <SponsorsHeroBannerImage />

          <SponsorsList />

          <WhereWeHaveBeen color="membership" />
        </StyledRoot>
      </ReCaptchaProvider>
    </Layout>
  );
};

export default Sponsors;
