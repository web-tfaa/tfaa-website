// External Dependences
import React from "react";
import Helmet from "react-helmet"
import Link from "gatsby-link";
import styled from "styled-components";

// Internal Dependences
import { rhythm } from "../utils/typography";

// Local Variables
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960;
  padding: 2em;
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
export default ({ children, data }) => (
  <Wrapper>
    <Helmet defaultTitle={`Texas Music Administrators Conference`}>
      <meta name="twitter:site" content="@TXMusicLeaders" />
      <meta name="og:type" content="website" />
      <meta name="og:site_name" content="TMAC" />
      <html lang="en" amp />
    </Helmet>
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
    {children()}
  </Wrapper>
);

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
