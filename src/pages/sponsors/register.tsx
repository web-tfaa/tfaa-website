// External Dependencies
import React from 'react';
import styled from 'styled-components';

// Internal Dependencies
import Layout from '../../components/layout';
import SponsorRegisterContent from '../../components/register/SponsorRegisterContent';

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
const SponsorsRegister: React.FC<Props> = ({ location }) => {
  return (
    <Layout
      location={location}
      pageTitle="Membership Registration"
    >
      <StyledRoot>
        <SponsorRegisterContent />
      </StyledRoot>
    </Layout>
  );
};

export default SponsorsRegister;
