// External Dependencies
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import CtaButton from '../shared/CtaButton';

// Local Typings
interface Props {
  buttonText?: string;
  imgSrc: string;
  subtitle: string;
  title: string;
  to: string;
}
interface StyledRootProps {
  $imgSrc: string;
}

// Local Variables
const StyledRoot = styled.section<StyledRootProps>(({
  $imgSrc,
  theme,
}) => ({
  '.whatWeDoImageContainer': {
    background: `url(${$imgSrc}) no-repeat`,
    backgroundSize: 'cover',
    minHeight: 224,
    minWidth: 320,
    position: 'relative',
    top: -24,
    right: -24,
  },

  '.whatWeDoItemContent': {
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(4, 2, 4),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(3, 2, 3),
    },
    padding: theme.spacing(0, 3, 5),
  },

  '.itemSubtitle': {
    color: theme.palette.text.primary,
  },

  '.itemTitle': {
    [theme.breakpoints.down('lg')]: {
      fontSize: 20,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 22,
    },
    [theme.breakpoints.down('mobile')]: {
      fontSize: 18,
    },

    fontSize: 20,
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    textAlign: 'left',
    textTransform: 'uppercase',
  },

  p: {
    [theme.breakpoints.down('lg')]: {
      fontSize: 16,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 15,
    },
    [theme.breakpoints.down('mobile')]: {
      fontSize: 14,
    },
    fontSize: 16,
    textAlign: 'left',
  },

  [theme.breakpoints.down('md')]: {
    '&:not(:first-child)': {
      marginTop: theme.spacing(8),
    },
    width: 500,
  },
  [theme.breakpoints.down('mobile')]: {
    marginRight: theme.spacing(3),
    width: 300,
  },

  alignItems: 'center',
  backgroundColor: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  textAlign: 'center',
  width: 200,
}));

// Component Definition
const WhatWeDoItem: FC<Props> = ({
  buttonText = 'Read more',
  imgSrc,
  subtitle,
  title,
  to,
}) => {
  return (
    <StyledRoot $imgSrc={imgSrc}>
      <div className="whatWeDoImageContainer" />

      <Box
        className="whatWeDoItemContent"
        display="flex"
        flex={1}
        flexDirection="column"
        justifyContent="space-around"
      >
        <Box
          alignItems="flex-start"
          display="flex"
          flexDirection="column"
          height="100%"
          width="100%"
        >
          <Typography
            className="itemTitle"
            variant="h3"
          >
            {title}
          </Typography>

          <Typography
            className="itemSubtitle"
            variant="body2"
          >
            {subtitle}
          </Typography>
        </Box>

        <Box marginTop={4}>
          <CtaButton
            to={to}
            width={160}
          >
            {buttonText}
          </CtaButton>
        </Box>
      </Box>
    </StyledRoot>
  );
};

export default WhatWeDoItem;
