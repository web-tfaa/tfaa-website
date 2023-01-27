// External Dependencies
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.goalLeftContainer': {
    '& > img': {
      height: '100%',
      width: '100%',
    },

    position: 'absolute',
    left: '3%',
    top: '-12%',
  },

  '.goalRightContainer': {
    maxWidth: '55%',
  },

  '.goalTitle': {
    fontSize: 40,
    fontWeight: 900,
  },

  '.goalDescription': {
    fontSize: 18,
  },

  '.goalFooter': {
    fontSize: 27,
  },

  backgroundColor: theme.palette.tfaa.events,
  color: theme.palette.common.white,
  display: 'flex',
  justifyContent: 'flex-end',
  overflow: 'visible',
  padding: theme.spacing(4, 15),
  position: 'relative',
  width: '100%',
}));

// Component Definition
const Goal: FC = () => {
  return (
    <StyledRoot>
      <div className="goalLeftContainer">
        <img
          alt="State of Texas with colorful lines"
          src="/texas-map.png"
        />
      </div>

      <div className="goalRightContainer">
        <Typography
          className="goalTitle"
          paragraph
          variant="h4"
        >
          Our goal is to embrace diversity, inclusion,
          and growth within our Fine Arts community
        </Typography>

        <Typography
          className="goalDescription"
          paragraph
        >
          We know what an incredible opportunity it is to support artist-teachers
          who are helping students access the powerful benefits of a Fine Arts
          education. {appNameShort} believes that all students should have opportunities
          to engage in the Arts and develop their creativity, voice, and
          confidence. We help Fine Arts education advocates build capacity
          to deliver on this shared commitment.
        </Typography>

        <Typography className="goalFooter">
          Your participation can help us achieve more.
        </Typography>
      </div>
    </StyledRoot>
  );
};

export default Goal;
