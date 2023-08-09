// External Dependencies
import { Link } from 'gatsby-theme-material-ui';
import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';
import Motifs from '../shared/Motifs';
import ViewDetailsButton from '../shared/ViewDetailsButton';
import { currentSchoolYearLong } from '../../utils/helpers';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.eventsTitle': {
    fontSize: 34,
    fontWeight: 900,
    marginBottom: theme.spacing(4),
  },

  '.sectionTitle': {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: theme.spacing(2),
  },

  // '.updatedText': {
  //   color: theme.palette.tfaa.resources,
  //   fontWeight: 600,
  // },

  section: {
    marginBottom: theme.spacing(6),
  },

  [theme.breakpoints.down('mobile')]: {
    padding: theme.spacing(18, 6),
  },

  display: 'flex',
  overflow: 'hidden',
  padding: theme.spacing(10),
  position: 'relative',
  width: '100%',
}));

// Component Definition
const EventsList: FC = () => {
  // Use this when we want to draw attention to an update
  // const updatedTextElement = useMemo(() => (
  //   <span className="updatedText">updated</span>
  // ), []);

  return (
    <StyledRoot>
      <Motifs small />

      <div>
        <Typography
          className="eventsTitle"
          component="h2"
          variant="h4"
        >
          {appNameShort} Events
        </Typography>

        <div className="eventsList">
          {/* <section>
            <Typography
              className="sectionTitle"
              component="h3"
            >
              Summer Round Table
            </Typography>

            <Box marginBottom={2}>
              <ViewDetailsButton
                context="event"
                to="/events/summer-round-table/"
              />
            </Box>

            <Typography paragraph>
              The 2023 Summer Round Table will be Friday, July 21 in San Antonio.
            </Typography>

            <Typography>
              Held in conjunction with these summer conventions:
            </Typography>

            <ul>
              <li>
                <Link to="http://www.texasbandmasters.org/">
                  Texas Bandmasters Association
                </Link>
              </li>
              <li>
                <Link to="https://www.tcda.net/">
                  Texas Choral Directors Association
                </Link>
              </li>
              <li>
                <Link to="https://www.todaweb.org/">
                  Texas Orchestra Directors Association
                </Link>
              </li>
            </ul>
          </section> */}

          <section>
            <Typography
              className="sectionTitle"
              component="h3"
            >
              Fall Conference
            </Typography>

            <Box marginBottom={2}>
              <ViewDetailsButton
                context="event"
                to="/events/fall-conference/"
              />
            </Box>

            <Typography paragraph>
              The 2023 Fall Conference will be held November 1-3 at the Austin Marriott South
            </Typography>

            <Typography paragraph>
              The Fall Conference is open to all current {appNameShort} members who are in good standing{' '}
              (paid membership dues for the {currentSchoolYearLong} school year).
            </Typography>

            <Typography>
              Registration for the Fall Conference is $75, due by October 30, 2023.
            </Typography>
          </section>

          <section>
            <Typography
              className="sectionTitle"
              component="h3"
            >
              TMEA Roundtable
            </Typography>

            <Box marginBottom={2}>
              <ViewDetailsButton
                context="event"
                to="/events/tmea-round-table/"
              />
            </Box>

            <Typography>
              Round Table Meeting on Wednesday at noon at the{' '}
              <Link href="https://www.tmea.org/">
                Texas Music Educators Association
              </Link>{' '}
              convention.
            </Typography>
          </section>
        </div>
      </div>
    </StyledRoot>
  );
};

export default EventsList;
