// External Dependencies
import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import Helmet from 'react-helmet';

// Internal Dependencies
import Container from '../shared/container';

// Local Variables
const MembersTitle = styled.h3`
  display: inline-block;
  border-bottom: solid 1px;
`;

const MembersWrapper = styled.div`
  display: flex;
`;

// Component Definition
export default () =>
  <Container>
    <Helmet>
      <title>TMAC | Members</title>
    </Helmet>
    <MembersTitle>
      Members
    </MembersTitle>
    <MembersWrapper>
      Members data
    </MembersWrapper>
  </Container>
