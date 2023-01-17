// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import Community from '../../components/about/Community';
import Layout from '../../components/layout';

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
      <Community />
    </StyledRoot>
  </Layout>
);

export default About;
