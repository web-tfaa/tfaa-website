// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import AboutForEveryone from '../../components/about/AboutForEveryone';
import AboutInfo from '../../components/about/AboutInfo';
import Community from '../../components/about/Community';
import Goal from '../../components/about/Goal';
import History from '../../components/about/History';
import Layout from '../../components/layout';
import Officers from '../../components/about/People';

// Local Typings
interface Props {
  location: Location;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.aboutPreFooter': {
    backgroundColor: theme.palette.tfaa.about,
    height: theme.spacing(8),
    width: '100%',
  },

  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  width: '100vw',
}));

// Component Definition
const About: FC<Props> = ({ location }) => (
  <Layout
    location={location}
    pageTitle="About"
  >
    <StyledRoot>
      <Community />

      <AboutInfo />

      <AboutForEveryone />

      <History />

      <Goal />

      <Officers />

      <div className="aboutPreFooter" />
    </StyledRoot>
  </Layout>
);

export default About;
