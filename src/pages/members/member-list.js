// External Dependencies
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Internal Dependencies
// import Alert from '../../components/shared/Alert';
import AuthUserContext from '../../components/session/AuthUserContext';
import EnhancedAlert from '../../components/shared/EnhancedAlert';
import Layout from '../../components/layout';
import MemberListTable from './member-table';
import Status from './status';
import presets from '../../utils/presets';
import { doGetUsers } from '../../firebase/db';
import { ADMIN_USER_EMAIL_LIST } from '../../utils/member-constants';

// Local Variables
const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.shape({}).isRequired,
  userEmail: PropTypes.string,
};

const defaultProps = {
  userEmail: '',
};

const StyledRoot = styled.div(({ theme }) => ({
  '.adminCard': {
    maxWidth: '75%',
  },

  '.paddingContainer': {
    padding: theme.spacing(0, 3, 3),
  },

  [presets.Tablet]: {
    paddingLeft: 0,
  },

  paddingLeft: 0,
  width: '0 auto',
}));

// Component Definition
const MemberListContent = ({
  isAuthenticated,
  userEmail,
}) => {
  const [userData, setUserData] = useState([]);

  console.log('MemberListContent : userData', userData);

  const handleUpdateUserList = (userList) => {
    setUserData(userList);
  };

  useEffect(() => {
    const userList = [];

    doGetUsers('registration', userList, handleUpdateUserList);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  const isAdmin = userEmail && ADMIN_USER_EMAIL_LIST.includes(userEmail);

  return (
    <StyledRoot>
      <Status />

      <Helmet>
        <title>TMAC | Member List</title>
      </Helmet>

      <div className="paddingContainer">
        <h2>Member list</h2>

        {isAdmin && (
          <EnhancedAlert
            className="adminCard"
            severity="info"
            title="Admin View"
          >
            You can print any member&apos;s invoice or receipt from each row.
          </EnhancedAlert>
        )}

        <MemberListTable
          data={Object.values(userData)}
          isAdmin={isAdmin}
        />
      </div>
    </StyledRoot>
  );
};

MemberListContent.propTypes = propTypes;
MemberListContent.defaultProps = defaultProps;

const MemberList = (props) => (
  // eslint-disable-next-line
  <Layout location={props.location}>
    <MemberListWithContext
      {...props}
    />
  </Layout>
);

const MemberListWithContext = (props) => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <MemberListContent
        {...props}
        userEmail={authUser ? authUser.email : ''}
        isAuthenticated={!!authUser}
      />
    )}
  </AuthUserContext.Consumer>
);

export default MemberList;
