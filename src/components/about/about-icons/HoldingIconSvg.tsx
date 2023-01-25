// External Dependencies
import { SvgIcon } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

// Local Variables
const StyledSvgIcon = styled(SvgIcon)({
  // height: 60,
  // width: 60,
});

// Component Definition
const HoldingIconSvg: FC = ({ ...props }) => {
  return (
    <StyledSvgIcon
      height="60"
      viewBox="0 0 60 60"
      width="60"
      {...props}
    >
      <path
        id="Path_2781"
        data-name="Path 2781"
        d="M165.933,30.009A15,15,0,1,0,151,15.076,14.95,14.95,0,0,0,165.933,30.009Zm-10.452-12.8h4.107a30.081,30.081,0,0,0,1.17,7.189A10.7,10.7,0,0,1,155.481,17.209Zm12.525-4.267h-4.146c.269-4.659,1.377-7.541,2.073-8.459C166.63,5.4,167.737,8.283,168.006,12.942Zm0,4.267c-.271,4.629-1.383,7.465-2.072,8.34-.688-.875-1.8-3.711-2.072-8.34Zm3.1,7.189a30.13,30.13,0,0,0,1.17-7.191h4.107A10.7,10.7,0,0,1,171.108,24.4Zm5.282-11.456h-4.111A30.578,30.578,0,0,0,171.1,5.621,10.831,10.831,0,0,1,176.391,12.942ZM160.772,5.621a30.574,30.574,0,0,0-1.184,7.322h-4.111A10.831,10.831,0,0,1,160.772,5.621Z"
        transform="translate(-135.933)"
        fill="#fff"
      />
      <path
        id="Path_2782"
        data-name="Path 2782"
        d="M10.664,112.324H49.336V100.808L60,86.3V61H49.336V79.07l-4.243-4.121L30,89.605,14.908,74.949,10.664,79.07V61H0V86.3l10.664,14.51ZM47.578,82.191,39.3,90.226,41.79,92.64,52.852,81.9V64.414h3.633V85.2L45.82,99.715v9.2H31.758V92.727L45.092,79.778ZM3.516,85.2V64.414H7.148V81.9L18.21,92.64,20.7,90.226l-8.274-8.035,2.485-2.413L28.242,92.727V108.91H14.18v-9.2Z"
        transform="translate(0 -52.324)"
        fill="#fff"
      />
    </StyledSvgIcon>
  );
};
export default HoldingIconSvg;
