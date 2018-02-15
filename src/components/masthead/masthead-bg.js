// External Dependencies
import React from "react";
import styled from 'styled-components';

// Internal Dependencies
import presets, { colors } from "../../utils/presets"
import { rhythm, scale, options } from "../../utils/typography"
import { vP, vPHd, vPVHd, vPVVHd } from "../../utils/gutters"


// Local Variables
const vPOff = rhythm(presets.gutters.default - presets.logoOffset)
const vPHdOff = rhythm(presets.gutters.HdR - presets.logoOffset)
const vPVHdOff = rhythm(presets.gutters.VHdR - presets.logoOffset)
const vPVVHdOff = rhythm(presets.gutters.VVHdR - presets.logoOffset)

// const cover = {
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   position: absolute,
// }

const BackgroundWrapper = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  overflow: hidden;
  z-index: -1;
`;

const LeftFill = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  right: auto,;
  width: vPOff;
  z-index: -10;
  background: colors.ui.light;
  [presets.Hd]: {
    width: vPHdOff;
  }
  [presets.VHd]: {
    width: vPVHdOff;
  }
  [presets.VVHd]: {
    width: vPVVHdOff;
  }
`;

const LeftSvg = styled.svg`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  left: vPOff;
  z-index: -2;
  [presets.Hd]: {
    left: vPHdOff;
  }
  [presets.VHd]: {
    left: vPVHdOff;
  }
  [presets.VVHd]: {
    left: vPVVHdOff;
  }
  width: 100%;
  height: 100%;
`;

const RightSvg = styled.svg`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  width: calc(180% - + 4vh);
  height: 100%;
  z-index: -1;
  top: 2%;
`;

const InnerSvg = styled.svg`
  overflow: visible;
`;

// Component Definition
const MastheadBg = () => (
  <BackgroundWrapper className="masthead-bg">
    <LeftFill className="masthead-bg-left-fill" />
    <LeftSvg
      viewBox="0 0 10 10"
      preserveAspectRatio="xMinYMin slice"
      className="masthead-bg-left"
    >
      <polygon fill={colors.ui.light} points="-5,-5 15,15 -5,15 " />
    </LeftSvg>
    <style>
      {`
          .masthead-bg-right-light {
            fill: ${colors.gatsby};
          }
          @media (max-width: 650px),
          (max-width: 768px) and (orientation:portrait) {
            .masthead-bg-right {
              width: calc(160% + 4vh);
            }
          }
          ${presets.Phablet} {
            .masthead-bg-right {
              width: calc(130% + 2vh);
              top: 0;
            }
          }
          ${presets.Tablet} {
            .masthead-bg-right {
              width: calc(125% + 4vh);
            }
          }
          ${presets.Desktop}  {
            .masthead-bg-right {
              width: 110%;
            }
            .masthead-bg-right-light {
              fill: ${colors.lilac};
            }
          }
          ${presets.Hd}  {
            .masthead-bg-right {
              width: calc(100%);
            }
          }
        `}
    </style>
    <RightSvg
      viewBox="0 0 10 10"
      preserveAspectRatio="xMidYMin meet"
      className="masthead-bg-right"
    >
      <InnerSvg
        x="-15%"
        y="-10%"
      >
        <rect
          className="masthead-bg-right-light"
          width="10000%"
          height="10000%"
          fill={colors.lilac}
          transform="rotate(45 100 50) translate(0 0)"
        />
        <rect
          className="masthead-bg-left-dark"
          width="10000%"
          height="10000%"
          fill={colors.gatsby}
          transform="rotate(45 100 50) translate(1.25 0)"
        />
        {/*<polygon fill="blue" points="0,10 10,0 10,10" />*/}
      </InnerSvg>
    </RightSvg>
  </BackgroundWrapper>
)

export default MastheadBg
