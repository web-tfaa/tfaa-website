// External Dependences
import React from "react";
import Helmet from "react-helmet"
import styled from "styled-components";

// Internal Dependences
import TopNav from '../../components/top-nav'
import { rhythm } from "../utils/typography";

// Local Variables
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960;
  padding: 2em;
`;

// Component Definition
export default ({ children }) => (
  <Wrapper>
    <Helmet defaultTitle={`Texas Music Administrators Conference`}>
      <meta name="twitter:site" content="@TXMusicLeaders" />
      <meta name="og:type" content="website" />
      <meta name="og:site_name" content="TMAC" />
      <html lang="en" amp />
    </Helmet>
    <TopNav />
    {children()}
  </Wrapper>
);
