/*
  Main container for the Membership Registration process
*/

// External Dependencies
import React from 'react';
import styled from 'styled-components';

// Internal Dependencies
import Layout from '../../components/layout';
import MemberRegisterContent from '../../components/register/MemberRegisterContent';

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
const MembersRegister: React.FC<Props> = ({ location }) => {
  return (
    <Layout
      location={location}
      pageTitle="Membership Registration"
    >
      <StyledRoot>
        <MemberRegisterContent />
      </StyledRoot>
    </Layout>
  );
};

export default MembersRegister;
