// External Dependencies
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby-theme-material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { isTodayAfterJuly31st } from '../../utils/helpers';
import ArrowForwardIcon from '../../components/shared/ArrowForwardIcon';
import AuthUserContext from '../../components/session/AuthUserContext';
import CardHeadline from '../../components/shared/cards/card-headline';
import Container from '../../components/shared/container';
import CtaButton from '../../components/masthead/cta-button';
import EnhancedAlert from '../../components/shared/EnhancedAlert';
import FuturaDiv from '../../components/shared/futura-div';
import Layout from '../../components/layout';

// Sidebar Data
import MobileDivider from '../../components/shared/MobileDivider';
import SidebarBody from '../../components/shared/sidebar/SidebarBody';
import membersSidebar from './members-links.yml';

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.bottomContent': {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  '.strong': {
    fontWeight: 600,
  },

  '.topContent': {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
  },

  paddingLeft: 0,
  width: '0 auto',
}));

// Component Definition
const JoinContainer = ({ location }) => {
  return (
    <Layout location={location}>
      <StyledRoot>
        <Container>
          <Helmet>
            <title>TMAC | Join TMAC</title>
          </Helmet>

          <div className="topContent">
            <CardHeadline>Join TMAC</CardHeadline>

            {!isTodayAfterJuly31st
              ? (
                <Box mt={3}>
                  <EnhancedAlert title="Membership Notice">
                    TMAC Membership will open up again on August 1st.
                  </EnhancedAlert>
                </Box>
              ) : (
                <>
            <FuturaDiv>
              To join TMAC please complete these three steps:
            </FuturaDiv>

            <FuturaDiv>
              <span className="strong">
                1.
                {' '}
              </span>
              Sign up for a TMAC website login.
            </FuturaDiv>

            <FuturaDiv>
              <span className="strong">
                2.
                {' '}
              </span>
              Complete the Membership Form.
            </FuturaDiv>

            <FuturaDiv>
              <span className="strong">
                3.
                {' '}
              </span>
              Pay dues online using PayPal (or mail invoice with check via mail).
            </FuturaDiv>

            <p>
              Note: Sponsors should complete the
              {' '}
              <Link to="/sponsors">Sponsor Form</Link>
              .
            </p>
            </>
              )}
          </div>

          {isTodayAfterJuly31st && (
            <>
              <div className="bottomContent">
                <CtaButton
                  buttonColor="blue"
                  to="/members/register"
                >
                  Begin Membership
                  <ArrowForwardIcon />
                </CtaButton>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                * Membership is not complete until payment is received.
              </div>
            </>
          )}
        </Container>

        <MobileDivider>
          <SidebarBody
            inline
            yaml={membersSidebar}
          />
        </MobileDivider>
      </StyledRoot>
    </Layout>
  );
};

JoinContainer.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

const JoinContainerWithContext = (props) => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <JoinContainer
        {...props}
        isAuthenticated={!!authUser}
      />
    )}
  </AuthUserContext.Consumer>
);

export default JoinContainerWithContext;
