// External Dependencies
import ArrowForwardIcon from 'react-icons/lib/md/arrow-forward';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Internal Dependencies
import CardHeadline from '../../components/shared/cards/card-headline';
import Container from '../../components/shared/container';
import CtaButton from '../../components/masthead/cta-button';
import Firebase from '../../firebase';
import FuturaDiv from '../../components/shared/futura-div';
import Layout from '../../components/layout';
import presets from '../../utils/presets';
import Status from './status';

// Sidebar Data
import SidebarBody from '../../components/shared/sidebar/sidebar-body';
import membersSidebar from './members-links.yml';

// Local Variables
const boldStyles = { fontWeight: 600 };

// Component Definition
class JoinContainer extends Component {
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
              <title>TMAC | Join TMAC</title>
            </Helmet>

            <div
              css={{
                display: 'flex',
                flexDirection: 'column',
                padding: 32,
              }}>
              <CardHeadline>Join TMAC</CardHeadline>
              <FuturaDiv>
                To join TMAC please complete these three steps:
              </FuturaDiv>
              <FuturaDiv>
                <span css={boldStyles}>1.</span> Sign up for a TMAC website
                login.
              </FuturaDiv>
              <FuturaDiv>
                <span css={boldStyles}>2.</span> Complete the Registration Form.
              </FuturaDiv>
              <FuturaDiv>
                <span css={boldStyles}>3.</span> Pay dues online using PayPal (or mail invoice with  check via mail).
              </FuturaDiv>
            </div>

            <div
              css={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
              <CtaButton to="/members/register">
                <span css={{ verticalAlign: `middle` }}>
                  Begin Registration
                </span>
                <ArrowForwardIcon
                  css={{
                    verticalAlign: `baseline`,
                    marginLeft: `.6em`,
                  }}
                />
              </CtaButton>
            </div>

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

export default JoinContainer;
