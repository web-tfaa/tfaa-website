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
  },
  background: theme.palette.tfaa.background,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(5, 20),
  width: '100%',
}));

// Component Definition
const WhatWeDo: FC = () => {
  return (
    <StyledRoot className="whatWeDo">
      {WHAT_WE_DO_DATA.map((item) => (
        <WhatWeDoItem
          altText={item.altText}
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
