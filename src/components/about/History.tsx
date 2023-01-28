// External Dependencies
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({

  address: {
    '& > p': {
      fontWeight: 500,
    },

    fontStyle: 'normal',
  },

  '.historyContent': {
    '& > div': {
      [theme.breakpoints.down('mobile')]: {
        maxWidth: '100%',
      },
      maxWidth: '60%',
    },

    [theme.breakpoints.down('mobile')]: {
      flexDirection: 'column-reverse',
    },
    display: 'flex',
  },

  '.historyImageContainer': {
    [theme.breakpoints.down('mobile')]: {
      padding: theme.spacing(2, 0),
    },

    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(8),
    width: '100%',
  },

  '.historyTitle': {
    fontSize: 34,
    fontWeight: 900,
  },

  [theme.breakpoints.down('mobile')]: {
    padding: theme.spacing(18, 6),
  },

  display: 'flex',
  padding: theme.spacing(10),
  width: '100%',
}));

// Component Definition
const History: FC = () => {
  return (
    <StyledRoot>
      <div>
        <Typography
          className="historyTitle"
          paragraph
          variant="h4"
        >
          {appNameShort} History
        </Typography>

        <div className="historyContent">
          <div>
            <Typography
              paragraph
              variant="body2"
            >
              In the early 1970s a small group of music supervisors from the
              Dallas-Forth Worth metroplex met together periodically to share ideas
              and help each other with mutual related music concerns. This group
              began to expand and so we moved our meetings to Crystal&apos;s Pizza
              restaurant in Irving and found our meetings becoming more beneficial
              to each other. The meetings remained informal with no set agenda and
              no officers; the only constant was that I arranged the site and sent a
              reminder letter each month to the group. We all looked forward to our
              monthly meeting and always left the meetings with new ideas and a
              refreshed sense of purpose in our work.
            </Typography>

            <Typography
              paragraph
              variant="body2"
            >
              As the group enlarged in our area and across the state, we felt it
              would be beneficial to have music administration opportunities
              specifically targeting our work-related concerns at the TMEA
              conventions and summer meetings. The first TMAC officers were elected
              in February, 1983 at the Texas Music Educators Association Convention
              in San Antonio. The following people were elected as the charter
              officers of the TMAC organization: President R.J. (Dick) Winters,
              Music Coordinator for the Plano Independent School District; Vice
              President Woody Schober, Director of Music, Irving ISD; and
              Secretary-Treasurer Ken Howard, Music Supervisor, Waco ISD. Following
              the election of officers, meetings and workshops were scheduled at
              TMEA and at the summer conventions. These meetings addressed various
              topics including budget, curriculum, personnel, public relations,
              planning and organization, etc.
            </Typography>

            <Typography
              paragraph
              variant="body2"
            >
              As a music educator who spent 30 years in music administration, I was
              grateful for the help and assistance I received as a member of TMAC
              and applaud those now who are continuing to provide this worthwhile
              organization for the continued advancement of music education in our
              state.
            </Typography>

            <address>
              <Typography variant="body2">Woody Schober,</Typography>
              <Typography variant="body2">Director of Fine Arts, Retired</Typography>
              <Typography variant="body2">Irving ISD, Irving, Texas</Typography>
            </address>
          </div>

          <div className="historyImageContainer">
            <img
              alt="Woody Schober"
              src="https://res.cloudinary.com/tmac/image/upload/v1523131020/history_woody-schober.jpg"
            />
          </div>
        </div>

      </div>
    </StyledRoot>
  );
};

export default History;
