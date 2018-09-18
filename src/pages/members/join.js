// External Dependencies
import ArrowForwardIcon from 'react-icons/lib/md/arrow-forward';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';
import CardHeadline from '../../components/shared/cards/card-headline';
import Container from '../../components/shared/container';
import CtaButton from '../../components/masthead/cta-button';
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
const JoinContainer = (props) => {
  const {
    isAuthenticated,
    location,
  } = props;

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
            <p>Note: Sponsors do <em>not</em> need to register here. Please head over to the <Link to="/sponsors">Sponsors page</Link> for more information.</p>
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
};
JoinContainer.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.shape({}).isRequired,
};

const JoinContainerWithContext = (props) => (
  <AuthUserContext.Consumer>
    {authUser => <JoinContainer {...props} isAuthenticated={!!authUser} />}
  </AuthUserContext.Consumer>
);

export default JoinContainerWithContext;
