// External Dependencies
import { Link } from 'gatsby-theme-material-ui';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Internal Dependencies
import {
  ADMIN_USER_EMAIL_LIST,
  TMAC_WEB_EXECUTIVE_SECRETARY,
  TMAC_WEB_ADMIN_EMAIL_LIST,
} from '../../utils/member-constants';
import Cards from '../../components/shared/cards';
import EnhancedAlert from '../../components/shared/EnhancedAlert';

// Local Dependencies
import MemberActions from './MemberActions';
import MemberFileShareCard from './MemberFileShareCard';
import MemberInfo from './member-info';
import MemberStatus from '../../components/members/MemberContent/MemberInfo/MemberStatus';
import RegistrationTasks from './RegistrationTasks';

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
  isLoading: PropTypes.bool.isRequired,
  memberEmail: PropTypes.string,
  setShouldRefetchUserList: PropTypes.func.isRequired,
};

const defaultProps = {
  authUser: null,
  contentfulFileShareData: null,
  contentfulFileShareDescriptionData: null,
  currentMemberList: null,
};

// Component Definition
const MemberContent = ({
  authUser,
  contentfulFileShareData,
  contentfulFileShareDescriptionData,
  currentMemberList,
  isLoading,
  memberEmail,
  setShouldRefetchUserList,
}) => {
  const [currentMemberData, setCurrentMemberData] = useState(null);

  useEffect(() => {
    if (authUser && currentMemberList?.length > 0 && !currentMemberData) {
      const currentMember = currentMemberList.find(
        // We used to use authUser.uid as the unique key in the Firestore
        // Now we use authUser.email
        // We have to search for both for backwards compatibility
        (user) => user.userId === authUser.uid || user.userId === authUser.email,
      );

      setCurrentMemberData(currentMember);
    }
  }, [authUser, currentMemberData, currentMemberList, isLoading]);

  const isRegisteredForCurrentYear = Boolean(currentMemberData);

  if (isLoading) {
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
    <Collapse in={!isLoading}>
      <h2>{`${isAdmin ? 'Admin ' : ''}Member Dashboard`}</h2>

      <Box mb={2}>
        <EnhancedAlert severity="info">
          {`Welcome ${memberEmail}`}
        </EnhancedAlert>
      </Box>

      <Cards>
        <MemberStatus
          currentMemberData={currentMemberData}
          isRegisteredForCurrentYear={isRegisteredForCurrentYear}
        />

        {currentMemberData && (
          <MemberInfo
            currentMemberData={currentMemberData}
            memberEmail={memberEmail}
          />
        )}

        <RegistrationTasks
          currentMemberData={currentMemberData}
          isRegisteredForCurrentYear={isRegisteredForCurrentYear}
        />

        <MemberActions
          memberEmail={memberEmail}
          setShouldRefetchUserList={setShouldRefetchUserList}
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
    </Collapse>
  );
};

MemberContent.propTypes = propTypes;
MemberContent.defaultProps = defaultProps;

export default MemberContent;
