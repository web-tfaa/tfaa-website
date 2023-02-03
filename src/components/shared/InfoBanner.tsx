// External Dependencies
import React from 'react';
import styled from 'styled-components';

// Local Typings
type InfoBannerColor = 'membership' | 'resources';
interface Props {
  children: React.ReactNode | React.ReactNode[];
  color: InfoBannerColor;
}
interface InfoBannerStyledRootProps {
  $color: InfoBannerColor;
}

// Local Variables
const StyledRoot = styled.section<InfoBannerStyledRootProps>(({
  $color,
  theme,
}) => ({
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

  backgroundColor: theme.palette.tfaa[$color],
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
const InfoBanner: React.FC<Props> = ({
  children,
  color,
}) => {
  return (
    <StyledRoot $color={color}>
      {children}
    </StyledRoot>
  );
};

export default InfoBanner;
