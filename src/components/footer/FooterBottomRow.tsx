// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// Internal Dependencies
import { currentYearLong } from '../../utils/helpers';
import { anchorStyles } from '../../utils/sharedStyles';
import { appName } from '../../utils/app-constants';

// Local Variables
const StyledOpenInNewIcon = styled(OpenInNewIcon)({
  '&&': {
    color: 'inherit',
    fontSize: '0.8em',
    marginLeft: '0.25em',
  }
}) as typeof OpenInNewIcon;

const StyledRoot = styled.div(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    fontSize: 15,
    textAlign: 'center',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 14,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 13,
  },

  '& a': {
    ...anchorStyles(theme),
    fontWeight: theme.typography.fontWeightMedium,

    '&:hover': {
      background: theme.palette.ui.bright,
    },

    '&:visited': {
      color: 'black',
    },
  },

  '& > div:not(:first-child)': {
    marginTop: theme.spacing(0.5),
  },

  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop: theme.spacing(3),
}));

// Component Definition
const FooterBottomRow: FC = () => {
  return (
    <StyledRoot className="footerBottom">
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
    </StyledRoot>
  );
};

export default FooterBottomRow;
