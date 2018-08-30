// External Dependencies
import Helmet from 'react-helmet';
import React, { Component } from 'react';
import { graphql } from 'gatsby';

// Internal Dependencies
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import MemberContent from './member-content';
import NonMemberContent from './non-member-content';
import presets from '../../utils/presets';
import Status from './status';
import { firebase } from '../../firebase';

// Component Definition
class Members extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(
      authUser =>
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null })),
    );
  }

  render() {
    const { authUser } = this.state;

    const isAuthenticated = Boolean(authUser);

    return (
      <Layout location={this.props.location}>
        <div
          css={{
            paddingLeft: 0,
            width: `0 auto`,
            [presets.Tablet]: {
              paddingLeft: !isAuthenticated ? '1.5rem' : 0,
            },
          }}>
          <Status authUser={authUser} />
          <Container>
            <Helmet>
              <title>TMAC | Members</title>
            </Helmet>
            {isAuthenticated ? (
              <MemberContent
                memberEmail={authUser.email}
                contentfulFileShareData={
                  this.props.data.allContentfulFileShare.edges
                }
                contentfulFileShareDescriptionData={
                  this.props.data.allContentfulFileShareDescriptionTextNode
                    .edges
                }
              />
            ) : (
              <NonMemberContent />
            )}
          </Container>
        </div>
      </Layout>
    );
  }
}

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
