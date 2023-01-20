// External Dependencies
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import MemberContent from './member-content';
import NonMemberContent from './non-member-content';
import Status from './status';
import presets from '../../utils/presets';
import { doGetUsers } from '../../firebase/db';

// Local Variables
const propTypes = {
  authUser: PropTypes.shape({
    email: PropTypes.string,
    uid: PropTypes.string,
  }),
  data: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

const defaultProps = {
  authUser: null,
};

const StyledRoot = styled.div(({ $isAuthenticated, theme }) => ({
  paddingLeft: 0,
  width: '0 auto',
  [presets.Tablet]: {
    paddingLeft: !$isAuthenticated ? theme.spacing(3) : 0,
  },
}));

// Component Definition
const MembersHome = ({
  authUser,
  data,
}) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRefetchUserList, setShouldRefetchUserList] = useState(false);

  const handleUpdateUserData = useCallback((updatedUserData) => {
    setUserData(updatedUserData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const userList = [];

    if (authUser || shouldRefetchUserList) {
      doGetUsers('registration', userList, handleUpdateUserData);

      if (shouldRefetchUserList) {
        setShouldRefetchUserList(false);
      }
    }
  }, [
    authUser,
    setUserData,
    shouldRefetchUserList,
    setShouldRefetchUserList,
    handleUpdateUserData,
  ]);

  const isAuthenticated = Boolean(authUser);

  return (
    <StyledRoot $isAuthenticated={isAuthenticated}>
      <Status />

      <Container>
        <Helmet>
          <title>TMAC | Members</title>
        </Helmet>

        {isAuthenticated ? (
          <MemberContent
            authUser={authUser}
            contentfulFileShareData={
              data.allContentfulFileShare.edges
            }
            contentfulFileShareDescriptionData={
              data.allContentfulFileShareDescriptionTextNode.edges
            }
            currentMemberList={userData}
            isLoading={isLoading}
            memberEmail={authUser.email}
            setShouldRefetchUserList={setShouldRefetchUserList}
          />
        ) : (
          <NonMemberContent />
        )}
      </Container>
    </StyledRoot>
  );
};

MembersHome.propTypes = propTypes;
MembersHome.defaultProps = defaultProps;

const Members = (props) => {
  const { location } = props;
  return (
    // eslint-disapropsline
    <Layout location={location}>
      <MembersWithContext
        {...props}
      />
    </Layout>
  );
};

Members.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

const MembersWithContext = (props) => (
  <AuthUserContext.Consumer>
    {(authUser) => {
      return (
        <MembersHome
          {...props}
          authUser={authUser}
        />
      );
    }}
  </AuthUserContext.Consumer>
);

export default Members;

export const pageQuery = graphql`
  query MemberContent {
    allContentfulFileShare(filter: { node_locale: { eq: "en-US" } }) {
      edges {
        node {
          id
          date
          link
          title
          slug
          createdAt(formatString: "MMMM DD, YYYY")
        }
      }
    }
    allContentfulFileShareDescriptionTextNode {
      edges {
        node {
          description
        }
      }
    }
    allContentfulAsset {
      edges {
        node {
          file {
            url
            fileName
            contentType
          }
        }
      }
    }
  }
`;
