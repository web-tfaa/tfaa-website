// External Dependencies
import { SvgIconProps } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Local Typings
interface Props {
  title: string;
  icon?: (props: SvgIconProps) => ReactElement<SvgIconProps>;
  description: string;
}

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  h5: {
    color: theme.palette.common.white,
    fontSize: 25,
    fontWeight: 600,
    margin: theme.spacing(2, 0),
  },

  color: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
  width: 200,
}));

// Component Definition
const AboutVirtueItem: FC<Props> = ({
  title,
  icon: Icon,
  description,
}) => {
  return (
    <StyledRoot>
      <Box
        height={60}
        width={60}
      >
        {Icon && <Icon />}
      </Box>

      <Typography variant="h5">
        {title}
      </Typography>

      <Typography variant="body2">
        {description}
      </Typography>
    </StyledRoot>
  );
};

export default AboutVirtueItem;
