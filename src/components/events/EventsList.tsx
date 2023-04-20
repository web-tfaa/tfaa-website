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
          <section>
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
          </section>

          <section>
            <Typography
              className="sectionTitle"
              component="h3"
            >
              Fall Retreat
            </Typography>

            <Box marginBottom={2}>
              <ViewDetailsButton
                context="event"
                to="/events/fall-retreat/"
              />
            </Box>

            <Typography paragraph>
              The 2023 Fall Retreat will be Nov. 1-3 in Austin.
            </Typography>

            <Typography>
              The {appNameShort} Fall Retreat is open to all current {appNameShort}{' '}
              members who are in good standing
              (paid for membership this school year).
              <br />
              There is no separate conference registration process.
            </Typography>
          </section>

          <section>
            <Typography
              className="sectionTitle"
              component="h3"
            >
              TMEA Round Table
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
