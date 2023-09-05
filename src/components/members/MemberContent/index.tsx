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
import usePrevious from '../../../utils/hooks/usePrevious';

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
  const [
    refetchCurrentMemberData,
    setRefetchCurrentMemberData,
  ] = useState<boolean>(false);

  // console.log('MemberContent → currentMemberData', refetchCurrentMemberData, currentMemberData);

  const {
    allMembersData,
    handleUpdateShouldRefetchUserList,
    isLoading,
  } = useGetAllMembers({ useTestData });

  // We need to check if the MemberType or IsRegisteredForFallConference
  //  values are updated when the allMembersData changes.
  // If so, we need to update the currentMemberData.
  const previousIsLoading = usePrevious(isLoading);

  const finishedLoading = Boolean(previousIsLoading && !isLoading);

  // console.log('logic...', !currentMemberData || refetchCurrentMemberData || finishedLoading);

  useEffect(() => {
    if (currentAuthUser && allMembersData && allMembersData.length > 0
      && (!currentMemberData || refetchCurrentMemberData
        || finishedLoading)) {
      const currentMember = allMembersData.find(
        // We use a combination of email and uid to uniquely identify a user.
        // The email part makes it easier to find a user in the Firestore database.
        (user) => {
          return user.userId === `${currentAuthUser.email}-${currentAuthUser.uid}`;
        });

      setCurrentMemberData(currentMember ?? null);

      if (refetchCurrentMemberData) {
        setRefetchCurrentMemberData(false);
      }
    }
  }, [
    allMembersData,
    currentAuthUser,
    currentMemberData,
    isLoading,
    refetchCurrentMemberData,
  ]);

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
        onSetRefetchCurrentMemberData={setRefetchCurrentMemberData}
        onUpdateShouldRefetchUserList={handleUpdateShouldRefetchUserList}
      />

      <FooterTopper color="membership" />
    </>
  );
};

export default MemberContent;
