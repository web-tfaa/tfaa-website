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
  },

  '.aboutForAll': {
    fontSize: 27,
    textAlign: 'right',
  },

  // '&& .MuiTypography-root': {
  //   [theme.breakpoints.down('lg')]: {
  //     fontSize: 40,
  //   },
  //   [theme.breakpoints.down('mobile')]: {
  //     fontSize: 30,
  //     margin: theme.spacing(25, 6, 10),
  //   },
  //   [theme.breakpoints.down('sm')]: {
  //     fontSize: 28,
  //   },
  //   color: theme.palette.common.white,
  //   fontSize: 60,
  //   fontWeight: 500,
  //   lineHeight: 1,
  //   margin: theme.spacing(10),
  // },

  backgroundColor: theme.palette.tfaa.backgroundDark,
  color: theme.palette.common.white,
  display: 'flex',
  justifyContent: 'flex-end',
  padding: theme.spacing(15),
  width: '100%',
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

        <Typography paragraph>
          {appNameShort} provides a powerful platform for Fine Arts leaders.
        </Typography>

        <Typography paragraph>
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
