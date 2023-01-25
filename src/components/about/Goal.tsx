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

  backgroundColor: theme.palette.tfaa.events,
  color: theme.palette.common.white,
  display: 'flex',
  justifyContent: 'flex-end',
  padding: theme.spacing(4, 15),
  width: '100%',
}));

// Component Definition
const Goal: FC = () => {
  return (
    <StyledRoot>
      <div>
        <Typography
          className="aboutDescription"
          paragraph
          variant="h4"
        >
          Our goal is to embrace diversity, inclusion,
          and growth within our Fine Arts community
        </Typography>

        <Typography paragraph>
          We know what an incredible opportunity it is to support artist-teachers
          who are helping students access the powerful benefits of a Fine Arts
          education. {appNameShort} believes that all students should have opportunities
          to engage in the Arts and develop their creativity, voice, and
          confidence. We help Fine Arts education advocates build capacity
          to deliver on this shared commitment.
        </Typography>

        <Typography>
          Your participation can help us achieve more.
        </Typography>
      </div>
    </StyledRoot>
  );
};

export default Goal;
