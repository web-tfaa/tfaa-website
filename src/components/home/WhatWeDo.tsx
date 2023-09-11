// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import WhatWeDoItem from './WhatWeDoItem';
import { WHAT_WE_DO_DATA } from './home-constants';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    padding: theme.spacing(8, 6),
  },
  [theme.breakpoints.down('mobile')]: {
    padding: theme.spacing(3, 2),
  },

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
