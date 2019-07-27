// External Dependencies
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';
import CardHeadline from '../../components/shared/cards/card-headline';
import Container from '../../components/shared/container';
import CtaButton from '../../components/masthead/cta-button';
import FuturaDiv from '../../components/shared/futura-div';
import Layout from '../../components/layout';
import presets from '../../utils/presets';
import Status from '../members/status';

// Local Variables
const boldStyles = { fontWeight: 600 };

// Component Definition
const SponsorInfo = (props) => {
  const {
    isAuthenticated,
    location,
  } = props;

  return (
    <Layout location={location}>
      <div
        css={{
          paddingLeft: 0,
          width: '0 auto',
          [presets.Tablet]: {
            paddingLeft: !isAuthenticated ? '1.5rem' : 0,
          },
        }}
      >
        <Status />
        <Container>
          <Helmet>
            <title>TMAC | Sponsor Information</title>
          </Helmet>

          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              padding: 32,
            }}
          >
            <CardHeadline>Sponsor TMAC</CardHeadline>
            <FuturaDiv>
              To become a TMAC sponsor please complete these three steps:
            </FuturaDiv>
            <FuturaDiv>
              <span css={boldStyles}>
                1.{' '}
              </span>
                Sign up for a TMAC website login.
            </FuturaDiv>
            <FuturaDiv>
              <span css={boldStyles}>
                2.{' '}
              </span>
              Complete the Sponsor Registration Form.
            </FuturaDiv>
            <FuturaDiv>
              <span css={boldStyles}>
                3.{' '}
              </span>
              Pay online using PayPal (or mail invoice with check to the TMAC Treasurer).
            </FuturaDiv>
          </div>

          <div
            css={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <CtaButton
              to="/sponsors/register"
              state={{ level: location && location.state && location.state.level }}
            >
              <span css={{ verticalAlign: 'middle' }}>
                Begin Sponsor Registration
              </span>
              <ArrowForwardIcon
                css={{
                  verticalAlign: 'baseline',
                  marginLeft: '.6em',
                }}
              />
            </CtaButton>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            * Sponsor Registration is not complete until payment is received.
          </div>
        </Container>

        <div
          css={{
            display: 'block',
            [presets.Tablet]: {
              display: 'none',
            },
          }}
        >
          <hr
            css={{
              border: 0,
              height: 2,
              marginTop: 10,
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

SponsorInfo.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.shape({}).isRequired,
};

const SponsorInfoWithContext = props => (
  <AuthUserContext.Consumer>
    {authUser => <SponsorInfo {...props} isAuthenticated={!!authUser} />}
  </AuthUserContext.Consumer>
);

export default SponsorInfoWithContext;
