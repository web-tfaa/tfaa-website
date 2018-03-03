// External Dependencies
import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import Helmet from 'react-helmet';

// Internal Dependencies
import Container from '../shared/container';

// Local Variables
const ResourcesTitle = styled.h3`
  display: inline-block;
  border-bottom: solid 1px;
`;

const ResourcesWrapper = styled.div`
  display: flex;
`;

// Component Definition
export default () =>
  <Container>
    <Helmet>
      <title>TMAC | Resources</title>
    </Helmet>
    <ResourcesTitle>
      Resources
    </ResourcesTitle>
    <ResourcesWrapper>
      Resources data
    </ResourcesWrapper>
  </Container>
