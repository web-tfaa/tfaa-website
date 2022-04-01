// External Dependencies
import { Box } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/styles';

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
import Status from './status';
import presets from '../../utils/presets';

// Sidebar Data
import SidebarBody from '../../components/shared/sidebar/SidebarBody';
import membersSidebar from './members-links.yml';

// // Local Variables
// const useStyles = makeStyles({
//   icon: {
//     transform: 'translateY(8px)',
//     marginLeft: '0.5em',
//   },
// });

const boldStyles = { fontWeight: 600 };

// Component Definition
const JoinContainer = (props) => {
  const {
    // isAuthenticated,
    location,
  } = props;
  // const classes = useStyles(props);

  return (
    <Layout location={location}>
      <div
        css={{
          paddingLeft: 0,
          width: '0 auto',
        }}
      >
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
            }}
          >
            <CardHeadline>Join TMAC</CardHeadline>

            {!isTodayAfterJune30th
              ? (
                <Box mt={3}>
                  <EnhancedAlert title="Membership Notice">
                    TMAC Membership will open up again on July 1st.
                  </EnhancedAlert>
                </Box>
              ) : (
                <>
                  <FuturaDiv>
                    To join TMAC please complete these three steps:
                  </FuturaDiv>

                  <FuturaDiv>
                    <span css={boldStyles}>
                      1.
                      {' '}
                    </span>
                    Sign up for a TMAC website login.
                  </FuturaDiv>

                  <FuturaDiv>
                    <span css={boldStyles}>
                      2.
                      {' '}
                    </span>
                    Complete the Membership Form.
                  </FuturaDiv>

                  <FuturaDiv>
                    <span css={boldStyles}>
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
          <SidebarBody inline yaml={membersSidebar} />
        </div>
      </div>
    </Layout>
  );
};
JoinContainer.propTypes = {
  // isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.shape({}).isRequired,
};

const JoinContainerWithContext = (props) => (
  <AuthUserContext.Consumer>
    {(authUser) => <JoinContainer {...props} isAuthenticated={!!authUser} />}
  </AuthUserContext.Consumer>
);

export default JoinContainerWithContext;
