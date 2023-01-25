// External Dependencies
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';
import { ABOUT_VIRTUES_DATA } from './about-constants';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.aboutDescription': {
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 1.1,
  },

  '.aboutVirtuesContainer': {
    display: 'flex',
    flexWrap: 'wrap',
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

  // backgroundColor: theme.palette.tfaa.about,
  // color: theme.palette.common.white,
  padding: theme.spacing(4, 15),
  width: '100%',
}));

// Component Definition
const Officers: FC = () => {
  return (
    <StyledRoot>
      <Typography
        className="aboutDescription"
        variant="body1"
      >
        People Dedicated to Fine Arts
        Education:
        <br />
        {appNameShort} Officers
      </Typography>

      <div className="aboutVirtuesContainer">
        {ABOUT_VIRTUES_DATA.map((virtue) => (
          <div key={virtue.title}>{virtue.title}</div>
        ))}
      </div>
    </StyledRoot>
  );
};

export default Officers;
