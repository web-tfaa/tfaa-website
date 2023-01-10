// External Dependencies
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

// Internal Dependencies
// import { isTodayAfterJune30th } from '../../utils/helpers';
import ArrowForwardIcon from '../../components/shared/ArrowForwardIcon';
import AuthUserContext from '../../components/session/AuthUserContext';
import CardHeadline from '../../components/shared/cards/card-headline';
import Container from '../../components/shared/container';
import CtaButton from '../../components/masthead/cta-button';
// import EnhancedAlert from '../../components/shared/EnhancedAlert';
import FuturaDiv from '../../components/shared/futura-div';
import Layout from '../../components/layout';
import presets from '../../utils/presets';
import Status from '../members/status';
import MobileDivider from '../../components/shared/MobileDivider';

// Local Variables
const StyledRoot = styled.div(({ $isAuthenticated }) => ({
  '.strong': {
    fontWeight: 600,
  },

  [presets.Tablet]: {
    paddingLeft: !$isAuthenticated ? '1.5rem' : 0,
  },

  paddingLeft: 0,
  width: '0 auto',
}));

// Component Definition
const SponsorInfo = ({
  isAuthenticated,
  location,
}) => (
  <Layout location={location}>
    <StyledRoot $isAuthenticated={isAuthenticated}>
      <Status />

      <Container>
        <Helmet>
          <title>TMAC | Sponsor Information</title>
        </Helmet>

        <Box
          display="flex"
          flexDirection="column"
          padding={4}
        >
          <CardHeadline>Sponsor TMAC</CardHeadline>

          {/* {!isTodayAfterJune30th
            ? (
              <Box mt={3}>
                <EnhancedAlert title="Sponsorship Notice">
                  TMAC Sponsorship will open up again on July 1st.
                </EnhancedAlert>
              </Box>
            ) : (
              <> */}
          <FuturaDiv>
            To become a TMAC sponsor please complete these three steps:
          </FuturaDiv>

          <FuturaDiv>
            <span className="strong">
              1.{' '}
            </span>
            Sign up for a TMAC website login.
          </FuturaDiv>

          <FuturaDiv>
            <span className="strong">
              2.{' '}
            </span>
            Complete the Sponsorship Form.
          </FuturaDiv>

          <FuturaDiv>
            <span className="strong">
              3.{' '}
            </span>
            To pay, mail invoice with check to the TMAC Treasurer.
          </FuturaDiv>
          {/* </>
            )} */}
        </Box>

        {/* {isTodayAfterJune30th && (
        <> */}
        <Box
          display="flex"
          justifyContent="flex-end"
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
        </Box>

        <div style={{ marginTop: '1.5rem' }}>
          * Sponsorship is not complete until payment is received.
        </div>
        {/* </>
        )} */}
      </Container>

      <MobileDivider />
    </StyledRoot>
  </Layout>
);

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
