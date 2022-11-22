// Internal Dependencies
import { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { options } from '../../utils/typography';

// Local Typings
interface Props {
  children: React.ReactNode;
  href: string;
}

// Local Variables
const StyledAnchor = styled.a(({ theme }) => ({
  fontFamily: options.headerFontFamily.join(','),
  marginBottom: theme.spacing(2),
}));

// Component Definition
const FuturaAnchor: FC<Props> = ({ children, href, ...props }) => (
  <StyledAnchor
    {...props}
    href={href}
  >
    {children}
  </StyledAnchor>
);

export default FuturaAnchor;
