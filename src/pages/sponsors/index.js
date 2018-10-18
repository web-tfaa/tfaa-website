// External Dependencies
import ArrowForwardIcon from 'react-icons/lib/md/arrow-forward';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

// Internal Dependencies
import Container from '../../components/shared/container';
import CtaButton from '../../components/masthead/cta-button';
import Layout from '../../components/layout';
import SponsorCard from '../../components/shared/sponsor-card';
import { sponsors201819 as sponsorData } from '../../components/sponsors/sponsor-data';

// Component Definition
const Sponsors = props => {
  const { location } = props;

  return (
    <Layout location={location}>
      <section>
        <Helmet>
          <title>TMAC | Sponsors</title>
        </Helmet>
        <Container>
          <h1>Sponsors</h1>
          <CtaButton to="/sponsors/sponsor-info">
            <span css={{ verticalAlign: `middle` }}>Become a Sponsor</span>
            <ArrowForwardIcon
              css={{
                verticalAlign: `baseline`,
                marginLeft: `.6em`,
              }}
            />
          </CtaButton>
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
