// External Dependencies
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';

// Internal Dependencies
import { TfaaAuthUser } from '../../layout';
import { TfaaMemberData, useGetAllMembers } from '../../../utils/hooks/useGetAllMembers';
import { getFullName } from '../../../utils/getFullName';
import MemberContentBanner from './MemberContentBanner';
import WelcomeBanner from './WelcomeBanner';

// Local Typings
interface Props {
  authUser: TfaaAuthUser | null;
}

// Flip this to test with fake Member data in local development
const useTestData = true;

// Component Definition
const MemberContent: React.FC<Props> = ({ authUser }) => {
  const [
    currentMemberData,
    setCurrentMemberData,
  ] = useState<TfaaMemberData | null>(null);

  const {
    allMembersData,
    isLoading,
  } = useGetAllMembers({ useTestData });

  useEffect(() => {
    if (authUser && allMembersData && allMembersData.length > 0 && !currentMemberData) {
      const currentMember = allMembersData.find(
        // We used to use authUser.uid as the unique key in the Firestore
        // Now we use authUser.email
        // We have to search for both for backwards compatibility
        (user) => user.userId === authUser.uid || user.userId === authUser.email,
      );

      setCurrentMemberData(currentMember ?? null);
    }
  }, [authUser, currentMemberData, isLoading]);

  if (isLoading) {
    return <CircularProgress />;
  }

  console.log('MemberContent : allMembersData', authUser, allMembersData);

  const isRegisteredForCurrentYear = Boolean(currentMemberData);

  console.log('isRegisteredForCurrentYear', isRegisteredForCurrentYear);

  return (
    <>
      <MemberContentBanner />

      <WelcomeBanner
        authUser={authUser}
        fullName={getFullName(currentMemberData)}
      />
    </>
  );
};

export default MemberContent;
