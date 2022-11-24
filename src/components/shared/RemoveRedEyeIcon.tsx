// External Dependencies
import React, { FC } from 'react';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import styled from 'styled-components';

// Local Typings
interface Props {
  onClick: () => void;
}

// Local Variable
const StyledRemoveRedEye = styled(RemoveRedEye)({
  height: 20,
  width: 20,
});

// Component Definition
const RemoveRedEyeIcon: FC<Props> = ({ onClick }) => (
  <StyledRemoveRedEye
    onClick={onClick}
  />
);

export default RemoveRedEyeIcon;
