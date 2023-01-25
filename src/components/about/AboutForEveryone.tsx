// External Dependencies
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '& > div': {
    maxWidth: '50%',
    zIndex: 2,
  },

  '&::before': {
    content: '""',
    display: 'block',
    backgroundColor: theme.palette.tfaa.backgroundDark,
    background: 'url(https://res.cloudinary.com/tmac/image/upload/v1674660162/ballet-dancers-background.png) no-repeat',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.6,
    height: '100%',
    width: '100%',
  },

  '.aboutDescription': {
    fontWeight: 600,
  },

  '.aboutForAll': {
    fontSize: 27,
    textAlign: 'right',
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
          className="aboutDescription"
          paragraph
          variant="h3"
        >
          Fine Arts are
          <br />
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
