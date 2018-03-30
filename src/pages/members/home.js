// External Dependencies
import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

// Internal Dependencies
import Container from '../../components/shared/container';
import Status from '../../components/members/status';

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
    </Container>
  </div>
);
