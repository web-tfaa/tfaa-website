// External Dependencies
import React, { Component } from 'react';
import Helmet from 'react-helmet';

// Internal Dependencies
import Container from '../shared/container';
import NonMemberContent from './non-member-content';
import SidebarBody from '../shared/sidebar/sidebar-body';
import Status from './status';
import presets from '../../utils/presets';
import { firebase } from '../../firebase';

// Sidebar data
import membersSidebar from '../../pages/members/members-links.yml';

// Component Definition
class Members extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  render() {
    const {
      authUser,
    } = this.state;

    const isAuthenticated = Boolean(authUser);

    const membersContent = (
      <div>
        So much good stuff for the members!
        <div
          css={{
            display: `block`,
            [presets.Tablet]: {
              display: `none`,
            },
          }}
        >
          <hr css={{
            border: 0,
            height: 2,
            marginTop: 10,
          }} />
          <SidebarBody inline yaml={membersSidebar} />
        </div>
      </div>
    );

    return (
      <div css={{
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
          {isAuthenticated ? membersContent : <NonMemberContent />}
        </Container>
      </div>
    );
  }
}

export default Members;
