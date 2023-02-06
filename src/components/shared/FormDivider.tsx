// External Dependencies:
import Divider from '@mui/material/Divider';
import React from 'react';
import styled from 'styled-components';

// Local Variables
const StyledDivider = styled(Divider)(({ theme }) => ({
  '&.formDivider': {
    backgroundColor: theme.palette.tfaa.resources,
    height: 3,
    margin: theme.spacing(1, 0, 4),
  },
}));

// Component Definition
const FormDivider: React.FC = ({ ...otherProps }) => {
  return (
    <StyledDivider
      className="formDivider"
      {...otherProps}
    />
  );
};

export default FormDivider;
