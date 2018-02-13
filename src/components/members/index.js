// External Dependencies
import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

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
  <div>
    <MembersTitle>
      Members
    </MembersTitle>
    <MembersWrapper>
      Members data
    </MembersWrapper>
  </div>
