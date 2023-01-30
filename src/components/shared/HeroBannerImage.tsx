// External Dependencies
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import styled from 'styled-components';

// Local Typings
interface Props {
  children: React.ReactNode | React.ReactNode[];
  imageUrl: string;
  mobileImageUrl?: string;
  tagline: string;
  title: string;
}
interface HomeBannerImageStyledRootProps {
  $imageUrl: string;
  $mobileImageUrl?: string;
}

// Local Variables
const StyledRoot = styled.section<HomeBannerImageStyledRootProps>(({
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
    opacity: 0.6,
    height: '100%',
    width: '100%',
  },

  '.title': {
    [theme.breakpoints.down('mobile')]: {
      fontSize: 36,
      margin: theme.spacing(0, 0, 3, 3),
      textAlign: 'center',
    },
    fontWeight: 900,
  },

  '.tagline': {
    [theme.breakpoints.down('mobile')]: {
      textAlign: 'center',
    },
    fontSize: 27,
    marginTop: theme.spacing(5),
    textAlign: 'right',
  },

  [theme.breakpoints.down('mobile')]: {
    padding: theme.spacing(8),
    justifyContent: 'center',
  },

  backgroundColor: theme.palette.tfaa.backgroundDark,
  background: `url(${$imageUrl}) no-repeat`,
  color: theme.palette.common.white,
  display: 'flex',
  height: 727,
  justifyContent: 'flex-end',
  padding: theme.spacing(15),
  position: 'relative',
  width: '100%',
  zIndex: 1,
}));

// Component Definition
const HeroBannerImage: FC<Props> = ({
  children,
  imageUrl,
  mobileImageUrl,
  tagline,
  title,
}) => {
  return (
    <StyledRoot
      $imageUrl={imageUrl}
      $mobileImageUrl={mobileImageUrl}
    >
      <div>
        <Typography
          className="title"
          paragraph
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
