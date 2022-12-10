// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import NavItem from '../nav/NavItem';
import presets from '../../utils/presets';
import { currentYearLong } from '../../utils/helpers';
import { anchorStyles } from '../../utils/sharedStyles';
import { Typography } from '@mui/material';

// Local Variables
const StyledRoot = styled.footer(({ theme }) => {
  const linkStyles = {
    ...anchorStyles(theme),
    fontWeight: theme.typography.fontWeightMedium,
    marginLeft: 5,

    '&:hover': {
      background: theme.palette.ui.bright,
    },

    '&:visited': {
      color: 'black',
    },
  };

  return {
    '.footerBottom': {
      '& a': linkStyles,

      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: theme.spacing(3),
    },

    '.footerTop': {
      display: 'grid',
      gridTemplateColumns: '1fr 3fr 1fr',
      gridTemplateRows: '1fr',

      '.footerTopLeft': {
        alignSelf: 'center',
      },

      '.footerTopMiddle': {
        justifySelf: 'center',
      },

      '.footerTopRight': {
        justifySelf: 'end',

        '.forEveryone': {
          [theme.breakpoints.down('lg')]: {
            fontSize: theme.spacing(3),
          },

          color: theme.palette.tfaa.about,
          fontSize: 34,
          textAlign: 'right',
        },
      },
    },

    [presets.Tablet]: {
      fontSize: 16,
      padding: '2em',
      position: 'static',
    },

    background: theme.palette.common.white,
    borderTop: `2px solid ${theme.palette.grey['200']}`,
  };
});

// Component Definition
const Footer: FC = () => (
  <StyledRoot className="footer">
    <div className="footerTop">
      <div className="footerTopLeft">
        <NavItem linkTo="/">
          <div className="logoImageWrapper">
            <img
              alt="TFAA logo"
              className="logoImage"
              src="/tfaa-logo-svg.svg"
            />
          </div>
        </NavItem>
      </div>

      <div className="footerTopMiddle">
        middle links
      </div>

      <div className="footerTopRight">
        <Typography className="forEveryone">
          Fine Arts is for Everyone
        </Typography>
      </div>
    </div>


    <div className="footerBottom">
      <div>
        &copy; {currentYearLong} |
        Texas Fine Arts Administrators. All rights reserved.
      </div>
      <div>
        Built by{' '}
        <a
          href="https://www.mikemathew.com/"
          rel="noreferrer noopener"
          target="_blank"
        >
          Drumsensei Media
        </a>
      </div>
      <div>Made with love by{' '}
        <a
          href="https://www.lvbranding.com/"
          rel="noreferrer noopener"
          target="_blank"
        >
          LV Branding
        </a>
      </div>
    </div>
  </StyledRoot>
);

export default Footer;
