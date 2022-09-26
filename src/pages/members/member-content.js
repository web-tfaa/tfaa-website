// External Dependencies
import {
  Box,
  CircularProgress,
} from '@material-ui/core';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';

// Internal Dependencies
import EnhancedAlert from '../../components/shared/EnhancedAlert';
import Cards from '../../components/shared/cards';
import presets from '../../utils/presets';
import { ADMIN_USER_EMAIL_LIST, TMAC_WEB_ADMIN_EMAIL_LIST } from '../../utils/member-constants';

// Local Dependencies
import MemberFileShareCard from './MemberFileShareCard';
import MemberInfo from './member-info';
import MemberTasks from './member-tasks';

// Sidebar Data
import membersSidebar from './members-links.yml';
import SidebarBody from '../../components/shared/sidebar/SidebarBody';

// Local Variables
const propTypes = {
  authUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
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

  useEffect(() => {
    if (authUser) {
      setIsLoadingUserData(!isLoadingUserData);
    }
  }, [authUser]);

  const isRegisteredForCurrentYear = useMemo(() =>
    (!currentMemberList?.length ? false
      : currentMemberList?.some(
        (member) => member.userId === userId,
      )),
  [currentMemberList, userId]);

  const currentUser = currentMemberList?.find(
    (member) => member.userId === userId,
  );

  if (isLoadingUserData) {
    return <CircularProgress size={64} thickness={4} />;
  }

  const isAdmin = authUser && ADMIN_USER_EMAIL_LIST.includes(authUser.email);
  const isTMACWebAdmin = authUser && TMAC_WEB_ADMIN_EMAIL_LIST.includes(authUser.email);

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
          currentUser={currentUser}
          isRegisteredForCurrentYear={isRegisteredForCurrentYear}
          setShouldRefetchUserList={setShouldRefetchUserList}
        />

        <MemberTasks
          currentUser={currentUser}
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

      {isTMACWebAdmin
        ? (
          <Box component="p" mt={4}>
            View the <Link to="/members/sponsor-list">Sponsors</Link> for this year.
          </Box>
        ) : null}

      <div
        css={{
          display: 'block',
          [presets.Tablet]: {
            display: 'none',
          },
        }}
      >
        <hr
          css={{
            border: 0,
            height: 2,
            marginTop: 10,
          }}
        />
        <SidebarBody inline yaml={membersSidebar} />
      </div>
    </div>
  );
};

MemberContent.propTypes = propTypes;
MemberContent.defaultProps = defaultProps;

export default MemberContent;
