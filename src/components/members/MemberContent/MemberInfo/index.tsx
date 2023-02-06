// External Dependencies
import React from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { TfaaMemberData } from '../../../../utils/hooks/useGetAllMembers';
import Motifs from '../../../shared/Motifs';
import MemberActions from './MemberActions';
import MemberContactInfo from './MemberContactInfo';
import MemberRegistrationTasks from './MemberRegistrationTasks';
import MemberStatus from './MemberStatus';

// Local Typings
interface Props {
  authUserEmail: string | undefined;
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
  currentMemberData,
  onUpdateShouldRefetchUserList,
}) => {
  return (
    <StyledRoot>
      <Motifs small />

      <MemberStatus currentMemberData={currentMemberData} />

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
    </StyledRoot>
  );
};

export default MemberInfo;
