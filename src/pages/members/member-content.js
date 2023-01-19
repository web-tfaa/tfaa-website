// External Dependencies
import {
  Box,
  CircularProgress,
} from '@mui/material';
import { Link } from 'gatsby-theme-material-ui';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';

// Internal Dependencies
import {
  ADMIN_USER_EMAIL_LIST,
  TMAC_WEB_EXECUTIVE_SECRETARY,
  TMAC_WEB_ADMIN_EMAIL_LIST,
} from '../../utils/member-constants';
import { doGetUsers } from '../../firebase/db';
import Cards from '../../components/shared/cards';
import EnhancedAlert from '../../components/shared/EnhancedAlert';

// Local Dependencies
import MemberFileShareCard from './MemberFileShareCard';
import MemberInfo from './member-info';
import MemberTasks from './member-tasks';

// Sidebar Data
import membersSidebar from './members-links.yml';
import MobileDivider from '../../components/shared/MobileDivider';
import SidebarBody from '../../components/shared/sidebar/SidebarBody';

// Local Variables
const propTypes = {
  authUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
  }),
  contentfulFileShareData: PropTypes.arrayOf(PropTypes.shape({})),
  contentfulFileShareDescriptionData: PropTypes.arrayOf(PropTypes.shape({})),
  currentMemberList: PropTypes.arrayOf(PropTypes.shape({})),
  memberEmail: PropTypes.string,
  setShouldRefetchUserList: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

const defaultProps = {
  authUser: null,
  contentfulFileShareData: null,
  contentfulFileShareDescriptionData: null,
  currentMemberList: null,
  userId: null,
};

// Component Definition
const MemberContent = ({
  authUser,
  contentfulFileShareData,
  contentfulFileShareDescriptionData,
  currentMemberList,
  memberEmail,
  setShouldRefetchUserList,
  userId,
}) => {
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const [allUsersData, setAllUsersData] = useState([]);
  const [currentMemberData, setCurrentMemberData] = useState(null);

  console.log('MemberContent : currentMemberData', currentMemberData);

  const handleUpdateUserList = (userList) => {
    setAllUsersData(userList);
  };

  useEffect(() => {
    if (allUsersData.length < 1) {
      const userList = [];

      doGetUsers('registration', userList, handleUpdateUserList);
    }
  }, [allUsersData.length]);

  useEffect(() => {
    if (authUser && isLoadingUserData) {
      setIsLoadingUserData(!isLoadingUserData);
    }
  }, [authUser, isLoadingUserData]);

  useEffect(() => {
    if (allUsersData.length > 0 && !currentMemberData) {
      const currentMember = allUsersData.find(
        // We used to use authUser.uid as the unique key in the Firestore
        // Now we use authUser.email
        // We have to search for both for backwards compatibility
        (user) => user.userId === authUser.uid || user.userId === authUser.email,
      );

      setCurrentMemberData(currentMember);
    }
  }, [allUsersData, authUser.email, authUser.uid, currentMemberData]);

  const isRegisteredForCurrentYear = useMemo(
    () =>
      (!currentMemberList?.length ? false
        : currentMemberList?.some(
          (member) => member.userId === userId || member.email === userId,
        )),
    [currentMemberList, userId]
  );

  if (isLoadingUserData) {
    return (
      <CircularProgress
        size={64}
        thickness={4}
      />
    );
  }

  const isAdmin = authUser && ADMIN_USER_EMAIL_LIST.includes(authUser.email);

  const shouldSeeSponsorListLink = authUser
    && (TMAC_WEB_ADMIN_EMAIL_LIST.includes(authUser.email)
    || authUser.email === TMAC_WEB_EXECUTIVE_SECRETARY);

  return (
    <div>
      <h2>{`${isAdmin ? 'Admin ' : ''}Member Dashboard`}</h2>

      <Box mb={2}>
        <EnhancedAlert severity="info">
          {`Welcome ${memberEmail}`}
        </EnhancedAlert>
      </Box>

      <Cards>
        <MemberInfo
          currentUser={currentMemberData}
          isRegisteredForCurrentYear={isRegisteredForCurrentYear}
          memberEmail={memberEmail}
          setShouldRefetchUserList={setShouldRefetchUserList}
        />

        <MemberTasks
          currentUser={currentMemberData}
          isRegisteredForCurrentYear={isRegisteredForCurrentYear}
        />
      </Cards>

      <h2>For Members</h2>

      <Cards>
        {contentfulFileShareData
          && contentfulFileShareData.map((edge, index) => (
            <MemberFileShareCard
              description={
                contentfulFileShareDescriptionData
                  ? contentfulFileShareDescriptionData[index].node.description
                  : null
              }
              key={edge.node.id}
              node={edge.node}
            />
          ))}
      </Cards>

      {shouldSeeSponsorListLink
        ? (
          <Box
            component="p"
            mt={4}
          >
            View the <Link to="/members/sponsor-list">Sponsors</Link> for this year.
          </Box>
        ) : null}

      <MobileDivider>
        <SidebarBody
          inline
          yaml={membersSidebar}
        />
      </MobileDivider>
    </div>
  );
};

MemberContent.propTypes = propTypes;
MemberContent.defaultProps = defaultProps;

export default MemberContent;
