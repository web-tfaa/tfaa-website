// External Dependencies
import { useEffect, useState } from 'react';

// Internal Dependencies
import { TfaaMemberData, useGetAllMembers } from './useGetAllMembers';
import { useGetAuthUser } from './useGetAuthUser';

// Local Variables
// Flip this to test with fake Member data in local development
const useTestData = false;

// Hook Definition
export const useLoadCurrentMemberData = () => {
  const { currentAuthUser } = useGetAuthUser();

  const [
    currentMemberData,
    setCurrentMemberData,
  ] = useState<TfaaMemberData | null>(null);

  // console.log('useLoadCurrentMemberData •• currentMemberData', currentMemberData);

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
          return user.userId === `${currentAuthUser.email}-${currentAuthUser.uid}`;
        });

      setCurrentMemberData(currentMember ?? null);
    }
  }, [currentAuthUser, currentMemberData, isLoading]);

  return {
    currentMemberData,
    onUpdateShouldRefetchUserList: handleUpdateShouldRefetchUserList,
    isLoading,
  };
};
