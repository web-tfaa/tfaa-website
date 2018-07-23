// External Dependencies
import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';

// Internal Dependencies
import Container from '../../../components/shared/container';

// Component Definition
export default () => (
  <div>
    <Helmet>
      <title>TMAC | People</title>
    </Helmet>
    <Container>
      <Link to="/resources/chronological-admin/">Outstanding Administrators</Link>
      <Link to="/resources/chronological-presidents/">Past Presidents</Link>
    </Container>
  </div>
);
