// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import Layout from '../../components/layout';
import ResourcesBanner from '../../components/resources/ResourcesBanner';
import ResourcesInfo from '../../components/resources/ResourcesInfo';

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
const Resources: FC<Props> = ({ location }) => {
  return (
    <Layout
      location={location}
      pageTitle="Resources"
    >
      <StyledRoot>
        <ResourcesBanner />

        <ResourcesInfo />
      </StyledRoot>
    </Layout>
  );
};

export default Resources;
