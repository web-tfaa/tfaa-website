// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import presets from '../../utils/presets';

// Local Typings
interface Props {
  children: React.ReactNode;
}

// Local Variables
const StyledRoot = styled.div({
  '.mobileHr': {
    border: 0,
    height: 2,
    marginTop: 10,
  },
  [presets.Tablet]: {
    display: 'none',
  },

  display: 'block',
});

// Component Definition
const MobileDivider: FC<Props> = ({ children }) => (
  <StyledRoot>
    <hr className="mobileHr" />
    {children}
  </StyledRoot>
);

export default MobileDivider;
