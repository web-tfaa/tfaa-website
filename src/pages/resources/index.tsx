// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import FooterTopper from '../../components/footer/FooterTopper';
import Layout from '../../components/layout';
import ResourcesBanner from '../../components/resources/ResourcesBanner';
import ResourcesHeroBannerImage from '../../components/resources/ResourcesHeroBannerImage';
import ResourcesList from '../../components/resources/ResourcesList';
import ResourcesInfoBanner from '../../components/resources/ResourcesInfoBanner';

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

        <ResourcesInfoBanner />

        <ResourcesHeroBannerImage />

        <ResourcesList />

        <FooterTopper color="resources" />
      </StyledRoot>
    </Layout>
  );
};

export default Resources;
