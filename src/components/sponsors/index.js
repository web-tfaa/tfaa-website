// External Dependencies
import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

// Local Variables
const SponsorsTitle = styled.h3`
  display: inline-block;
  border-bottom: solid 1px;
`;

const SponsorsWrapper = styled.div`
  display: flex;
`;

// Component Definition
export default () =>
  <div>
    <SponsorsTitle>
      Sponsors
    </SponsorsTitle>
    <SponsorsWrapper>
      Sponsors data
    </SponsorsWrapper>
  </div>
