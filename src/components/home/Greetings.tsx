// External Dependencies
import { Typography } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { appName } from '../../utils/app-constants';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.greetingLeft': {
    width: '100%',
  },
  '.greetingRight': {
    padding: theme.spacing(8, 15, 8, 8),
  },

  h4: {
    fontSize: 30,
    marginBottom: theme.spacing(2),
    fontWeight: 500,
  },

  img: {
    left: theme.spacing(-5),
    position: 'relative',
  },

  p: {
    fontSize: 16,
    marginBottom: theme.spacing(2),
  },

  [theme.breakpoints.down('mobile')]: {
    flexWrap: 'wrap',
  },
  background: theme.palette.tfaa.backgroundLight,
  display: 'flex',
  padding: theme.spacing(5, 0, 2.5),
  width: '100%',
}));

// Component Definition
const Greetings: FC = () => {
  return (
    <StyledRoot>
      <div className="greetingLeft">
        <img src="https://res.cloudinary.com/tmac/image/upload/v1670822566/greetings.png"/>
      </div>

      <div className="greetingRight">
        <Typography variant="h4">
          Greetings from TFAA—{appName}
        </Typography>

        <Typography variant="body2">
          TFAA is an organization of fine arts administrators with a common
          goal—the continued pursuit of excellence in fine arts education
          in Texas for all students.
        </Typography>

        <Typography variant="body2">
          We stand together to create a supportive environment so that all
          children in Texas are offered a high-quality fine arts education.
        </Typography>

        <Typography variant="h4">
          Fine Arts Education for All Is Our Priority
        </Typography>
      </div>
    </StyledRoot>
  );
};

export default Greetings;
