// External Dependencies
import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

// Internal Dependencies
import SponsorCard from '../shared/sponsor-card';

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
    <SponsorsTitle>
      Sponsors
    </SponsorsTitle>
    <SponsorsWrapper>
      <SponsorCard
        max={2000}
        sponsorClass="Class Champion"
      />
      <SponsorCard
        min={1500}
        max={1999}
        sponsorClass="Gold Medal"
      />
      <SponsorCard
        min={1000}
        max={1499}
        sponsorClass="Silver Medal"
      />
      <SponsorCard
        min={500}
        max={999}
        sponsorClass="Bronze Medal"
      />
    </SponsorsWrapper>
  </SponsorsContainer>
