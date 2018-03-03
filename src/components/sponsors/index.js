// External Dependencies
import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Helmet from 'react-helmet';

// Internal Dependencies
import SponsorCard from '../shared/sponsor-card';
import sponsorData from './sponsor-data';

// Local Variables
const SponsorsContainer = styled.section`
  text-align: center;
`;

const SponsorsTitle = styled.h3`
  display: inline-block;
  border-bottom: solid 1px;
`;

const SponsorsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// Component Definition
export default () =>
  <SponsorsContainer>
    <Helmet>
      <title>TMAC | Sponsors</title>
    </Helmet>
    <SponsorsTitle>
      Sponsors
    </SponsorsTitle>
    <SponsorsWrapper>
      <SponsorCard
        max={2000}
        sponsorClass="Class Champion"
        sponsorData={sponsorData.champion}
      />
      <SponsorCard
        min={1500}
        max={1999}
        sponsorClass="Gold Medal"
        sponsorData={sponsorData.gold}
      />
      <SponsorCard
        min={1000}
        max={1499}
        sponsorClass="Silver Medal"
        sponsorData={sponsorData.silver}
      />
      <SponsorCard
        min={500}
        max={999}
        sponsorClass="Bronze Medal"
        sponsorData={sponsorData.bronze}
      />
    </SponsorsWrapper>
  </SponsorsContainer>
