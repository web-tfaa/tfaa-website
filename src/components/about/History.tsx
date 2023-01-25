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

  '.historyTitle': {
    fontSize: 34,
    fontWeight: 900,
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

  // backgroundColor: theme.palette.tfaa.events,
  // color: theme.palette.common.white,
  // display: 'flex',
  // justifyContent: 'flex-end',
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

        <Typography paragraph>
          History description
        </Typography>

        <Typography paragraph>
          History description
        </Typography>

        <Typography paragraph>
          History description
        </Typography>
      </div>
    </StyledRoot>
  );
};

export default History;
