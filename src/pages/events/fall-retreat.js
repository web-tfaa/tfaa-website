// External Dependencies
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
// import { Link } from 'gatsby';
import { withStyles } from '@material-ui/core/styles';
import {
  StaticQuery,
  graphql,
} from 'gatsby';

// Internal Dependencies
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import SidebarBody from '../../components/shared/sidebar/sidebar-body';
import presets from '../../utils/presets';

// Sidebar data
import eventsSidebar from './events-links.yml';

// Local Variables
const styles = theme => ({
  adminCard: {
    borderLeft: `4px solid ${theme.palette.secondary.dark}`,
    maxWidth: '75%',
  },
});

const indentStyles = {
  marginLeft: 16,
};

// const scheduleStyles = {
//   margin: '6px 0px 6px 32px',
// };

// Component Definition
export default props => (
  <StaticQuery
    query={graphql`
      query fallRetreatPageQuery {
        allContentfulEvent(
          filter: {
            node_locale: { eq: "en-US" }
          }
        )  {
          edges {
            node {
              titleOfEvent
              dateOfEvent
            }
          }
        }
      }`}
    render={data => (
      withStyles(styles)(<FallRetreat data={data.allContentfulEvent.edges} {...props} />)
    )}
  />
);

const FallRetreat = ({
  classes,
  data,
  location,
}) => {
  const fallRetreat = data.find(e => e.node.titleOfEvent.includes('Fall Retreat')).node;

  return (
    <Layout location={location}>
      <Helmet>
        <title>TMAC | Fall Retreat</title>
      </Helmet>
      <Container>
        <h1>{fallRetreat.titleOfEvent}</h1>

        <section>
          <h4>Who</h4>
          <p css={indentStyles}>
            The TMAC Fall Retreat is open to all current TMAC members who are in
            good standing (registered and paid). There is no separate conference
            registration process.
            {/* {'If you need to register for this year, then please visit the <Link to="/members">Members</Link> page.'} */}
          </p>

          <p css={indentStyles}>
            <Card className={classes.adminCard}>
              <CardContent>
                <Typography variant="h6" component="h6">Membership</Typography>
                <Typography variant="body2">
                  Membership registration for the 2019-2020 academic year will open on July 1, 2019.
                </Typography>
              </CardContent>
            </Card>
          </p>

          {/* <p css={indentStyles}>Preconference Tea and Golf Tournament (Schedule below)</p> */}
          {/* <h5 css={indentStyles}>Alternate Tea details</h5> */}
          {/* <p css={scheduleStyles}>To register for &quot;Alternate Tea&quot; fill out{' '} */}
          {/* <a
              href="#"
              onClick={() => window.open('https://goo.gl/forms/oLVkhwuV0lhs8Okc2', 'Alternate Tea Google Form', 'width=800,height=800,top=120,left=120')}
            >
              this form.
            </a>
          </p> */}
          {/* <div >
            Open Form
          </div> */}
          {/* <p css={scheduleStyles}><em>Lunch is free - provided by <a href="https://www.westmusic.com/" target="_blank" rel="noopener noreferrer">West Music</a></em></p>
          <ul css={scheduleStyles}>
            Speakers to include:
            <li css={scheduleStyles}>Dr. Mackie Spradley – Director of Enrichment Education and Programs, Texas Education Agency & NAfME President Elect</li>
            <li css={scheduleStyles}>Ms. Julie Duty – Executive Director of United Sound, Inc.</li>
          </ul> */}
        </section>

        <section>
          <h4>When</h4>
          <p css={indentStyles}>
            {fallRetreat.dateOfEvent}
          </p>
        </section>

        <section>
          <h4>Schedule Available Summer 2019</h4>
          {/* <h4>Schedule</h4> */}

          {/* <h5 css={indentStyles}>Wednesday</h5>
          <p css={scheduleStyles}>11:00am - Golf tournament (details and specific times to come)</p>
          <p css={scheduleStyles}>12:00pm - TMAC Alternate Tea</p>
          <div css={{ paddingLeft: 16 }}>
            <p css={scheduleStyles}><em>Lunch is free - provided by <a href="https://www.westmusic.com/" target="_blank" rel="noopener noreferrer">West Music</a></em></p>
          </div>
          <p css={scheduleStyles}>7:00pm - Reports from Partner Arts Organizations</p>
          <p css={scheduleStyles}>8:00pm - Guest Speaker/Pre-Conference Session</p>

          <h5 css={indentStyles}>Thursday</h5>
          <p css={scheduleStyles}>8:00am - Registration and Light Breakfast</p>
          <p css={scheduleStyles}>8:30am - Conference Begins</p>
          <p css={scheduleStyles}><em>Lunch is provided</em></p>
          <p css={scheduleStyles}>5:00pm - Conference ends for day</p>
          <p css={scheduleStyles}>6:00pm - Member reception sponsored by Music and Arts</p>

          <h5 css={indentStyles}>Friday</h5>
          <p css={scheduleStyles}>8:00am - Registration and Breakfast</p>
          <p css={scheduleStyles}>8:30am - TMAC Business Meeting followed by round table topics.</p>
          <p css={scheduleStyles}>12:00pm  - Conference ends</p> */}
        </section>

        <section>
          <h4>Where</h4>
          <div css={indentStyles}>
            <p>
              <a
                href="http://www.marriott.com/hotels/travel/ausap-austin-marriott-south/?scid=45f93f1b-bd77-45c9-8dab-83b6a417f6fe"
                rel="noopener noreferrer"
                target="_blank"
              >
                Austin Airport Marriott South
              </a>
            </p>
            <p>
              <a
                href="https://www.google.com/maps/place/4415+S+IH+35+Frontage+Rd,+Austin,+TX+78744/@30.2109504,-97.755463,17z/data=!3m1!4b1!4m5!3m4!1s0x8644b49cb7935da1:0x5a86d0320722c79b!8m2!3d30.2109504!4d-97.7532743"
                rel="noopener noreferrer"
                target="_blank"
              >
                4415 South IH-35
                <br />
                Austin, Texas 78744
              </a>
            </p>
            <p>
              Phone: <a href="tel:+15124418900">(512) 441-7900</a>
              <br />
              Fax: (512) 441-7899
            </p>
            <p css={{ fontSize: 24, color: 'darkred' }}>
              <a
                href="https://book.passkey.com/event/49544338/owner/44666/home"
                rel="noopener noreferrer"
                target="_blank"
              >
                For Hotel reservations click here
              </a>
            </p>
          </div>
        </section>
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
          <SidebarBody inline yaml={eventsSidebar} />
        </div>
      </Container>
    </Layout>
  );
};

FallRetreat.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

// export default withStyles(styles)(FallRetreat);
