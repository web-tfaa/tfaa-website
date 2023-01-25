// External Dependencies
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';
import { ABOUT_VIRTUES_DATA } from './about-constants';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.aboutDescription': {
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 1.1,
  },

  '.officersContainer': {
    display: 'flex',
    flexWrap: 'wrap',
  },

  '.peopleTitle': {
    fontWeight: 900,
    marginBottom: theme.spacing(4),
  },
  '.officersTitle': {
    fontWeight: 900,
  },

  padding: theme.spacing(4, 15),
  width: '100%',
}));

// Component Definition
const Officers: FC = () => {
  return (
    <StyledRoot>
      <Typography
        className="peopleTitle"
        variant="h5"
      >
        People Dedicated to Fine Arts
        Education
      </Typography>

      <Typography
        className="officersTitle"
        variant="h6"
      >
        {appNameShort} Officers
      </Typography>

      <div className="officersContainer">
        {ABOUT_VIRTUES_DATA.map((virtue) => (
          <div key={virtue.title}>{virtue.title}</div>
        ))}
      </div>
    </StyledRoot>
  );
};

export default Officers;
