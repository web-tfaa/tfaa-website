// External Dependencies
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import styled from 'styled-components';

// Local Typings
interface Props {
  children: React.ReactNode | React.ReactNode[];
  imageOpacity?: number;
  imageUrl: string;
  leftAlign?: boolean;
  mobileImageUrl?: string;
  tagline: string;
  title: string | React.ReactNode;
}
interface HomeBannerImageStyledRootProps {
  $imageOpacity: number;
  $imageUrl: string;
  $leftAlign: boolean;
  $mobileImageUrl?: string;
}

// Local Variables
const StyledRoot = styled.section<HomeBannerImageStyledRootProps>(({
  $leftAlign,
  $imageOpacity,
  $imageUrl,
  $mobileImageUrl,
  theme,
}) => ({
  '& > div': {
    [theme.breakpoints.down('mobile')]: {
      maxWidth: '100%',
    },
    maxWidth: '50%',
    zIndex: 2,
  },

  '&::before': {
    [theme.breakpoints.down('mobile')]: {
      opacity: 0.3,
    },
    content: '""',
    display: 'block',
    backgroundColor: theme.palette.tfaa.backgroundDark,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: $imageOpacity,
    height: '100%',
    width: '100%',
  },

  '.title': {
    [theme.breakpoints.down('lg')]: {
      fontSize: 48,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 44,
    },
    [theme.breakpoints.down('mobile')]: {
      fontSize: 36,
      margin: theme.spacing(0, 0, 3, 3),
      textAlign: 'center',
    },
    color: theme.palette.common.white,
    fontWeight: 900,
    marginBottom: theme.spacing(4),
  },

  '.tagline': {
    [theme.breakpoints.down('md')]: {
      fontSize: 24,
    },
    [theme.breakpoints.down('mobile')]: {
      textAlign: 'center',
    },
    fontSize: 27,
    marginTop: theme.spacing(5),
    textAlign: $leftAlign ? 'left' : 'right',
  },

  [theme.breakpoints.down('mobile')]: {
    background: $mobileImageUrl
      ? `url(${$mobileImageUrl}) no-repeat`
      : 'inherit',
    backgroundSize: 'cover',
    height: '100%',
    padding: theme.spacing(8),
    justifyContent: 'center',
  },

  background: `url(${$imageUrl}) no-repeat`,
  backgroundColor: theme.palette.tfaa.backgroundDark,
  backgroundSize: 'cover',
  color: theme.palette.common.white,
  display: 'flex',
  height: 727,
  justifyContent: $leftAlign ? 'flex-start' : 'flex-end',
  padding: theme.spacing(15),
  position: 'relative',
  width: '100%',
  zIndex: 1,
}));

// Component Definition
const HeroBannerImage: FC<Props> = ({
  leftAlign = false,
  children,
  imageOpacity = 0.6,
  imageUrl,
  mobileImageUrl,
  tagline,
  title,
}) => {
  return (
    <StyledRoot
      $leftAlign={leftAlign}
      $imageOpacity={imageOpacity}
      $imageUrl={imageUrl}
      $mobileImageUrl={mobileImageUrl}
    >
      <div>
        <Typography
          className="title"
          variant="h3"
        >
          {title}
        </Typography>

        {children}

        <Typography className="tagline">
          {tagline}
        </Typography>
      </div>
    </StyledRoot>
  );
};

export default HeroBannerImage;
