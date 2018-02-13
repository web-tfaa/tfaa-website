// External Dependencies
import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

// Local Variables
const JoinTitle = styled.h3`
  display: inline-block;
  border-bottom: solid 1px;
`;

const JoinWrapper = styled.div`
  display: flex;
`;

// Component Definition
export default () =>
  <div>
    <JoinTitle>
      Join
    </JoinTitle>
    <JoinWrapper>
      Join data
    </JoinWrapper>
  </div>
