// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
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
const Events: FC<Props> = ({ location }) => (
  <Layout
    location={location}
    pageTitle="Events"
  >
    <StyledRoot>
      <h1>Events</h1>
    </StyledRoot>
  </Layout>
);

export default Events;
