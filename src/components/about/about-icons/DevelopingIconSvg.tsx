// External Dependencies
import React, { FC } from 'react';
import { SvgIcon } from '@mui/material';
import styled from 'styled-components';

// Local Variables
const StyledSvgIcon = styled(SvgIcon)({
  height: 60,
  width: 60,
});

// Component Definition
const DevelopingIconSvg: FC = ({ ...props }) => {
  return (
    <StyledSvgIcon
      viewBox="0 0 60 60"
      {...props}
    >
      <path
        id="Path_2783"
        data-name="Path 2783"
        d="M36.734,3.516H21.094V0H0V16.352l3.516,7.031V42.3H0V60H16.235l7.031-3.516H42.422V60H60V43.648l-3.516-7.031V17.7H60V0H43.765ZM3.516,15.523V3.516H17.578V14.18h3.516V7.031h3.516v8.178L17.578,22.24v13.7l-1.343-.671h-9.2V22.554Zm34.3,23.266H23.266L21.094,37.7V23.7l2.486-2.486H36.734L38.906,22.3V36.617ZM22.437,52.969l-7.031,3.516H3.516V45.82H14.063V42.3H7.031V38.789h8.374L22.437,42.3H36.062l-.671,1.343v9.321Zm34.048-8.492V56.484H45.937V45.82H42.422v7.148H38.906V44.477l3.516-7.031V24.055l1.343.671h9.2V37.446Zm0-40.962V14.18H45.937V17.7h7.031v3.516H44.594L37.563,17.7H27.1l1.029-1.029V7.031h9.438l7.031-3.516Z"
        fill="#fff"
      />
    </StyledSvgIcon>
  );
};
export default DevelopingIconSvg;
