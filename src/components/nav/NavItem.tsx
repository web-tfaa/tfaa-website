// External Dependencies
import { FC } from 'react';
import { Link } from 'gatsby-theme-material-ui';
import clsx from 'clsx';
import styled from 'styled-components';

// Internal Dependencies
import presets from '../../utils/presets';
import { rhythm, scale } from '../../utils/typography';

// Local Typings
interface Props {
  children: React.ReactNode;
  className?: string;
  linkTo: string;
}

// Local Variables
const StyledRoot = styled.li({
  '.active': {
    fontWeight: 600,
  },

  '.navItemLink': {
    '&:hover': {
      opacity: 0.8,
      textDecoration: 'underline',
    },

    ...scale(-1 / 3),
    boxSizing: 'border-box',
    color: 'inherit',
    display: 'inline-block',
    letterSpacing: '0.03em',
    lineHeight: `calc(${presets.headerHeight} - 6px)`,
    padding: `6px ${rhythm(1 / 2)} 0`,
    position: 'relative',
    textDecoration: 'none',
    textTransform: 'uppercase',
    top: 0,
    transition: 'color .15s ease-out',
  },

  display: 'inline-block',
  margin: 0,
});

// Component Definition
const NavItem: FC<Props> = ({ linkTo, children, ...otherProps }) => (
  <StyledRoot>
    <Link
      className="navItemLink"
      getProps={({ isPartiallyCurrent }) =>
        (isPartiallyCurrent && children !== 'TMAC' && children !== 'Sign Out'
          ? { className: clsx('navItemLink', 'active') }
          : {})}
      to={linkTo}
      {...otherProps}
    >
      {children}
    </Link>
  </StyledRoot>
);

export default NavItem;
