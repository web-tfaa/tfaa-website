// External Dependencies
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

// Internal Dependencies
import Layout from '../components/layout';

// Internal Dependencies
import Container from '../components/shared/container';
import SponsorCard from '../components/shared/sponsor-card';
import { sponsors201819 as sponsorData } from '../components/sponsors/sponsor-data';
// import { sponsors201718 as sponsorData } from '../components/sponsors/sponsor-data';

// Component Definition
const Sponsors = (props) => {
  const {
    location,
  } = props;

  return (
    <Layout location={location}>
      <section
        css={{
          textAlign: 'center',
        }}
      >
        <Helmet>
          <title>TMAC | Sponsors</title>
        </Helmet>
        <h1>Sponsors</h1>
        <Container>
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
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
    </Layout>
  );
};

Sponsors.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default Sponsors;
