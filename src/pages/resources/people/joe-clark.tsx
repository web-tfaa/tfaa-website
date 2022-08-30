// External Dependencies
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { FC } from 'react';

// Internal Dependencies
import CardHeadline from '../../../components/shared/cards/card-headline';
import Container from '../../../components/shared/container';
import FuturaParagraph from '../../../components/shared/futura-paragraph';

// Sidebar data
import Layout from '../../../components/layout';
import presets from '../../../utils/presets';
import resourcesSidebar from '../resources-links.yml';
import SidebarBody from '../../../components/shared/sidebar/SidebarBody';

// Local Variables
const rootStyles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
};

const imageStyles = {
  marginBottom: 0,
  width: '50%',
};

const headingNameStyles = {
  marginBottom: 32,
};

// Component Definition
const SamHarris: FC = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Joe Clark</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Joe Clark"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1566826627/joe-clark.jpg"
        />
        <h2 css={headingNameStyles}>Joe Clark</h2>
        <CardHeadline>TMAC Past President, 2020-2021</CardHeadline>

        <FuturaParagraph>
          More info coming soon...
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

SamHarris.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default SamHarris;
