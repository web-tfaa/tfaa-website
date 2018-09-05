// External Dependencies
import Helmet from 'react-helmet';
import React from 'react';

// Internal Dependencies
import Container from '../shared/container';
import SponsorCard from '../shared/sponsor-card';
import { sponsors201718 as sponsorData } from './sponsor-data';

// Component Definition
export default () => (
  <section css={{ textAlign: 'center' }}>
    <Helmet>
      <title>TMAC | Sponsors</title>
    </Helmet>
    <h1>Sponsors</h1>
    <Container>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
        }}>
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
      </div>
    </Container>
  </section>
);
