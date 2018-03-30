// External Dependencies
import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

// Internal Dependencies
import Container from '../../components/shared/container';
import Members from '../../components/members';
import Status from '../../components/members/status';
import PrivateRoute from '../../components/shared/private-route';

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
  <PrivateRoute
    path="/members"
    component={Members}
  />
);
