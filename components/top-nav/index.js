// External Dependences
import React from 'react'
import Link from "gatsby-link";
import styled from "styled-components";

// Local Variables
const Nav = styled.nav`
  align-items: baseline;
  box-sizing: border-box;
  display: flex;
  height: 64;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 960;
  padding: 0 24px;
  border-bottom: 4px solid purple;
`;

const HomeLink = styled.h3`
  display: inline-block;
  font-style: normal;
  text-decoration: none;
  background-image: none;
`;


const LinkWrapper = styled.span`
  float: right;
`;

// Component Definition
export default ({ children }) =>
  <Nav>
    <Link to={`/`}>
      <HomeLink>
        TMAC
      </HomeLink>
    </Link>
    <LinkWrapper>
      <Link to={`/about/`}>
        About
      </Link>
    </LinkWrapper>
  </Nav>
