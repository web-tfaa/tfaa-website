// External Dependencies
import React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.oneTwoThreeTitle': {
    [theme.breakpoints.down('mobile')]: {
      fontSize: 28,
    },
    fontSize: 34,
    fontWeight: 900,
    marginBottom: theme.spacing(0),
  },

  li: {
    '&::before': {
      [theme.breakpoints.down('lg')]: {
        transform: `translateY(${theme.spacing(7)})`,
        fontSize: 104,
      },
      [theme.breakpoints.down('md')]: {
        fontSize: 96,
      },
      [theme.breakpoints.down('mobile')]: {
        fontSize: 84,
        transform: `translateY(${theme.spacing(6)})`,
      },
      [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(2),
      },
      color: theme.palette.tfaa.resources,
      content: 'counter(item)',
      display: 'inline-block',
      fontSize: 118,
      fontWeight: 900,
      marginRight: theme.spacing(1),
      textAlign: 'center',
      transform: `translateY(${theme.spacing(8)})`,
    },

    '& span': {
      [theme.breakpoints.down('mobile')]: {
        fontSize: 17,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 15,
      },
      fontSize: 18,
    },

    [theme.breakpoints.down('md')]: {
      width: '30%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '75%',
    },
    alignItems: 'baseline',
    counterIncrement: 'item',
    display: 'flex',
    width: '25%',
  },

  ol: {
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      flexDirection: 'column',
      marginBottom: theme.spacing(6),
    },
    display: 'flex',
    justifyContent: 'space-between',
    listStyle: 'none',
    counterReset: 'item',
    margin: 0
  },

  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(5, 8),
  },
  [theme.breakpoints.down('mobile')]: {
    padding: theme.spacing(4, 6),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 4),
  },

  padding: theme.spacing(6, 10),
}));

// Component Definition
const MembersOneTwoThree: React.FC = () => {
  return (
    <StyledRoot>
      <Typography
        className="oneTwoThreeTitle"
        component="h2"
        variant="h4"
      >
        The {appNameShort} membership help us to:
      </Typography>

      <ol>
        <li>
          <Typography component="span">
            Participation in professional development
            to grow your leadership and management skills
          </Typography>
        </li>

        <li>
          <Typography component="span">
            Collaboration between Fine Arts administrators,
            teachers, fine arts organizations, and fine arts vendors
          </Typography>
        </li>

        <li>
          <Typography component="span">
            Promotion and advocacy efforts to keep Fine Arts an
            essential part of every Texas student&apos;s education
          </Typography>
        </li>
      </ol>
    </StyledRoot>
  );
};

export default MembersOneTwoThree;
