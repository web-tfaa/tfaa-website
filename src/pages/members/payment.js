// External Dependencies
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Internal Dependencies
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import Status from './status';
import presets from '../../utils/presets';
import { firebase } from '../../firebase';

// Sidebar Data
import SidebarBody from '../../components/shared/sidebar/sidebar-body';
import membersSidebar from './members-links.yml';

// Component Definition
class Payment extends Component {
  static propTypes = {
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
    if (this.activeComponent) {
      if (typeof window !== 'undefined') {
        this.auth = firebase.auth();
      }

      this.auth.onAuthStateChanged(authUser =>
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
    const { location } = this.props;
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
              <title>TMAC | Payment</title>
            </Helmet>

            <h2>3. Pay TMAC Dues</h2>

            <hr css={{ background: 'darkred', height: 3 }} />

            <div>Radio buttons for active/retired</div>

            <div style={{ marginTop: '1.5rem' }}>
              * Registration is not complete until payment is received.
            </div>
          </Container>

          <div
            css={{
              display: `block`,
              [presets.Tablet]: {
                display: `none`,
              },
            }}>
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
      </Layout>
    );
  }
}

export default Payment;
