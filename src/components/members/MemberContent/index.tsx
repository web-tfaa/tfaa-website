// External Dependencies
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';

// Internal Dependencies
import { ADMIN_USER_EMAIL_LIST } from '../../../utils/member-constants';
import { TfaaAuthUser } from '../../layout';
import { TfaaMemberData, useGetAllMembers } from '../../../utils/hooks/useGetAllMembers';
import { getFullName } from '../../../utils/getFullName';
import FooterTopper from '../../footer/FooterTopper';
import MemberContentBanner from './MemberContentBanner';
import WelcomeBanner from './WelcomeBanner';
import MemberInfo from './MemberInfo';

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
        // We use a combination of email and uid to uniquely identify a user.
        // The email part makes it easier to find a user in the database.
        (user) => {
          return user.userId === `${currentAuthUser.email}-${currentAuthUser.uid}`;
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
        currentAuthUser={currentAuthUser}
        currentMemberData={currentMemberData}
        isAdmin={isAdmin}
        onUpdateShouldRefetchUserList={handleUpdateShouldRefetchUserList}
      />

      <FooterTopper color="membership" />
    </>
  );
};

export default MemberContent;
