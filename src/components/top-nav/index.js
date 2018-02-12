// External Dependencies
import React from 'react'
import Link from "gatsby-link";
import styled from "styled-components";

// Local Variables
const Nav = styled.nav`
  align-items: center;
  background-color: #efefef;
  box-sizing: border-box;
  display: flex;
  height: 64;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 960;
  padding: 1rem 2rem;
  border-bottom: 4px solid #2D456F;
  box-shadow: 3px 0 5px #2D456F;
`;

const HomeLink = styled(Link)`
  display: flex;
  background-color: #efefef;
  align-items: center;
  font-style: normal;
  text-decoration: none;
  background-image: none;
  color: black;
  font-weight: 500;
  text-shadow: none;
`;

const PageLink = styled(Link)`
  margin-left: 0.8rem;
  text-shadow: none;
`;

const TmacTitle = styled.span`
  background-color: #efefef;
  margin-left: 0.8rem;
  text-decoration: none;
  background-image: none;
  font-style: normal;
`;

const LinkWrapper = styled.span`
  justify-content: space-between;
  background-color: #efefef;
  text-decoration: none;
  background-image: none;
  text-shadow: none;
`;

// Component Definition
export default () =>
  <Nav>
    <HomeLink to={`/`}>
      <img
        style={{ marginBottom: 0 }}
        height="25px"
        src="http://res.cloudinary.com/drumsensei/image/upload/v1518414495/tmac-logo_upybjp.jpg"
      />
      <TmacTitle>TMAC</TmacTitle>
    </HomeLink>
    <LinkWrapper>
      <PageLink to={`/about/`}>
        About
      </PageLink>
      <PageLink to={`/resources/`}>
        Resources
      </PageLink>
      <PageLink to={`/membership/`}>
        Membership
      </PageLink>
      <PageLink to={`/sponsors/`}>
        Sponsors
      </PageLink>
    </LinkWrapper>
  </Nav>
