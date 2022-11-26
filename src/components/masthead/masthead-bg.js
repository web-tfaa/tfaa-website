// External Dependencies
import React from 'react';
import styled, { useTheme } from 'styled-components';

// Internal Dependencies
import presets from '../../utils/presets';
import { rhythm } from '../../utils/typography';

// Local Variables
const vPOff = rhythm(presets.gutters.default - presets.logoOffset);
const vPHdOff = rhythm(presets.gutters.HdR - presets.logoOffset);
const vPVHdOff = rhythm(presets.gutters.VHdR - presets.logoOffset);
const vPVVHdOff = rhythm(presets.gutters.VVHdR - presets.logoOffset);

const cover = {
  bottom: 0,
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
};

const StyledRoot = styled.div(({ theme }) => ({
  '.masthead-bg-left': {
    [presets.Hd]: {
      left: vPHdOff,
    },
    [presets.VHd]: {
      left: vPVHdOff,
    },
    [presets.VVHd]: {
      left: vPVVHdOff,
    },

    ...cover,
    left: vPOff,
    zIndex: -2,
    width: '100%',
    height: '100%',
  },

  '.masthead-bg-left-fill': {
    [presets.Hd]: {
      width: vPHdOff,
    },
    [presets.VHd]: {
      width: vPVHdOff,
    },
    [presets.VVHd]: {
      width: vPVVHdOff,
    },

    ...cover,
    right: 'auto',
    width: vPOff,
    zIndex: -10,
    background: theme.palette.ui.light,
  },

  '.masthead-bg-right': {
    ...cover,
    width: 'calc(180% - + 4vh)',
    height: '100%',
    zIndex: -1,
    top: '2%',
  },

  ...cover,
  overflow: 'hidden',
  zIndex: -1,
}));

// Component Definition
const MastheadBg = () => {
  const theme = useTheme();

  return (
    <StyledRoot className="masthead-bg">
      <div className="masthead-bg-left-fill" />

      <svg
        viewBox="0 0 10 10"
        preserveAspectRatio="xMinYMin slice"
        className="masthead-bg-left"
      >
        <polygon
          fill={theme.palette.ui.light}
          points="-5,-5 15,15 -5,15 "
        />
      </svg>

      <style>
        {`
            .masthead-bg-right-light {
              fill: ${theme.palette.texasFlag.blue};
            }
            @media (max-width: 650px),
            (max-width: 768px) and (orientation:portrait) {
              .masthead-bg-right {
                width: calc(160% + 4vh);
              }
              .masthead-bg-right-light {
                fill: ${theme.palette.texasFlag.red};
              }
            }
            ${presets.Phablet} {
              .masthead-bg-right {
                width: calc(130% + 2vh);
                top: 0;
              }
              .masthead-bg-right-light {
                fill: ${theme.palette.texasFlag.red};
              }
            }
            ${presets.Tablet} {
              .masthead-bg-right {
                width: calc(125% + 4vh);
              }
              .masthead-bg-right-light {
                fill: ${theme.palette.texasFlag.red};
              }
            }
            ${presets.Desktop}  {
              .masthead-bg-right {
                width: 110%;
              }
              .masthead-bg-right-light {
                fill: ${theme.palette.texasFlag.red};
              }
            }
            ${presets.Hd}  {
              .masthead-bg-right {
                width: calc(100%);
              }
            }
          `}
      </style>

      <svg
        viewBox="0 0 10 10"
        preserveAspectRatio="xMidYMin meet"
        className="masthead-bg-right"
      >
        <svg
          x="-15%"
          y="-10%"
          style={{
            overflow: 'visible',
          }}
        >
          <rect
            className="masthead-bg-right-light"
            width="10000%"
            height="10000%"
            fill={theme.palette.texasFlag.red}
            transform="rotate(45 100 50) translate(1 0)"
          />
          <rect
            className="masthead-bg-left-dark"
            width="10000%"
            height="10000%"
            fill={theme.palette.texasFlag.blue}
            transform="rotate(45 100 50) translate(1.25 0)"
          />
        </svg>
      </svg>
    </StyledRoot>
  );
};

export default MastheadBg;
