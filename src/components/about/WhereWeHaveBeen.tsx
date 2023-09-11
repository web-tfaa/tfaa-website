// External Dependencies
import Typography from '@mui/material/Typography';
import React from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { WHERE_WE_HAVE_BEEN_DATA } from './about-constants';
import WhatWeDoItem from '../home/WhatWeDoItem';

// Local Typings
type WhereWeHaveBeenColor = 'about' | 'events' | 'membership' | 'resources';
interface Props {
  color: WhereWeHaveBeenColor;
}
interface StyledRootProps {
  $color: WhereWeHaveBeenColor;
}

// Local Variables
const StyledRoot = styled.section<StyledRootProps>(({
  $color = 'about',
  theme,
}) => ({
  '.whereTitle': {
    [theme.breakpoints.down('md')]: {
      fontSize: 32,
    },
    [theme.breakpoints.down('mobile')]: {
      fontSize: 24,
    },
    fontSize: 40,
    fontWeight: 900,
    textTransform: 'uppercase',
  },

  '.whereDataContainer': {
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(8, 5),
    },
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
      marginTop: theme.spacing(8),
      padding: theme.spacing(1),
      textAlign: 'center',
    },
    columnGap: theme.spacing(6),
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(12, 20),
    width: '100%',
  },

  [theme.breakpoints.down('mobile')]: {
    padding: theme.spacing(4),
  },
  backgroundColor: theme.palette.tfaa[$color],
  color: theme.palette.common.white,
  padding: theme.spacing(4, 12),
  width: '100%',
}));

// Component Definition
const WhereWeHaveBeen: React.FC<Props> = ({ color }) => {
  return (
    <StyledRoot $color={color}>
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
