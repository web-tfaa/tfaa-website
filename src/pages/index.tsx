// External Dependencies
import React from 'react';
import styled from 'styled-components';

// Internal Dependencies
import FineArtsPriority from '../components/home/FineArtsPriority';
import Greetings from '../components/home/Greetings';
import HomeBanner from '../components/home/HomeBanner';
import HomeStatistics from '../components/home/HomeStatistics';
import Layout from '../components/layout';
import TakeAction from '../components/home/TakeAction';

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
const Home: React.FC<Props> = ({ location }) => (
  <Layout
    location={location}
    pageTitle="Home"
  >
    <StyledRoot>
      <HomeBanner />

      <TakeAction />

      <Greetings />

      <FineArtsPriority />

      <HomeStatistics />
    </StyledRoot>
  </Layout>
);

export default Home;
