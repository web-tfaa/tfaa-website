// External Dependencies
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '& > div': {
    [theme.breakpoints.down('mobile')]: {
      maxWidth: '100%',
    },
    maxWidth: '50%',
    zIndex: 2,
  },

  '&::before': {
    [theme.breakpoints.down('mobile')]: {
      opacity: 0.3,
    },
    content: '""',
    display: 'block',
    backgroundColor: theme.palette.tfaa.backgroundDark,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.6,
    height: '100%',
    width: '100%',
  },

  '.forEveryoneTitle': {
    [theme.breakpoints.down('mobile')]: {
      fontSize: 36,
      margin: theme.spacing(0, 0, 3, 3),
      textAlign: 'center',
    },
    fontWeight: 900,
  },

  '.aboutForAll': {
    [theme.breakpoints.down('mobile')]: {
      textAlign: 'center',
    },
    fontSize: 27,
    textAlign: 'right',
  },

  [theme.breakpoints.down('mobile')]: {
    padding: theme.spacing(8),
    justifyContent: 'center',
  },

  backgroundColor: theme.palette.tfaa.backgroundDark,
  background: 'url(https://res.cloudinary.com/tmac/image/upload/v1674660162/ballet-dancers.png) no-repeat',
  color: theme.palette.common.white,
  display: 'flex',
  justifyContent: 'flex-end',
  padding: theme.spacing(15),
  position: 'relative',
  width: '100%',
  zIndex: 1,
}));

// Component Definition
const AboutForEveryone: FC = () => {
  return (
    <StyledRoot>
      <div>
        <Typography
          className="forEveryoneTitle"
          paragraph
          variant="h3"
        >
          Fine Arts are
          for Everyone
        </Typography>

        <Typography
          paragraph
          variant="body2"
        >
          {appNameShort} provides a powerful platform for Fine Arts leaders.
        </Typography>

        <Typography
          paragraph
          variant="body2"
        >
          We provide advocacy, training, and resources to transform
          schools into vibrant communities of learners and artists.
        </Typography>

        <Typography className="aboutForAll">
          Fine Arts for All!
        </Typography>
      </div>
    </StyledRoot>
  );
};

export default AboutForEveryone;
