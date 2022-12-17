// External Dependencies
import { Link } from 'gatsby-theme-material-ui';
import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.linkContainer a': {
    [theme.breakpoints.down('mobile')]: {
      fontSize: 15,
    },
    fontSize: 16,
    fontWeight: theme.typography.fontWeightRegular,
  },

  '.priorityRight': {
    [theme.breakpoints.down('mobile')]: {
      padding: theme.spacing(4, 10, 4, 4),
      width: '70%',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4),
      width: '85%',
    },

    padding: theme.spacing(8, 15, 8, 8),
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  h4: {
    [theme.breakpoints.down('mobile')]: {
      fontSize: 36,
      marginBottom: theme.spacing(1.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 28,
    },
    color: theme.palette.common.white,
    fontSize: 45,
    fontWeight: 600,
    marginBottom: theme.spacing(2),
  },

  p: {
    [theme.breakpoints.down('mobile')]: {
      fontSize: 15,
    },
    marginBottom: theme.spacing(2),
  },

  [theme.breakpoints.down('mobile')]: {
    padding: theme.spacing(4, 0, 2),
  },

  background: "url('https://res.cloudinary.com/tmac/image/upload/v1671285382/symphony-orchestra-performing-on-stage.png') no-repeat",
  backgroundSize: 'cover',
  color: theme.palette.common.white,
  display: 'flex',
  justifyContent: 'flex-end',
  padding: theme.spacing(5, 0, 2.5),
  width: '100%',
}));

// Component Definition
const FineArtsPriority: FC = () => {
  return (
    <StyledRoot>
      <div className="priorityRight">
        <Typography variant="h4">
          Making Fine Arts a Priority
        </Typography>

        <Typography variant="body2">
          {appNameShort} provides leadership training, professional growth opportunities,
          and advocacy for arts administrators in Texas.
        </Typography>

        <Typography variant="body2">
          We support their success by connecting them to other leaders and
          providing opportunities to share their expertise locally,
          regionally, and globally.
        </Typography>

        <Box className="linkContainer">
          <Link to="/about">
            Read more about how {appNameShort} could help your students
          </Link>
        </Box>
      </div>
    </StyledRoot>
  );
};

export default FineArtsPriority;
