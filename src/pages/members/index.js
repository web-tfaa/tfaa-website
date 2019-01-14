// External Dependencies
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql } from 'gatsby';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import MemberContent from './member-content';
import NonMemberContent from './non-member-content';
import Status from './status';
import presets from '../../utils/presets';
import { doGetUsers } from '../../firebase/db';

// Component Definition
class MembersContent extends Component {
  static propTypes = {
    authUser: PropTypes.shape({}),
    data: PropTypes.shape({}).isRequired,
    location: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    authUser: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      userData: [],
    };
  }

  componentDidMount() {
    const userList = [];

    doGetUsers('registration', userList, this.handleUpdateUserList);
  }

  handleUpdateUserList = (userList) => {
    this.setState({ userData: userList });
  };

  render() {
    const {
      authUser,
      data,
    } = this.props;

    const {
      userData,
    } = this.state;

    const isAuthenticated = Boolean(authUser);

    return (
      <div
        css={{
          paddingLeft: 0,
          width: '0 auto',
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
              contentfulFileShareData={
                data.allContentfulFileShare.edges
              }
              contentfulFileShareDescriptionData={
                data.allContentfulFileShareDescriptionTextNode.edges
              }
              memberEmail={authUser.email}
              userData={userData}
              userId={authUser.uid}
            />
          ) : <NonMemberContent />
        }
        </Container>
      </div>
    );
  }
}

const Members = props => (
  // eslint-disapropsline
  <Layout location={props.location}>
    <MembersWithContext {...props} />
  </Layout>
);

const MembersWithContext = props => (
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
