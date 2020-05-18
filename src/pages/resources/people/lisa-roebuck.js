// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

// Internal Dependencies
import CardHeadline from '../../../components/shared/cards/card-headline';
import Container from '../../../components/shared/container';
import FuturaParagraph from '../../../components/shared/futura-paragraph';

// Sidebar data
import Layout from '../../../components/layout';
import presets from '../../../utils/presets';
import resourcesSidebar from '../resources-links.yml';
import SidebarBody from '../../../components/shared/sidebar/sidebar-body';

// Local Variables
const rootStyles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
};

const imageStyles = {
  marginBottom: 0,
};

const headingNameStyles = {
  marginBottom: 32,
};

// Component Definition
const LisaRoebuck = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Lisa Roebuck</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Lisa Roebuck"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523154886/lisa-roebuck.jpg"
        />
        <h2 css={headingNameStyles}>Lisa Roebuck</h2>
        <CardHeadline>2020 TMAC Outstanding Administrator</CardHeadline>
        <FuturaParagraph>
          Roebuck has served as a music educator for over 30 years, which includes previously
          teaching music at the elementary and secondary levels. Throughout her career, some of her
          points of pride include establishing and opening Round Rock ISD’s Arts Integration
          Academies, which exposes students to a wide variety of arts strategies integrated into all
          subjects, and implementing technology in fine arts classrooms districtwide.
        </FuturaParagraph>
        {/* Mobile sidebar */}
        <div
          css={{
            display: 'block',
            [presets.Tablet]: {
              display: 'none',
            },
          }}
        >
          <hr
            css={{
              border: 0,
              height: 2,
              marginTop: 10,
            }}
          />
          <SidebarBody inline yaml={resourcesSidebar} />
        </div>
      </Container>
    </div>
  </Layout>
);

LisaRoebuck.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default LisaRoebuck;
