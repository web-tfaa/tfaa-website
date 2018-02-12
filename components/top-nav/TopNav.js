// External Dependences
import React from 'react'
import Link from "gatsby-link";
import styled from "styled-components";

// Local Variables
const Nav = styled.nav`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 64;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 960;
  padding: 0 24px;
`;

const HomeLink = styled.h3`
  margin-bottom: 2em;
  display: inline-block;
  font-style: normal;
`;


const LinkWrapper = styled.span`
  float: right;
`;

// Component Definition
export default ({ children, data }) =>
  <Nav>
    <Link to={`/`}>
      <HomeLink>
        {data.site.siteMetadata.title}
      </HomeLink>
    </Link>
    <LinkWrapper>
      <Link to={`/about/`}>
        About
      </Link>
    </LinkWrapper>
  </Nav>

export const query = graphql`
  query TopNavQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
