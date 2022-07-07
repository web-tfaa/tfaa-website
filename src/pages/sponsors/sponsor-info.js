// External Dependencies
import { Box } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

// Internal Dependencies
import { isTodayAfterJune30th } from '../../utils/helpers';
import ArrowForwardIcon from '../../components/shared/ArrowForwardIcon';
import AuthUserContext from '../../components/session/AuthUserContext';
import CardHeadline from '../../components/shared/cards/card-headline';
import Container from '../../components/shared/container';
import CtaButton from '../../components/masthead/cta-button';
import EnhancedAlert from '../../components/shared/EnhancedAlert';
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

            {!isTodayAfterJune30th
              ? (
                <Box mt={3}>
                  <EnhancedAlert title="Sponsorship Notice">
                    TMAC Sponsorship will open up again on July 1st.
                  </EnhancedAlert>
                </Box>
              ) : (
                <>
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
                    Complete the Sponsorship Form.
                  </FuturaDiv>

                  <FuturaDiv>
                    <span css={boldStyles}>
                      3.{' '}
                    </span>
                    Pay online using PayPal (or mail invoice with check to the TMAC Treasurer).
                  </FuturaDiv>
                </>
              )}
          </div>

          {isTodayAfterJune30th && (
            <>
              <div
                css={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <CtaButton
                  buttonColor="blue"
                  to="/sponsors/register"
                  state={{ level: location && location.state && location.state.level }}
                >
                  <span>
                    Begin Sponsorship
                  </span>
                  <ArrowForwardIcon />
                </CtaButton>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                * Sponsorship is not complete until payment is received.
              </div>
            </>
          )}
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
  location: PropTypes.shape({
    state: PropTypes.shape({
      level: PropTypes.string,
    }),
  }).isRequired,
};

const SponsorInfoWithContext = (props) => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <SponsorInfo
        {...props}
        isAuthenticated={!!authUser}
      />
    )}
  </AuthUserContext.Consumer>
);

export default SponsorInfoWithContext;
