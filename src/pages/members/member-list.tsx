// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import Layout from '../../components/layout';
import MembersListAuthSwitchRoute from '../../components/members/MembersList/MembersListAuthSwitchRoute';

// Local Typings
interface Props {
  location: Location;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) =>({
  '.paddingContainer': {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 2, 2),
    },

    padding: theme.spacing(6, 3, 3),
  },

  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: '100%',
}));

// Component Definition
const MemberList: FC<Props> = ({ location }) => {
  return (
    <Layout
      location={location}
      pageTitle="Member List"
    >
      <StyledRoot>
        <MembersListAuthSwitchRoute />
      </StyledRoot>
    </Layout>
  );
};

export default MemberList;
