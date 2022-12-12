// External Dependencies
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

// Internal Dependencies
import Layout from '../components/layout';
import Greetings from '../components/home/Greetings';
import HomeBanner from '../components/home/HomeBanner';
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
  justifyContent: 'space-between',
});

// Component Definition
const Home: FC<Props> = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Home</title>
    </Helmet>

    <StyledRoot>
      <HomeBanner />

      <TakeAction />

      <Greetings />

    </StyledRoot>
  </Layout>
);

export default Home;
