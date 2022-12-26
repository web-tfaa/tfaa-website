// External Dependencies
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../utils/app-constants';
import FineArtsPriority from '../components/home/FineArtsPriority';
import Greetings from '../components/home/Greetings';
import HomeBanner from '../components/home/HomeBanner';
// import HomeStatistics from '../components/home/HomeStatistics';
import Layout from '../components/layout';
import TakeAction from '../components/home/TakeAction';
import WhatWeDo from '../components/home/WhatWeDo';

// Local Typings
interface Props {
  location: Location;
}

// Local Variables
const StyledRoot = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  width: '100vw',
});

// Component Definition
const Home: FC<Props> = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>{appNameShort} | Home</title>
    </Helmet>

    <StyledRoot>
      <HomeBanner />

      <TakeAction />

      <Greetings />

      <WhatWeDo />

      <FineArtsPriority />

      {/* <HomeStatistics /> */}

    </StyledRoot>
  </Layout>
);

export default Home;
