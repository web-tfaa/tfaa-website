// External Dependencies
import React from "react";
import Link from "gatsby-link";
import Helmet from 'react-helmet';
import hex2rgba from 'hex2rgba';

// Internal Dependencies
import Container from '../shared/container';
import presets from '../../utils/presets';
import SidebarBody from '../shared/sidebar/sidebar-body';

// Sidebar data
import resourcesSidebar from '../../pages/resources/resources-links.yml';

// Local Variables
const texasFlagRed = '#BF0A30';

// Component Definition
export default () =>
  <Container>
    <Helmet>
      <title>TMAC | Resources</title>
    </Helmet>
    <h3
      css={{
        display: 'inline-block',
        borderBottom: 'solid 1px',
      }}
    >
      Resources
    </h3>
    <div
      css={{
        display: 'flex',
      }}
    >
      Resources data
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
      <SidebarBody inline yaml={resourcesSidebar} />
    </div>
  </Container>
