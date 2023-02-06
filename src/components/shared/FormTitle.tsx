// External Dependencies:
import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import styled from 'styled-components';

// Local Typings
interface Props extends TypographyProps {
  children: React.ReactNode;
  component?: React.ElementType;
}

// Local Variables
const StyledTypography = styled(Typography)({
  '&.formTitle': {
    fontSize: 34,
    fontWeight: 900,
  },
}) as typeof Typography;

// Component Definition
const FormTitle: React.FC<Props> = ({
  children,
  component = 'h3',
  ...otherProps
}) => {
  return (
    <StyledTypography
      className="formTitle"
      component={component}
      {...otherProps}
    >
      {children}
    </StyledTypography>
  );
};

export default FormTitle;
