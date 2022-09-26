// External Dependencies
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

// Internal Dependencies
// import Alert from '../../components/shared/Alert';
import AuthUserContext from '../../components/session/AuthUserContext';
import EnhancedAlert from '../../components/shared/EnhancedAlert';
import Layout from '../../components/layout';
import SponsorListTable from './sponsor-table';
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

const useStyles = makeStyles((theme) => ({
  adminCard: {
    borderLeft: `4px solid ${theme.palette.alert.info}`,
    maxWidth: '75%',
  },
  paddingContainer: {
    paddingLeft: 24,
  },
  root: {
    paddingLeft: 0,
    width: '0 auto',
    [presets.Tablet]: {
      paddingLeft: 0,
    },
  },
}));

const EMPTY_ARRAY = [];

// Component Definition
const SponsorListContent = ({
  isAuthenticated,
  userEmail,
}) => {
  const classes = useStyles();

  const [userData, setUserData] = useState(EMPTY_ARRAY);

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
    <div className={classes.root}>
      <Status />

      <Helmet>
        <title>TMAC | Sponsor List</title>
      </Helmet>

      <div className={classes.paddingContainer}>
        <h2>Sponsor list</h2>
        {isAdmin && (
          <EnhancedAlert
            title="Admin View"
            severity="info"
          >
            You can print any sponso&apos;s invoice or receipt from each row.
          </EnhancedAlert>
        )}

        <SponsorListTable
          data={Object.values(userData)}
          isAdmin={isAdmin}
        />
      </div>
    </div>
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
