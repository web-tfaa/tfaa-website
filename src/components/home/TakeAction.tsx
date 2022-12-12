// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import TakeActionItem from './TakeActionItem';
import { TAKE_ACTION_DATA } from './home-constants'

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  [theme.breakpoints.down('mobile')]: {
    flexWrap: 'wrap',
  },
  display: 'flex',
  width: '100%',
}));

// Component Definition
const TakeAction: FC = () => {
  return (
    <StyledRoot>
      {TAKE_ACTION_DATA.map((item) => (
        <TakeActionItem
          color={item.color}
          key={item.title}
          subtitle={item.subtitle}
          title={item.title}
        />
      ))}
    </StyledRoot>
  );
};

export default TakeAction;
