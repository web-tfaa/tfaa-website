// External Dependencies:
import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import styled from 'styled-components';

// Local Typings
interface Props extends TypographyProps {
  children: React.ReactNode;
  component?: React.ElementType;
  fontSize?: number;
}
interface StyledTypographyProps extends TypographyProps {
  $fontSize?: number;
}

// Local Variables
const StyledTypography = styled(Typography)<StyledTypographyProps>(({
  $fontSize,
}) => ({
  '&.formTitle': {
    fontSize: $fontSize,
    fontWeight: 900,
  },
})) as typeof Typography;

// Component Definition
const FormTitle: React.FC<Props> = ({
  children,
  component = 'h3',
  fontSize = 34,
  ...otherProps
}) => {
  return (
    <StyledTypography
      className="formTitle"
      component={component}
      $fontSize={fontSize}
      {...otherProps}
    >
      {children}
    </StyledTypography>
  );
};

export default FormTitle;
