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
      <title>TMAC | Members</title>
    </Helmet>
    <h3
      css={{
        display: 'inline-block',
        borderBottom: 'solid 1px',
      }}
    >
      Members
    </h3>
    <div
      css={{
        display: 'flex',
      }}
    >
      Members data
    </div>
  </Container>
