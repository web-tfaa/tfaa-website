// External Dependencies
import React from 'react';
import hex2rgba from 'hex2rgba';
import styled from 'styled-components';

// Internal Dependencies
import ArrowForwardIcon from '../shared/ArrowForwardIcon';
import CtaButton from './cta-button';
import presets from '../../utils/presets';
import { scale } from '../../utils/typography';
import {
  vP, vPHd, vPVHd, vPVVHd,
} from '../../utils/gutters';

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.tagline': {
    [presets.Tablet]: {
      display: 'block',
      width: theme.spacing(39),
    },

    color: `${hex2rgba(theme.palette.texasFlag.blue, 0.9)}`,
    display: 'none',
    fontSize: 20,
    marginBottom: '1.5em',
    padding: 0,
    width: theme.spacing(21),
  },

  h1: {
    [presets.Mobile]: {
      width: theme.spacing(30),
    },
    '@media (min-width: 650px)': {
      fontSize: scale(1).fontSize,
      width: theme.spacing(36),
    },
    [presets.Tablet]: {
      fontSize: scale(1.1).fontSize,
      width: theme.spacing(36),
    },
    [presets.Hd]: {
      fontSize: scale(1.4).fontSize,
      width: theme.spacing(42),
    },
    [presets.VHd]: {
      fontSize: scale(1.5).fontSize,
      width: theme.spacing(48),
    },
    [presets.VVHd]: {
      fontSize: scale(1.6).fontSize,
      width: theme.spacing(54),
    },

    ...scale(0.7),
    color: theme.palette.texasFlag.blue,
    lineHeight: 1.2,
    margin: 0,
    marginBottom: '0.5em',
    padding: 0,
    width: theme.spacing(30),
  },

  [presets.Mobile]: {
    paddingBottom: theme.spacing(6),
  },
  [presets.Phablet]: {
    paddingRight: 0,
  },
  [presets.Tablet]: {
    paddingTop: theme.spacing(12),
  },
  [presets.Desktop]: {
    paddingTop: theme.spacing(15),
  },
  [presets.Hd]: {
    paddingTop: theme.spacing(15),
    paddingLeft: vPHd,
    paddingBottom: theme.spacing(9),
  },
  [presets.VHd]: {
    paddingTop: theme.spacing(18),
    paddingLeft: vPVHd,
  },
  [presets.VVHd]: {
    paddingLeft: vPVVHd,
  },

  display: 'flex',
  padding: vP,
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  flexGrow: '0',
  flexShrink: '1',
}));

// Component Definition
const Masthead = () => (
  <StyledRoot>
    <div>
      <h1>
        Texas Music Administrators Conference
      </h1>

      <div className="tagline">
        Supporting Fine Arts Education in Texas
      </div>

      <CtaButton
        buttonColor="blue"
        to="/about/"
      >
        <span>Learn More</span>
        <ArrowForwardIcon />
      </CtaButton>
    </div>
  </StyledRoot>
);

export default Masthead;
