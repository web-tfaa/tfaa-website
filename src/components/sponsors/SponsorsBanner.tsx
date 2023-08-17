// External Dependencies
import React, { FC } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { appNameShort } from '../../utils/app-constants';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  h1: {
    [theme.breakpoints.down('lg')]: {
      fontSize: 48,
      marginLeft: theme.spacing(10),
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 36,
      marginLeft: theme.spacing(6),
      maxWidth: '75%',
    },
    [theme.breakpoints.down('mobile')]: {
      fontSize: 32,
      margin: theme.spacing(0, 4),
    },
    color: theme.palette.common.white,
    fontSize: 60,
    fontWeight: 900,
    lineHeight: 1.1,
    marginLeft: theme.spacing(12),
    marginTop: theme.spacing(6),
    maxWidth: '64%',
    textAlign: 'left',
    zIndex: 2,
  },

  li: {
    [theme.breakpoints.down('lg')]: {
      marginLeft: theme.spacing(10),
      maxWidth: '85%',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 18,
      marginLeft: theme.spacing(8),
    },
    [theme.breakpoints.down('mobile')]: {
      margin: theme.spacing(0, 4),
      maxWidth: '90%',
    },

    color: theme.palette.common.white,
    marginBottom: 0,
    marginLeft: theme.spacing(10),
    maxWidth: '70%',
  },

  ul: {
    marginTop: theme.spacing(2),
  },

  '&::before': {
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

  [theme.breakpoints.down('mobile')]: {
    background: 'url("https://res.cloudinary.com/tmac/image/upload/v1675111414/violin-closeup-mobile.png") no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    padding: theme.spacing(6, 3),
  },

  alignItems: 'flex-start',
  background: 'url("https://res.cloudinary.com/tmac/image/upload/v1675109950/violin-closeup.png") no-repeat',
  backgroundSize: 'cover',
  display: 'flex',
  height: 520,
  position: 'relative',
  flexDirection: 'column',
  width: '100%',
  zIndex: 1,
}));

// Component Definition
const SponsorsBanner: FC = () => {
  return (
    <StyledRoot>
      <Typography component="h1">
        Support. Promote.
        <br />
        Sustain.
      </Typography>

      <List>
        <ListItem>
          {appNameShort} offers many different sponsorship opportunities at varying levels of engagement.
        </ListItem>

        <ListItem>
          Our sponsors play a vital role in our organization&apos;s ongoing success by providing financial support and other valuable services.
        </ListItem>

        <ListItem>
          In return, your business will be recognized as an official sponsor, which benefits you and {appNameShort}.
        </ListItem>

        <ListItem>
          The Board seeks to provide relevant professional learning, while simultaneously offering our sponsors the opportunity to interact meaningfully with our members at {appNameShort} events.
        </ListItem>
      </List>
    </StyledRoot>
  );
};

export default SponsorsBanner;
