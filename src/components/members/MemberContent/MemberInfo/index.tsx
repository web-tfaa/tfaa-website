// External Dependencies
import React from 'react';
import styled from 'styled-components';

// Internal Dependencies
import {
  TMAC_WEB_ADMIN_EMAIL_LIST,
  TMAC_WEB_EXECUTIVE_SECRETARY,
} from '../../../../utils/member-constants';
import { TfaaMemberData } from '../../../../utils/hooks/useGetAllMembers';
import Motifs from '../../../shared/Motifs';
import MemberActions from './MemberActions';
import MemberContactInfo from './MemberContactInfo';
import MemberRegistrationTasks from './MemberRegistrationTasks';
import MemberStatus from './MemberStatus';
import AdminActions from './AdminActions';
import { TfaaAuthUser } from '../../../layout';

// Local Typings
interface Props {
  authUserEmail: string | undefined;
  currentAuthUser: TfaaAuthUser | null;
  currentMemberData: TfaaMemberData | null;
  isAdmin: boolean;
  onUpdateShouldRefetchUserList: ((shouldRefetchUserList: boolean) => void) | null;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(12, 8),
  },
  [theme.breakpoints.down('mobile')]: {
    padding: theme.spacing(14, 5),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(14, 5),
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(2),
  },

  '& > div:not(:first-child), & > div:not(:last-child)': {
    marginBottom: theme.spacing(4),
  },

  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  padding: theme.spacing(14, 18),
  position: 'relative',
  width: '100%',
}));


/*
 * This is where all of the interactive member content lives.
 *
 */

// Component Definition
const MemberInfo: React.FC<Props> = ({
  authUserEmail,
  currentAuthUser,
  currentMemberData,
  onUpdateShouldRefetchUserList,
}) => {
  const shouldSeeSponsorListLink = authUserEmail
    && (TMAC_WEB_ADMIN_EMAIL_LIST.includes(authUserEmail)
    || authUserEmail === TMAC_WEB_EXECUTIVE_SECRETARY);

  return (
    <StyledRoot>
      <Motifs small />

      <MemberStatus
        currentAuthUser={currentAuthUser}
        currentMemberData={currentMemberData}
      />

      {currentMemberData && (
        <MemberContactInfo
          currentMemberData={currentMemberData}
        />
      )}

      <MemberRegistrationTasks currentMemberData={currentMemberData} />

      <MemberActions
        authUserEmail={authUserEmail}
        onUpdateShouldRefetchUserList={onUpdateShouldRefetchUserList}
      />

      {shouldSeeSponsorListLink && <AdminActions />}
    </StyledRoot>
  );
};

export default MemberInfo;
