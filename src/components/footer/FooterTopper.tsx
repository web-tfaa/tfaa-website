// External Dependencies
import React from 'react';
import styled from 'styled-components';

// Local Typings
type FooterTopperColor = 'about' | 'events' | 'membership' | 'resources';
interface Props {
  color: FooterTopperColor;
}
interface StyledRootProps {
  $color: FooterTopperColor;
}

// Local Variables
const StyledRoot = styled.section<StyledRootProps>(({
  $color = 'about',
  theme,
}) => ({
  [theme.breakpoints.down('mobile')]: {
    padding: theme.spacing(6, 0),
  },
  backgroundColor: theme.palette.tfaa[$color],
  content: '""',
  padding: theme.spacing(8,0 ),
  width: '100%',
}));

// Component Definition
const FooterTopper: React.FC<Props> = ({ color }) => {
  return (
    <StyledRoot $color={color} />
  );
};

export default FooterTopper;
