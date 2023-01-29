// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import EventsBanner from '../../components/events/EventsBanner';
import EventsList from '../../components/events/EventsList';
import WhereWeHaveBeen from '../../components/about/WhereWeHaveBeen';
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
      <EventsBanner />

      <EventsList />

      <WhereWeHaveBeen color="events" />
    </StyledRoot>
  </Layout>
);

export default Events;
