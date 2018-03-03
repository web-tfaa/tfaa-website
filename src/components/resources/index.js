// External Dependencies
import React from "react";
import Link from "gatsby-link";
import Helmet from 'react-helmet';

// Internal Dependencies
import Container from '../shared/container';

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
  </Container>
