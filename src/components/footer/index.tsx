// External Dependencies
import { Avatar, Box, IconButton } from '@mui/material';
import { Link } from 'gatsby-theme-material-ui';
import React, { FC } from 'react';
import styled from 'styled-components';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

// Internal Dependencies
import { currentYearLong } from '../../utils/helpers';
import { anchorStyles } from '../../utils/sharedStyles';
import { Typography } from '@mui/material';
import { appName, facebookUrl, mailingAddress, twitterUrl } from '../../utils/app-constants';
import Address from '../shared/Address';
import NavItem from '../nav/NavItem';
import presets from '../../utils/presets';

// Local Variables
const StyledOpenInNewIcon = styled(OpenInNewIcon)({
  '&&': {
    color: 'inherit',
    fontSize: '0.8em',
    marginLeft: '0.25em',
  }
}) as typeof OpenInNewIcon;

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
      [theme.breakpoints.down('lg')]: {
        fontSize: 15,
      },
      [theme.breakpoints.down('md')]: {
        fontSize: 14,
      },

      '& a': linkStyles,

      '& > div:not(:first-child)': {
        marginTop: theme.spacing(0.5),
      },

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
      columnGap: theme.spacing(2),

      '.footerTopLeft': {
        alignSelf: 'center',
      },

      '.footerTopMiddle': {
        [theme.breakpoints.down('lg')]: {
          fontSize: 15,
          columnGap: theme.spacing(5),
        },

        justifySelf: 'center', // Alignment for parent grid

        display: 'grid', // Grid for the top middle section
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '1fr',
        columnGap: theme.spacing(8),

        color: theme.palette.grey['700'],
      },

      '.footerTopRight': {
        justifySelf: 'end',

        '.forEveryone': {
          [theme.breakpoints.down('lg')]: {
            fontSize: 24,
          },

          color: theme.palette.tfaa.about,
          fontSize: 34,
          textAlign: 'right',
        },

        '.followUsIconList': {
          '.MuiAvatar-root': {
            backgroundColor: theme.palette.tfaa.resources,
          },

          marginTop: theme.spacing(2),
          textAlign: 'left',
        }
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
      },
    },

    hr: {
      marginBottom: theme.spacing(1.5),
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
const Footer: FC = () => {
  const addressElement = (
    <Address
      addressOne={mailingAddress.addressOne}
      city={mailingAddress.city}
      state={mailingAddress.state}
      zipCode={mailingAddress.zip}
    />
  );

  return (
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
          <div>
            Location &amp; Contact
            <hr />
            Mailing Address
            {addressElement}

            <Box marginTop={1}>
              Physical Address
              {addressElement}
            </Box>
          </div>

          <div className="linkList">
            LINKS
            <hr />
            <Box>
              <Link to="/about">The issue</Link>
            </Box>
            <Box>
              <Link to="/about">How we help</Link>
            </Box>
            <Box>
              <Link to="/about">Get involved</Link>
            </Box>
            <Box>
              <Link to="/about">Latest news</Link>
            </Box>
          </div>

          <div className="linkList">
            FOLLOW US
            <hr />
            <Box>
              <a
                href={facebookUrl}
                rel="noreferrer noopener"
                target="_blank"
              >
                Facebook
              </a>
            </Box>
            <Box>
              <a
                href={twitterUrl}
                rel="noreferrer noopener"
                target="_blank"
              >
                Twitter
              </a>
            </Box>
            <Box>
              <Link to="/about">Instagram</Link>
            </Box>
          </div>
        </div>

        <div className="footerTopRight">
          <Typography className="forEveryone">
            Fine Arts is for Everyone
          </Typography>

          <div className="followUsIconList">
            <Typography sx={{ fontSize: 14 }}>
              FOLLOW US
            </Typography>

            <div>
              <IconButton
                href={facebookUrl}
                rel="noreferrer noopener"
                target="_blank"
              >
                <Avatar>
                  <FacebookIcon fontSize="small" />
                </Avatar>
              </IconButton>

              <IconButton
                href={twitterUrl}
                rel="noreferrer noopener"
                target="_blank"
              >
                <Avatar>
                  <TwitterIcon fontSize="small" />
                </Avatar>
              </IconButton>

              <IconButton>
                <Avatar>
                  <InstagramIcon fontSize="small" />
                </Avatar>
              </IconButton>
            </div>
          </div>
        </div>
      </div>


      <div className="footerBottom">
        <div>
          &copy; {currentYearLong} |{' '}
          {appName}. All rights reserved.
        </div>

        <div>
          Made with love by{' '}
          <a
            href="https://www.lvbranding.com/"
            rel="noreferrer noopener"
            target="_blank"
          >
            LV Branding
            <StyledOpenInNewIcon />
          </a>
        </div>

        <div>
          Built by{' '}
          <a
            href="https://www.mikemathew.com/"
            rel="noreferrer noopener"
            target="_blank"
          >
            Drumsensei Media
            <StyledOpenInNewIcon />
          </a>
        </div>
      </div>
    </StyledRoot>
  );
};

export default Footer;
