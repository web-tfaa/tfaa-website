// External Dependencies
import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import { Link } from 'gatsby';

// Internal Dependencies
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import SidebarBody from '../../components/shared/sidebar/sidebar-body';
import presets from '../../utils/presets';
import { useEventData } from '../../utils/hooks/useEventData';

// Sidebar data
import eventsSidebar from './events-links.yml';

// Local Variables
const useStyles = makeStyles((theme) => ({
  hotelButton: {
    backgroundColor: theme.palette.events.hotelCta,
    color: theme.palette.getContrastText(theme.palette.events.hotelCta),
    fontWeight: 600,
  },
  text: {
    marginLeft: theme.spacing(2),
  },
}));

// const scheduleStyles = {
//   margin: '6px 0px 6px 32px',
// };

// Component Definition
const FallRetreat = ({ location }) => {
  const classes = useStyles();

  const { edges } = useEventData();

  const fallRetreat = edges.find((e) => e.node.titleOfEvent.includes('Fall Retreat')).node;

  return (
    <Layout location={location}>
      <Helmet>
        <title>TMAC | Fall Retreat</title>
      </Helmet>
      <Container>
        <h1>{fallRetreat.titleOfEvent}</h1>

        <section>
          <h4>Who</h4>
          <p className={classes.text}>
            The TMAC Fall Retreat is open to all current TMAC members who are in good standing
            (registered and paid). There is no separate conference registration process.
            {/* {'If you need to register for th
            is year, then please visit the <Link to="/members">Members</Link> page.'} */}
          </p>

          {/* This "alert" shou
          ld show the Fall Retreat is in past but we are in the current school year still */}
          {/* <div className={classes.text}>
            <Card className={classes.adminCard}>
              <CardContent>
                <Typography variant="h6" component="h6">Membership</Typography>
                <Typography variant="body2">
                  Membership registration for the 2019-2020 academic year will open on July 1, 2019.
                </Typography>
              </CardContent>
            </Card>
          </div> */}

          {/* <p classN
          ame={classes.text}>Preconference Tea and Golf Tournament (Schedule below)</p> */}
          {/* <h5 className={classes.text}>Alternate Tea details</h5> */}
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
            <li css={scheduleStyles}>Dr. Mackie Spradley – Director of Enrichment
            Education and Programs, Texas Education Agency & NAfME President Elect</li>
            <li css={scheduleStyles}>Ms. Julie Duty – Executive Director of United Sound, Inc.</li>
          </ul> */}
        </section>

        <section>
          <h4>When</h4>
          <p className={classes.text}>{fallRetreat.dateOfEvent}</p>
        </section>

        <section>
          <h4>Schedule available mid Fall</h4>
          {/* <h4>Schedule</h4> */}

          {/* <h5 className={classes.text}>Wednesday</h5>
          <p css={scheduleStyles}>11:00am - Golf tournament (details and specific times to come)</p>
          <p css={scheduleStyles}>12:00pm - TMAC Alternate Tea</p>
          <div css={{ paddingLeft: 16 }}>
            <p css={scheduleStyles}><em>Lunch is free - provided by <a href="https://www.westmusic.com/" target="_blank" rel="noopener noreferrer">West Music</a></em></p>
          </div>
          <p css={scheduleStyles}>7:00pm - Reports from Partner Arts Organizations</p>
          <p css={scheduleStyles}>8:00pm - Guest Speaker/Pre-Conference Session</p>

          <h5 className={classes.text}>Thursday</h5>
          <p css={scheduleStyles}>8:00am - Registration and Light Breakfast</p>
          <p css={scheduleStyles}>8:30am - Conference Begins</p>
          <p css={scheduleStyles}><em>Lunch is provided</em></p>
          <p css={scheduleStyles}>5:00pm - Conference ends for day</p>
          <p css={scheduleStyles}>6:00pm - Member reception sponsored by Music and Arts</p>

          <h5 className={classes.text}>Friday</h5>
          <p css={scheduleStyles}>8:00am - Registration and Breakfast</p>
          <p css={scheduleStyles}>8:30am - TMAC Business Meeting followed by round table topics.</p>
          <p css={scheduleStyles}>12:00pm  - Conference ends</p> */}
        </section>

        <section>
          <h4>Where</h4>
          <div className={classes.text}>
            <p>
              <a
                href="http://www.marriott.com/hotels/travel/ausap-austin-marriott-south/?scid=45f93f1b-bd77-45c9-8dab-83b6a417f6fe"
                rel="noopener noreferrer"
                target="_blank"
              >
                Austin Marriott South
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
            <Button
              className="hotel-link"
              classes={{ root: classes.hotelButton }}
              color="primary"
              href="https://www.marriott.com/events/start.mi?id=1576170005303&key=GRP"
              rel="noopener noreferrer"
              size="large"
              target="_blank"
              variant="contained"
            >
              For Hotel reservations click here
            </Button>
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
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default FallRetreat;
