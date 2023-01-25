// External Dependencies
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';
import { ABOUT_VIRTUES_DATA } from './about-constants';
import AboutVirtueItem from './AboutVirtueItem';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.aboutDescription': {
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 1.1,
  },

  '.aboutVirtuesContainer': {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: theme.spacing(8, 0, 6),
  },

  backgroundColor: theme.palette.tfaa.about,
  color: theme.palette.common.white,
  padding: theme.spacing(4, 12),
  width: '100%',
}));

// Component Definition
const AboutInfo: FC = () => {
  return (
    <StyledRoot>
      <Typography className="aboutDescription">
        {appNameShort} is an organization dedicated to empowering
        leaders in the Fine Arts educational community. We provide
        conferences, workshops, trainings, and resources for
        Fine Arts administrators. Our goal is to help Fine Arts
        educational leaders thrive by providing a space where
        they can grow, collaborate, and support one another.
      </Typography>

      <div className="aboutVirtuesContainer">
        {ABOUT_VIRTUES_DATA.map((virtue) => (
          <AboutVirtueItem
            description={virtue.description}
            icon={virtue.icon}
            key={virtue.title}
            title={virtue.title}
          />
        ))}
      </div>
    </StyledRoot>
  );
};

export default AboutInfo;
