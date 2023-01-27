// External Dependencies
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { WHERE_WE_HAVE_BEEN_DATA } from './about-constants';
import WhatWeDoItem from '../home/WhatWeDoItem';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.whereTitle': {
    fontSize: 40,
    fontWeight: 900,
    textTransform: 'uppercase',
  },

  '.whereDataContainer': {
    columnGap: theme.spacing(6),
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(12, 20),
    width: '100%',
  },

  backgroundColor: theme.palette.tfaa.about,
  color: theme.palette.common.white,
  padding: theme.spacing(4, 12),
  width: '100%',
}));

// Component Definition
const WhereWeHaveBeen: FC = () => {
  return (
    <StyledRoot>
      <Typography className="whereTitle">
        Take a look back at where we&apos;ve been
      </Typography>

      <div className="whereDataContainer">
        {WHERE_WE_HAVE_BEEN_DATA.map((item) => (
          <WhatWeDoItem
            buttonText="View"
            imgSrc={item.imgSrc}
            key={item.title}
            subtitle={item.subtitle}
            title={item.title}
            to={item.to}
          />
        ))}
      </div>
    </StyledRoot>
  );
};

export default WhereWeHaveBeen;
