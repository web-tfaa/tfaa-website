// External Dependencies
import { Helmet } from 'react-helmet';
import { navigate } from 'gatsby';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { ADMIN_USER_EMAIL_LIST } from '../../utils/member-constants';
import { appNameShort } from '../../utils/app-constants';
import { doGetUsers } from '../../firebase/db';
import { useGetAuthUser } from '../../utils/hooks/useGetAuthUser';
import { useLoadCurrentMemberData } from '../../utils/hooks/useLoadCurrentMemberData';
import AuthUserContext from '../../components/session/AuthUserContext';
import CtaButton from '../../components/shared/CtaButton';
import EnhancedAlert from '../../components/shared/EnhancedAlert';
import Layout from '../../components/layout';
import MemberListTable from './member-table';
// import Motifs from '../../components/shared/Motifs';

// Local Variables
const propTypes = {
  location: PropTypes.shape({}).isRequired,
};

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
const MemberList = () => {
  const { currentAuthUser } = useGetAuthUser();

  const { currentMemberData, isLoading } = useLoadCurrentMemberData();
  console.log('currentMemberData', currentAuthUser, currentMemberData);

  const [userData, setUserData] = useState([]);

  const handleUpdateUserList = (userList) => {
    setUserData(userList);
  };

  useEffect(() => {
    const userList = [];

    doGetUsers('registration', userList, handleUpdateUserList);
  }, []);

  const isAdmin = Boolean(currentAuthUser && ADMIN_USER_EMAIL_LIST.includes(currentAuthUser.email));

  const handleNavigateToMemberContent = useCallback(() => {
    navigate('/members');
  }, []);

  return (
    <Layout
      location={location}
      pageTitle="Member List"
    >
      <StyledRoot>
        {/* <Motifs small /> */}

        <div className="paddingContainer">
          <h2>Member list</h2>

          {isLoading ? <CircularProgress size={64} /> : (
            <>
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
            </>
          )}

          <Box marginTop={4}>
            <CtaButton
              fontWeight={300}
              onClick={handleNavigateToMemberContent}
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              width={220}
            >
              Back to Member Content
            </CtaButton>
          </Box>
        </div>
      </StyledRoot>
    </Layout>
  );
};

MemberList.propTypes = propTypes;

export default MemberList;
