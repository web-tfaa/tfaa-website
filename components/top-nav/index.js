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
  padding: 1rem 2rem;
  border-bottom: 4px solid purple;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  font-style: normal;
  text-decoration: none;
  background-image: none;
`;

const LinkWrapper = styled.span`
  justify-content: space-between;
`;

// Component Definition
export default () =>
  <Nav>
    <HomeLink to={`/`}>
      TMAC
    </HomeLink>
    <LinkWrapper>
      <Link to={`/about/`}>
        About
      </Link>
    </LinkWrapper>
  </Nav>
