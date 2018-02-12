// External Dependencies
import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

// Local Variables
const MembershipTitle = styled.h3`
  display: inline-block;
  border-bottom: solid 1px;
`;

const MembershipWrapper = styled.div`
  display: flex;
`;

// Component Definition
export default () =>
  <div>
    <MembershipTitle>
      Membership
    </MembershipTitle>
    <MembershipWrapper>
      Membership data
    </MembershipWrapper>
  </div>
