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
import WhereWeHaveBeen from '../../about/WhereWeHaveBeen';

// Local Typings
interface Props {
  currentAuthUser: TfaaAuthUser | null;
}

// Flip this to test with fake Member data in local development
const useTestData = false;

// Component Definition
const MemberContent: React.FC<Props> = ({ currentAuthUser }) => {
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
    if (currentAuthUser && allMembersData && allMembersData.length > 0 && !currentMemberData) {
      const currentMember = allMembersData.find(
        // We used to use authUser.uid as the unique key in the Firestore
        // Now we use authUser.email
        // We have to search for both for backwards compatibility
        (user) => {
          console.log('user', user);

          return user.userId === currentAuthUser.uid || user.userId === currentAuthUser.email;
        });

      setCurrentMemberData(currentMember ?? null);
    }
  }, [currentAuthUser, currentMemberData, isLoading]);

  if (isLoading) {
    return <CircularProgress />;
  }

  const isAdmin = Boolean(currentAuthUser && ADMIN_USER_EMAIL_LIST.includes(currentAuthUser.email));

  return (
    <>
      <MemberContentBanner />

      <WelcomeBanner
        currentAuthUser={currentAuthUser}
        fullName={getFullName(currentMemberData)}
        isAdmin={isAdmin}
      />

      <MemberInfo
        authUserEmail={currentAuthUser?.email || currentMemberData?.Email}
        currentMemberData={currentMemberData}
        isAdmin={isAdmin}
        onUpdateShouldRefetchUserList={handleUpdateShouldRefetchUserList}
      />

      <WhereWeHaveBeen color="membership" />
    </>
  );
};

export default MemberContent;
