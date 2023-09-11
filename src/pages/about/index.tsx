// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import AboutForEveryone from '../../components/about/AboutForEveryone';
import AboutInfo from '../../components/about/AboutInfo';
import AboutCommunity from '../../components/about/AboutCommunity';
import Goal from '../../components/about/Goal';
import History from '../../components/about/History';
import Layout from '../../components/layout';
import People from '../../components/about/People';
import WhereWeHaveBeen from '../../components/about/WhereWeHaveBeen';

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
const About: FC<Props> = ({ location }) => (
  <Layout
    location={location}
    pageTitle="About"
  >
    <StyledRoot>
      <AboutCommunity />

      <AboutInfo />

      <AboutForEveryone />

      <History />

      <Goal />

      <People />

      <WhereWeHaveBeen color="about" />
    </StyledRoot>
  </Layout>
);

export default About;
