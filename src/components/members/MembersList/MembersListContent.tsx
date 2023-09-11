// External Dependencies
import { navigate } from 'gatsby';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { FC, useCallback } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { ADMIN_USER_EMAIL_LIST } from '../../../utils/member-constants';
import { TfaaAuthUser } from '../../layout';
import {
  // TfaaMemberData,
  useGetAllMembers,
} from '../../../utils/hooks/useGetAllMembers';
import CtaButton from '../../shared/CtaButton';
import EnhancedAlert from '../../shared/EnhancedAlert';
import MemberListTable from '../../../pages/members/member-table';

// Local Typings
interface Props {
  currentAuthUser: TfaaAuthUser | null;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) =>({
  '.paddingContainer': {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5, 2, 2),
    },

    padding: theme.spacing(6, 3, 3),
    width: '100%',
  },

  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: '100%',
}));

const useTestData = false;

// Component Definition
const MembersListContent: FC<Props> = ({ currentAuthUser }) => {
  const noAuthUser = !currentAuthUser;

  const {
    isLoading,
    allMembersData,
  } = useGetAllMembers({
    isAuthenticated: !noAuthUser,
    useTestData
  });

  const isAdmin = Boolean(currentAuthUser && ADMIN_USER_EMAIL_LIST.includes(currentAuthUser.email));

  const handleNavigateToMemberContent = useCallback(() => {
    navigate('/members');
  }, []);

  return (
    <>
      <StyledRoot>
        <div className="paddingContainer">
          <h2>Member list</h2>

          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              marginY={8}
              width="100%"
            >
              <CircularProgress size={64} />
            </Box>
          ) : (
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
                data={allMembersData}
                isAdmin={isAdmin}
                noAuthUser={noAuthUser}
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
    </>
  );
};

export default MembersListContent;
