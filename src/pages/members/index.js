// External Dependencies
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import MemberContent from './member-content';
import NonMemberContent from './non-member-content';
import presets from '../../utils/presets';
import Status from './status';

// Component Definition
const MembersContent = (props) => {
  const {
    authUser,
    data,
    location,
  } = props;

  const isAuthenticated = Boolean(authUser);

  return (
    <Layout location={location}>
      <div
        css={{
          paddingLeft: 0,
          width: `0 auto`,
          [presets.Tablet]: {
            paddingLeft: !isAuthenticated ? '1.5rem' : 0,
          },
        }}>
        <Status />
        <Container>
          <Helmet>
            <title>TMAC | Members</title>
          </Helmet>
          {isAuthenticated ? (
            <MemberContent
              memberEmail={authUser.email}
              contentfulFileShareData={
                data.allContentfulFileShare.edges
              }
              contentfulFileShareDescriptionData={
                data.allContentfulFileShareDescriptionTextNode
                  .edges
              }
            />
          ) : <NonMemberContent />}
        </Container>
      </div>
    </Layout>
  );
};
MembersContent.propTypes = {
  authUser: PropTypes.shape({}),
  data: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

MembersContent.defaultProps = {
  authUser: null,
};

const Members = (props) => (
  // eslint-disable-next-line
  <Layout location={props.location}>
    <MembersWithContext {...props} />
  </Layout>
  );

const MembersWithContext = (props) => (
  <AuthUserContext.Consumer>
    {authUser => <MembersContent {...props} authUser={authUser} />}
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
