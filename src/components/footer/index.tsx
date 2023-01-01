// External Dependencies
import { Link } from 'gatsby-theme-material-ui';
import React, { FC, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { useMediaQuery } from '@mui/material';

// Internal Dependencies
import { anchorStyles } from '../../utils/sharedStyles';
import { Typography } from '@mui/material';
import { appNameShort } from '../../utils/app-constants';
import FooterBottomRow from './FooterBottomRow';
import FooterContactUs from './FooterContactUs';
import FooterLearnMore from './FooterLearnMore';
import FooterFollowUs from './FooterFollowUs';
import FooterFollowUsIconList from './FooterFollowUsIconList';
import TabletFooter from './TabletFooter';

// Local Variables
const StyledRoot = styled.footer(({ theme }) => {
  const linkStyles = {
    ...anchorStyles(theme),
    fontWeight: theme.typography.fontWeightMedium,

    '&:hover': {
      background: theme.palette.ui.bright,
    },

    '&:visited': {
      color: 'black',
    },
  };

  return {
    '.footerTop': {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      gap: theme.spacing(2),

      '.footerTopLeft': {
        '.logoImage': {
          marginBottom: 0,
        },

        alignItems: 'center',
        display: 'flex',
        width: 240,
      },

      '.footerTopMiddle': {
        [theme.breakpoints.down('xl')]: {
          gap: theme.spacing(8),
        },
        [theme.breakpoints.down('lg')]: {
          fontSize: 15,
          gap: theme.spacing(5),
        },

        color: theme.palette.grey['700'],
        display: 'flex',
        flex: 2,
        gap: theme.spacing(12),
        justifyContent: 'center',
        justifySelf: 'center',
      },

      '.footerTopRight': {
        '.forEveryone': {
          [theme.breakpoints.down('lg')]: {
            fontSize: 24,
          },

          color: theme.palette.tfaa.about,
          fontSize: 34,
          lineHeight: 1,
          textAlign: 'right',
          fontWeight: 500,
        },

        '.followUsIconList': {
          '.MuiAvatar-root': {
            backgroundColor: theme.palette.tfaa.resources,
          },

          marginTop: theme.spacing(2),
          textAlign: 'left',
        },

        justifySelf: 'end',
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      },
    },

    '.linkList': {
      '.MuiBox-root': {
        '& > a': {
          ...linkStyles,
          color: theme.palette.grey['700'],
          marginLeft: 0,

          '&:visited': {
            color: theme.palette.grey['700'],
          },
        },

        marginBottom: theme.spacing(0.5),
        minWidth: 100,
      },
    },

    '.tabletContactUs': {
      [theme.breakpoints.up('mobile')]: {
        display: 'none',
      },
    },

    hr: {
      marginBottom: theme.spacing(1.5),
    },

    [theme.breakpoints.down('xl')]: {
      padding: theme.spacing(4),
    },
    [theme.breakpoints.down('lg')]: {
      fontSize: 15,
      padding: theme.spacing(3),
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
      padding: theme.spacing(2),
    },
    [theme.breakpoints.down('mobile')]: {
      fontSize: 14,
      padding: theme.spacing(2, 2, 4),
    },

    fontFamily: theme.typography.fontFamily,
    fontSize: 16,
    padding: theme.spacing(8, 8, 4),
    position: 'static',
    background: theme.palette.common.white,
    borderTop: `2px solid ${theme.palette.grey['200']}`,
    zIndex: 1,
  };
});

// Component Definition
const Footer: FC = () => {
  const theme = useTheme();
  const isTabletOrSmallerScreen = useMediaQuery(theme.breakpoints.down('md'));

  const largeLogoElement = useMemo(() => (
    <img
      alt={`${appNameShort} logo.`}
      className="logoImage"
      src="/tfaa-logo-svg.svg"
    />
  ), []);

  if (isTabletOrSmallerScreen) {
    return <TabletFooter />;
  }

  return (
    <StyledRoot className="footer">
      <div className="footerTop">
        <div className="footerTopLeft">
          <Link to="/">
            <div className="logoImageWrapper">
              {largeLogoElement}
            </div>
          </Link>
        </div>

        <div className="footerTopMiddle">
          <FooterContactUs />

          <FooterLearnMore />

          <FooterFollowUs />
        </div>

        <div className="footerTopRight">
          <Typography className="forEveryone">
            Fine Arts is
            <br />
            for Everyone
          </Typography>

          <FooterFollowUsIconList />
        </div>
      </div>

      <FooterBottomRow />
    </StyledRoot>
  );
};

export default Footer;
