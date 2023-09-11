// External Dependencies
import {
  Box, Typography,
  // Button,
} from '@mui/material';
import { Link } from 'gatsby-theme-material-ui';
// import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { EventList } from '.';
import { useEventData } from '../../utils/hooks/useEventData';
import Container from '../../components/shared/container';
// import EnhancedAlert from '../../components/shared/EnhancedAlert';
import Layout from '../../components/layout';
import { appNameShort } from '../../utils/app-constants';
import { currentSchoolYearLong } from '../../utils/helpers';

// Local Typings
interface Props {
  location: Location;
}

// Local Variables
const StyledContainer = styled(Container)(({ theme }) => ({
  '.headerFive': {
    margin: theme.spacing(1, 2),
  },
  '.hotelButton': {
    backgroundColor: theme.palette.events.hotelCta,
    color: theme.palette.getContrastText(theme.palette.events.hotelCta),
    fontWeight: 600,
    margin: theme.spacing(2, 0, 1),
  },
  '.openInNewIcon': {
    fontSize: '1em',
    marginLeft: theme.spacing(1.5),
  },
  '.schedule': {
    marginLeft: theme.spacing(4),
  },
  '.text': {
    marginLeft: theme.spacing(2),
  },
}));

// Component Definition
const FallConference: FC<Props> = ({ location }) => {
  const { edges } = useEventData();

  const fallRetreat = edges.find(({ node }: EventList) => node.titleOfEvent.includes('Fall Conference')).node;

  const hotelReservationButton = null;
  // (
  //   <Button
  //     className="hotel-link"
  //     classes={{ root: 'hotelButton' }}
  //     color="primary"
  //     href="https://www.marriott.com/event-reservations/reservation-link.mi?id=1661882188530&key=GRP&app=resvlink"
  //     rel="noopener noreferrer"
  //     size="large"
  //     target="_blank"
  //     variant="contained"
  //   >
  //     For Hotel reservations click here
  //     <OpenInNewIcon className="openInNewIcon" />
  //   </Button>
  // );

  return (
    <Layout
      location={location}
      pageTitle="Fall Conference"
    >
      <StyledContainer>
        <h1>{fallRetreat.titleOfEvent}</h1>

        {hotelReservationButton}

        <section>
          {/* <EnhancedAlert severity="info">
            Schedule available mid Fall 2022
          </EnhancedAlert> */}

          <h4>Who</h4>

          <Typography
            paragraph
            sx={{ marginLeft: 2 }}
          >
            The Fall Conference is open to all current {appNameShort} members who are in good standing{' '}
            (paid membership dues for the {currentSchoolYearLong} school year).
          </Typography>

          <Typography
            paragraph
            sx={{ marginLeft: 2 }}
          >
            Registration for the Fall Conference is $75, due by October 30, 2023.
          </Typography>

          <Box
            component="p"
            ml={2}
          >
            To join {appNameShort} for this year and pay the Fall Conference registration fee,
            please visit the <Link to="/members">Members</Link> page
          </Box>
        </section>

        <section>
          <h4>When</h4>
          <p>{fallRetreat.dateOfEvent}</p>
        </section>

        <section>
          <h4>Schedule</h4>

          <h5 className="headerFive">Wednesday</h5>
          <p className="schedule">1:00 PM start</p>

          <h5 className="headerFive">Thursday</h5>
          <p className="schedule">8:00 AM-5:00 PM</p>

          <h5 className="headerFive">Friday</h5>
          <p className="schedule">8:00-11:00 AM</p>
        </section>

        <section>
          <h4>Where</h4>
          <div className="text">
            <address>
              <p>
                <a
                  href="http://www.marriott.com/hotels/travel/ausap-austin-marriott-south/?scid=45f93f1b-bd77-45c9-8dab-83b6a417f6fe"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Austin Marriott South
                </a>
              </p>

              {hotelReservationButton}

              <p>
                <a
                  href="https://www.google.com/maps/place/4415+S+IH+35+Frontage+Rd,+Austin,+TX+78744/@30.2109504,-97.755463,17z/data=!3m1!4b1!4m5!3m4!1s0x8644b49cb7935da1:0x5a86d0320722c79b!8m2!3d30.2109504!4d-97.7532743"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  4415 South IH-35
                  <br />
                  Austin, TX 78744
                </a>
              </p>
              <p>
                Phone: <a href="tel:+15124418900">(512) 441-7900</a>
                <br />
                Fax: (512) 441-7899
              </p>
            </address>
          </div>
        </section>
      </StyledContainer>
    </Layout>
  );
};

export default FallConference;
