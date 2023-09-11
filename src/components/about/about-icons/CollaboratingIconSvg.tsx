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
const CollaboratingIconSvg: FC = ({ ...props }) => {
  return (
    <StyledSvgIcon
      viewBox="0 0 60 60"
      {...props}
    >
      <path
        id="Path_2778"
        data-name="Path 2778"
        d="M10.547,42.188H60V3.516H10.547V0H0V60H10.547ZM56.484,7.031V38.672H10.547V7.031ZM7.031,56.484H3.516V3.516H7.031Z"
        fill="#fff"
      />
      <path
        id="Path_2779"
        data-name="Path 2779"
        d="M180.006,114.327l1.158,1,1.158-1c7.265-6.3,12.853-10,12.853-15.913,0-4.616-3.313-8.414-7.89-8.414a7.46,7.46,0,0,0-6.122,3.2,7.459,7.459,0,0,0-6.121-3.2c-4.576,0-7.891,3.8-7.891,8.414C167.152,104.336,172.779,108.063,180.006,114.327Zm-4.963-20.79c3.121,0,4.29,3.533,4.413,3.936l.382,1.252h2.652l.382-1.252c.123-.4,1.292-3.936,4.413-3.936,2.482,0,4.354,2.1,4.354,4.877,0,3.833-4.062,6.767-10.475,12.245-6.392-5.459-10.475-8.408-10.475-12.245C170.689,95.633,172.561,93.537,175.043,93.537Z"
        transform="translate(-147.667 -79.499)"
        fill="#fff"
      />
    </StyledSvgIcon>
  );
};
export default CollaboratingIconSvg;
