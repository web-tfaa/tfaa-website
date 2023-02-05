// External Dependencies
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';

// Internal Dependencies
import { ADMIN_USER_EMAIL_LIST } from '../../../utils/member-constants';
import { TfaaAuthUser } from '../../layout';
import { TfaaMemberData, useGetAllMembers } from '../../../utils/hooks/useGetAllMembers';
import { getFullName } from '../../../utils/getFullName';
import MemberContentBanner from './MemberContentBanner';
import WelcomeBanner from './WelcomeBanner';
import MemberInfo from './MemberInfo';

// Local Typings
interface Props {
  authUser: TfaaAuthUser | null;
}

// Flip this to test with fake Member data in local development
const useTestData = false;

// Component Definition
const MemberContent: React.FC<Props> = ({ authUser }) => {
  const [
    currentMemberData,
    setCurrentMemberData,
  ] = useState<TfaaMemberData | null>(null);

  const {
    allMembersData,
    handleUpdateShouldRefetchUserList,
    isLoading,
  } = useGetAllMembers({ useTestData });

  useEffect(() => {
    if (authUser && allMembersData && allMembersData.length > 0 && !currentMemberData) {
      const currentMember = allMembersData.find(
        // We used to use authUser.uid as the unique key in the Firestore
        // Now we use authUser.email
        // We have to search for both for backwards compatibility
        (user) => {
          console.log('user', user);

          return user.userId === authUser.uid || user.userId === authUser.email;
        });

      setCurrentMemberData(currentMember ?? null);
    }
  }, [authUser, currentMemberData, isLoading]);

  if (isLoading) {
    return <CircularProgress />;
  }

  const isAdmin = Boolean(authUser && ADMIN_USER_EMAIL_LIST.includes(authUser.email));

  return (
    <>
      <MemberContentBanner />

      <WelcomeBanner
        authUser={authUser}
        fullName={getFullName(currentMemberData)}
        isAdmin={isAdmin}
      />

      <MemberInfo
        authUserEmail={authUser?.email}
        currentMemberData={currentMemberData}
        isAdmin={isAdmin}
        onUpdateShouldRefetchUserList={handleUpdateShouldRefetchUserList}
      />
    </>
  );
};

export default MemberContent;
