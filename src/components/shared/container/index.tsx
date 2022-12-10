// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import presets from '../../../utils/presets';
import { rhythm, options } from '../../../utils/typography';

// Local Typings
interface Props {
  children: React.ReactNode;
  className?: string;
  hasSideBar?: boolean;
}
interface StyledRootProps {
  $hasSideBar?: boolean;
}

// Local Variables
const StyledRoot = styled.div<StyledRootProps>(({ $hasSideBar, theme }) => ({
  [theme.breakpoints.up('mobile')]: {
    paddingBottom: rhythm(1.5),
  },

  margin: '0 auto',
  maxWidth: $hasSideBar ? rhythm(presets.maxWidthWithSidebar) : rhythm(presets.maxWidth),
  padding: `${rhythm(1.5)} ${rhythm(options.blockMarginBottom)}`,
  paddingBottom: rhythm(3.5),
  position: 'relative',
}));

// Component Definition
const Container: FC<Props> = ({
  children,
  className,
  hasSideBar = true,
  ...otherProps
}) => (
  <StyledRoot
    $hasSideBar={hasSideBar}
    className={className}
    {...otherProps}
  >
    {children}
  </StyledRoot>
);

export default Container;
