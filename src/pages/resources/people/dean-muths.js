// External Dependencies
import Helmet from 'react-helmet';
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
export default ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Dean Muths</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Dean Muths"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523153280/dean-muths.jpg"
        />
        <h2 css={headingNameStyles}>Dean Muths</h2>
        <CardHeadline>TMAC Past President, 2016-2017</CardHeadline>

        <FuturaParagraph>Dean Muth's bio coming soon!</FuturaParagraph>
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
