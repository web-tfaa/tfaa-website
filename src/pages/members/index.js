// External Dependencies
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql } from 'gatsby';

// Internal Dependencies
import Container from '../../components/shared/container';
import Firebase from '../../firebase';
import Layout from '../../components/layout';
import MemberContent from './member-content';
import NonMemberContent from './non-member-content';
import presets from '../../utils/presets';
import Status from './status';

// Component Definition
class Members extends Component {
  static propTypes = {
    data: PropTypes.shape({}).isRequired,
    location: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };

    this.activeComponent = true;
  }

  componentDidMount() {
    this.firebase = new Firebase();

    if (this.activeComponent) {
      this.firebase.auth.onAuthStateChanged(
        authUser =>
          authUser
            ? this.setState(() => ({ authUser }))
            : this.setState(() => ({ authUser: null })),
      );
    }
  }

  componentWillUnmount() {
    this.activeComponent = false;
  }

  render() {
    const {
      data,
      location,
    } = this.props;
    const { authUser } = this.state;

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
          <Status authUser={authUser} />
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
