// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import WhatWeDoItem from './WhatWeDoItem';
import { WHAT_WE_DO_DATA } from './home-constants';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  [theme.breakpoints.down('mobile')]: {
    flexWrap: 'wrap',
    // padding: theme.spacing(8),
    padding: theme.spacing(8, 2),
    // columnGap: theme.spacing(3),
  },
  [theme.breakpoints.down('md')]: {
    // flexWrap: 'wrap',
    // padding: theme.spacing(8),
    // columnGap: theme.spacing(3),
    // marginBottom: theme.spacing(3),
    // flexDirection: 'column',
    // justifyContent: 'center',
  },
  // border: '1px solid hotpink',
  // backgroundColor: 'aliceblue',

  background: theme.palette.tfaa.background,
  columnGap: theme.spacing(6),
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(12, 20),
  width: '100%',
}));

// Component Definition
const WhatWeDo: FC = () => {
  return (
    <StyledRoot className="whatWeDo">
      {WHAT_WE_DO_DATA.map((item) => (
        <WhatWeDoItem
          imgSrc={item.imgSrc}
          key={item.title}
          subtitle={item.subtitle}
          title={item.title}
          to={item.to}
        />
      ))}
    </StyledRoot>
  );
};

export default WhatWeDo;
