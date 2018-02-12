// External Dependencies
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
  padding: 1rem 2rem;
  border-bottom: 4px solid #2D456F;
  box-shadow: 3px 0 5px #2D456F;
`;

const LogoLWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HomeLink = styled(Link)`
  display: flex;
  align-items: center;
  font-style: normal;
  text-decoration: none;
  background-image: none;
  color: black;
  font-weight: 500;
`;

const PageLink = styled(Link)`
  margin-left: 0.8rem;
`;

const TmacTitle = styled.span`
  margin-left: 0.8rem;
`;

const LinkWrapper = styled.span`
  justify-content: space-between;
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
