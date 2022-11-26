// External Dependencies
import { Helmet } from 'react-helmet';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Internal Dependencies
// import Alert from '../../components/shared/Alert';
import AuthUserContext from '../../components/session/AuthUserContext';
import EnhancedAlert from '../../components/shared/EnhancedAlert';
import Layout from '../../components/layout';
import SponsorListTable from './sponsor-table';
import Status from './status';
import presets from '../../utils/presets';
import { doGetUsers } from '../../firebase/db';
import {
  TMAC_WEB_EXECUTIVE_SECRETARY,
  TMAC_WEB_ADMIN_EMAIL_LIST,
} from '../../utils/member-constants';

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
    borderLeft: `4px solid ${theme.palette.alert.info}`,
    maxWidth: '75%',
  },
  '.paddingContainer': {
    paddingLeft: 24,
  },

  [presets.Tablet]: {
    paddingLeft: 0,
  },

  paddingLeft: 0,
  width: '0 auto',
}));

// Component Definition
const SponsorListContent = ({
  isAuthenticated,
  userEmail,
}) => {
  const [userData, setUserData] = useState([]);

  const handleUpdateUserList = (userList) => {
    setUserData(userList);
  };

  useEffect(() => {
    const userList = [];

    doGetUsers('sponsor', userList, handleUpdateUserList);
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  const shouldSeeSponsorListLink = userEmail
    && (TMAC_WEB_ADMIN_EMAIL_LIST.includes(userEmail)
    || userEmail === TMAC_WEB_EXECUTIVE_SECRETARY);

  if (!shouldSeeSponsorListLink) {
    return <Typography>This data is only available for admin users.</Typography>;
  }

  return (
    <StyledRoot>
      <Status />

      <Helmet>
        <title>TMAC | Sponsor List</title>
      </Helmet>

      <div className="paddingContainer">
        <h2>Sponsor list</h2>

        {shouldSeeSponsorListLink && (
          <EnhancedAlert
            title="Admin View"
            severity="info"
          >
            You can print any sponsor&apos;s invoice or receipt from each row.
          </EnhancedAlert>
        )}

        <SponsorListTable
          data={Object.values(userData)}
          isAdmin={shouldSeeSponsorListLink}
        />
      </div>
    </StyledRoot>
  );
};

SponsorListContent.propTypes = propTypes;
SponsorListContent.defaultProps = defaultProps;

const SponsorList = (props) => (
  // eslint-disable-next-line
  <Layout location={props.location}>
    <SponsorListWithContext
      {...props}
    />
  </Layout>
);

const SponsorListWithContext = (props) => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <SponsorListContent
        {...props}
        userEmail={authUser ? authUser.email : ''}
        isAuthenticated={!!authUser}
      />
    )}
  </AuthUserContext.Consumer>
);

export default SponsorList;
