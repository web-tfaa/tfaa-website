// External Dependencies
import React, { FC } from 'react';
import { SvgIcon } from '@mui/material';
import styled from 'styled-components';

// Local Variables
const StyledSvgIcon = styled(SvgIcon)({
  '&&': {
    height: 60,
    width: 60,
  },
});

// Component Definition
const AdvocatingIconSvg: FC = ({ ...props }) => {
  return (
    <StyledSvgIcon
      viewBox="0 0 38.671 60"
      {...props}
    >
      <path
        d="M99.067,39.54l1.282,1.282-9.238,9.237L101.051,60l9.251-9.25,9.429,9.237,9.94-9.94-9.429-9.237,1.14-1.14a28.2,28.2,0,0,0,7.992-17.775C130.124,11.132,122.827,1.109,112.1.089A19.229,19.229,0,0,0,91,19.455,28.275,28.275,0,0,0,99.067,39.54Zm25.608,10.532-4.97,4.969-6.919-6.778,4.97-4.969ZM111.766,3.587c8.415.8,14.741,8.9,14.1,18.063A24.645,24.645,0,0,1,118.9,37.185L101.051,55.029l-4.97-4.97,15.1-15.1a25.818,25.818,0,0,0,7.459-14.417,8.55,8.55,0,1,0-16.8.258,26.928,26.928,0,0,0,6.013,12.521l-5.013,5.012-1.282-1.282a24.653,24.653,0,0,1-7.037-17.644A15.706,15.706,0,0,1,111.766,3.587Zm-1.494,27.166a23.48,23.48,0,0,1-4.988-10.621,5.063,5.063,0,0,1,5.069-6.074,5.131,5.131,0,0,1,4.809,5.964A21.6,21.6,0,0,1,110.272,30.753Z"
        transform="translate(-91 0.001)"
        fill="#fff"
      />
    </StyledSvgIcon>
  );
};
export default AdvocatingIconSvg;
