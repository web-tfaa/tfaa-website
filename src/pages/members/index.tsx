// External Dependencies
import React from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { ReCaptchaProvider } from '../../components/shared/ReCaptchaProvider';
import Layout from '../../components/layout';
import MemberAuthSwitchRoute from '../../components/members/MemberAuthSwitchRoute';

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
const Members: React.FC<Props> = ({ location }) => {
  return (
    <Layout
      location={location}
      pageTitle="Members"
    >
      <ReCaptchaProvider>
        <StyledRoot>
          <MemberAuthSwitchRoute />
        </StyledRoot>
      </ReCaptchaProvider>
    </Layout>
  );
};

export default Members;
