// External Dependencies
import React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { appName, appNameShort } from '../../utils/app-constants';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  p: {
    [theme.breakpoints.down('lg')]: {
      fontSize: 28,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 24,
    },
    [theme.breakpoints.down('mobile')]: {
      fontSize: 20,
    },
    color: theme.palette.common.white,
    fontSize: 30,
    fontWeight: 600,
    lineHeight: 1.1,
    textAlign: 'left',
    zIndex: 2,
  },

  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(14),
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(12),
  },
  [theme.breakpoints.down('mobile')]: {
    padding: theme.spacing(8),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4),
  },

  backgroundColor: theme.palette.tfaa.resources,
  display: 'flex',
  flexDirection: 'column',
  height: 360,
  justifyContent: 'center',
  padding: theme.spacing(15),
  position: 'relative',
  width: '100%',
  zIndex: 1,
}));

// Component Definition
const ResourcesInfo: React.FC = () => {
  return (
    <StyledRoot>
      <Typography paragraph>
        {appNameShort} provides Fine Arts Administrators the resources
        to advance high-quality education for all Texas students.
      </Typography>

      <Typography paragraph>
        Welcome to {appNameShort} — {appName} resources. Here you will
        find important and relevant information about managing Texas
        Fine Arts programs.
      </Typography>

      <Typography paragraph>
        If you have any questions about this site or need any help,
        please feel free to contact us at any time.
      </Typography>
    </StyledRoot>
  );
};

export default ResourcesInfo;
