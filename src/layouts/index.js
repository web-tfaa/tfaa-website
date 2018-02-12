// External Dependencies
import React from "react";
import Helmet from "react-helmet"
import styled from "styled-components";

// Internal Dependencies
import Footer from '../components/footer'
import TopNav from '../components/top-nav'
import { rhythm } from "../utils/typography";

// Local Variables
const MainContentContainer = styled.div`
  margin: 0 auto;
  max-width: 960;
`;

const BodyWrapper = styled.div`
  padding: 2rem;
`;

// Component Definition
export default ({ children }) => (
  <MainContentContainer>
    <Helmet defaultTitle={`Texas Music Administrators Conference`}>
      <meta name="twitter:site" content="@TXMusicLeaders" />
      <meta name="og:type" content="website" />
      <meta name="og:site_name" content="TMAC" />
      <html lang="en" amp />
    </Helmet>
    <TopNav />
    <BodyWrapper>
      {children()}
    </BodyWrapper>
    <Footer />
  </MainContentContainer>
);
