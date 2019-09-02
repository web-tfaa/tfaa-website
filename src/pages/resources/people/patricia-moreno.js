// External Dependencies
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

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
const PatriciaMoreno = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Patricia Moreno</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Patricia Moreno"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523131020/Moreno.jpg"
        />
        <h2 css={headingNameStyles}>Patricia Moreno</h2>
        <CardHeadline>TMAC Past President, 2018-2019</CardHeadline>
        <FuturaParagraph>
          Patricia Moreno, M.M., currently serves as the AISD Instructional Coordinator of General Music and Choral Music, leading one hundred thirty music educators that instruct approximately forty thousand students in music and choral music classes. She taught general and choral music for seventeen years in Hays Consolidated ISD in Title I schools. She is the co-founder and Director of the Kodály Certification Program at Texas State University. She was also appointed by the State Board of Education to serve on the revised Texas Essential Knowledge and Skills (TEKS) committee; co-author of an article, “Fine Arts TEKS Revisions Complete” in TMEA’s Southwestern Musician, reviewer for Oxford University Press and presents workshops across the state.
        </FuturaParagraph>
        {/* Mobile sidebar */}
        <div
          css={{
            display: `block`,
            [presets.Tablet]: {
              display: `none`,
            },
          }}>
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

PatriciaMoreno.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default PatriciaMoreno;
