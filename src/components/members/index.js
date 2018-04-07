// External Dependencies
import React, { Component } from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import hex2rgba from 'hex2rgba';

// Internal Dependencies
import Container from '../shared/container';
// import LoginForm from './login-form';
// import Status from './status';
import SidebarBody from '../shared/sidebar/sidebar-body';
import presets from '../../utils/presets';
// import firebase from '../../utils/firebase-config';

// Sidebar data
import membersSidebar from '../../pages/members/members-links.yml';

// Local Variables
const texasFlagRed = '#BF0A30';

// Local Styles
const rootStyles = {
  width: `0 auto`,
};

const titleStyles = {
  display: 'inline-block',
  borderBottom: 'solid 1px',
};

const contentStyles = {
  display: 'flex',
};

// Component Definition
class Members extends Component {
  state = {
    username: '',
    password: '',
  };

  handleUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    handleLogin(this.state);
  }

  render() {

    // let membersContent;
    // if (!user) membersContent = <LoginForm />;
    const membersContent = (
      <div>
        <h3 css={titleStyles}>
          Members
        </h3>
        <div css={contentStyles}>
          Our members promote and support music education and music educators through collaboration, networking, and the sharing of best practices so that every child in Texas is assured of receiving quality instruction in the understanding, appreciation, and performance of music.
        </div>
        <div
          css={{
            display: `block`,
            [presets.Tablet]: {
              display: `none`,
            },
          }}
        >
          <hr css={{
            height: 6,
            border: 0,
            boxShadow: `inset 0 12px 12px -12px ${hex2rgba(texasFlagRed, 0.9)}`,
          }} />
          <SidebarBody inline yaml={membersSidebar} />
        </div>
      </div>
    );

    return (
      <div css={rootStyles}>
        {/* <Status /> */}
        <Container>
          <Helmet>
            <title>TMAC | Members</title>
          </Helmet>
          {membersContent}
        </Container>
      </div>
    );
  }
}

const authConfig = {
  email: {
    verifyOnSignup: true, // Sends verification email to user upon sign up
    saveUserInDatabase: true // Saves user in database at /users ref
  },
};

export default Members;
