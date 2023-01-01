// External Dependencies
import { Link } from 'gatsby-theme-material-ui';
import { Typography } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { anchorStyles } from '../../utils/sharedStyles';
import { appNameShort } from '../../utils/app-constants';
import FooterBottomRow from './FooterBottomRow';
import FooterContactUs from './FooterContactUs';
import FooterFollowUs from './FooterFollowUs';
import FooterLearnMore from './FooterLearnMore';

// Local Variables
const StyledRoot = styled.footer(({ theme }) => ({
  '.footerTop': {
    '.footerTopTop': {
      a: {
        textDecoration: 'none',
      },

      '.contactUs': {
        fontSize: 16,
      },

      'img.tabletLogoImage': {
        [theme.breakpoints.down('mobile')]: {
          height: 180
        },

        height: 240,
        marginBottom: 0,
        width: '100%',
      },

      [theme.breakpoints.down('mobile')]: {
        gap: theme.spacing(4),
      },

      display: 'flex',
      gap: theme.spacing(6),
      height: '100%',
      justifyContent: 'center',
    },

    '.footerTopMiddle': {
      display: 'flex',
      gap: theme.spacing(12),
      justifyContent: 'center',
      justifySelf: 'center',
    },

    '.footerTopBottom': {
      '.forEveryone': {
        color: theme.palette.tfaa.about,
        fontSize: 34,
        lineHeight: 1,
        textAlign: 'center',
        fontWeight: 500,
      },

      justifyContent: 'center',
      display: 'flex',
      margin: theme.spacing(3, 0),
    },

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
  },

  '.linkList': {
    '.MuiBox-root': {
      '& > a': {
        ...anchorStyles(theme),
        fontWeight: theme.typography.fontWeightMedium,

        '&:hover': {
          background: theme.palette.ui.bright,
        },

        '&:visited': {
          color: theme.palette.grey['700'],
        },

        color: theme.palette.grey['700'],
        marginLeft: 0,
      },

      marginBottom: theme.spacing(0.5),
      minWidth: 100,
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
}));

// Component Definition
const TabletFooter: FC = () => {
  return (
    <StyledRoot className="footer">
      <div className="footerTop">
        <div className="footerTopTop">
          <Link to="/">
            <img
              alt={`${appNameShort} logo.`}
              className="tabletLogoImage"
              src="/texas-map.png"
            />
          </Link>

          <FooterContactUs />
        </div>

        <div className="footerTopMiddle">
          <FooterFollowUs />

          <FooterLearnMore />
        </div>

        <div className="footerTopBottom">
          <Typography className="forEveryone">
            Fine Arts is
            <br />
            for Everyone
          </Typography>
        </div>
      </div>

      <FooterBottomRow />
    </StyledRoot>
  );
};

export default TabletFooter;
