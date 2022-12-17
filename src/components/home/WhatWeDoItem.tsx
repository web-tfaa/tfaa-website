// External Dependencies
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import CtaButton from '../shared/CtaButton';

// Local Typings
interface Props {
  altText: string;
  imgSrc: string;
  subtitle: string;
  title: string;
  to: string;
}

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  h3: {
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

  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(4, 2, 4),
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3, 2, 3),
  },
  [theme.breakpoints.down('mobile')]: {
    width: 'calc(100vw / 3)',
  },

  alignItems: 'center',
  backgroundColor: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  padding: theme.spacing(5, 3, 5),
  textAlign: 'center',
  width: 200,
}));

// Component Definition
const WhatWeDoItem: FC<Props> = ({
  altText,
  imgSrc,
  subtitle,
  title,
  to,
}) => {
  return (
    <StyledRoot>
      <div>
        <img
          alt={altText}
          src={imgSrc}
        />
      </div>

      <Box
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
          <Typography variant="h3">
            {title}
          </Typography>

          <Typography variant="body2">
            {subtitle}
          </Typography>
        </Box>

        <Box marginTop={1.5}>
          <CtaButton
            to={to}
            width={160}
          >
            Read more
          </CtaButton>
        </Box>
      </Box>
    </StyledRoot>
  );
};

export default WhatWeDoItem;
