// External Dependencies
import { Link } from 'gatsby-theme-material-ui';
import React, { FC } from 'react';
import clsx from 'clsx';
import styled from 'styled-components';

// Internal Dependencies
import { scale } from '../../utils/typography';

// Local Typings
interface Props {
  children: React.ReactNode;
  className?: string;
  linkTo: string;
}

// Local Variables
const StyledRoot = styled.li(({ theme }) => ({
  '.active': {
    fontWeight: 600,
  },

  '.navItemLink': {
    '&:hover': {
      opacity: 0.8,
      textDecoration: 'underline',
    },

    [theme.breakpoints.down('lg')]: {
      fontSize: 16,
      padding: theme.spacing(0, 1.5),
    },

    ...scale(-1 / 3),
    boxSizing: 'border-box',
    color: 'inherit',
    display: 'inline-block',
    fontSize: 18,
    letterSpacing: '0.03em',
    padding: theme.spacing(0, 2),
    position: 'relative',
    textDecoration: 'none',
    textTransform: 'none',
    top: 0,
    transition: 'color .15s ease-out',
  },

  display: 'inline-block',
  margin: 0,
}));

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
