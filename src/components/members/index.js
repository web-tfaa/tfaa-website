// External Dependencies
import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import hex2rgba from 'hex2rgba';

// Internal Dependencies
import Container from '../shared/container';
import Status from './status';
import SidebarBody from '../shared/sidebar/sidebar-body';
import presets from '../../utils/presets';

// Sidebar data
import membersSidebar from '../../pages/members/members-links.yml';

// Local Variables
const texasFlagRed = '#BF0A30';

// Local Styles
const titleStyles = {
  display: 'inline-block',
  borderBottom: 'solid 1px',
};

const contentStyles = {
  display: 'flex',
};

// Component Definition
export default () => (
  <div>
    <Status />
    <Container>
      <Helmet>
        <title>TMAC | Members</title>
      </Helmet>
      <h3 css={titleStyles}>
        Members
      </h3>
      <div css={contentStyles}>
        Members data
      </div>
      <div
        css={{
          display: `block`,
          [presets.Tablet]: {
            display: `none`,
          },
        }}
      >
        <hr css={{
          height: 6,
          border: 0,
          boxShadow: `inset 0 12px 12px -12px ${hex2rgba(texasFlagRed, 0.9)}`,
        }} />
        <SidebarBody inline yaml={membersSidebar} />
      </div>
    </Container>
  </div>
);
