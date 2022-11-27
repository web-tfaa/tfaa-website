// External Dependencies
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { Link } from 'gatsby-theme-material-ui';
import { rhythm, options } from '../../../utils/typography';
import { SidebarDataItem } from './SidebarBody';
import presets from '../../../utils/presets';

// Local Typings
interface Props {
  isNested?: boolean;
  node: SidebarDataItem;
}

// Local Variables
const StyledListItem = styled.li(({ theme }) => {
  const listItemStyles = {
    marginBottom: options.blockMarginBottom / 2,
    lineHeight: 1.3,
    paddingTop: rhythm(1 / 8),
    paddingBottom: rhythm(1 / 8),
  };

  const linkDefaultStyles = {
    '&:before': {
      content: '""',
      height: 4,
      width: 4,
      borderRadius: '100%',
      top: '.5em',
      left: '-.7em',
      fontWeight: 'normal',
      position: 'absolute',
      transform: 'scale(0.1)',
      transition: `all ${presets.animation.speedDefault} ${
        presets.animation.curveDefault
      }`,
      [presets.Hd]: {
        height: 6,
        width: 6,
        top: '.65em',
        marginTop: -3,
        left: '-1em',
      },
    },

    position: 'relative',
    borderBottom: 'none',
    boxShadow: 'none',
    fontWeight: 'normal',
    color: theme.palette.text.secondary,
    fontStyle: false,
  };

  const linkActiveStyles = {
    opacity: 1,
    color: theme.palette.gatsby,
    fontWeight: 'bold',
    '&:before': {
      background: theme.palette.gatsby,
      transform: 'scale(1)',
    },
  };

  return {
    '&.nested': {
      ...listItemStyles,
      '& > .nav-link': {
        ...linkDefaultStyles,
        color: theme.palette.text.secondary,
      },
      '& > .nav-link-active': {
        ...linkActiveStyles,
        color: theme.palette.text.secondary,
        fontWeight: 'normal',
        '&:before': {
          display: 'none',
        },
      },
    },

    '&.root': {
      ...listItemStyles,
      '& > .nav-link': {
        ...linkDefaultStyles,
      },
      '& > .nav-link-active': {
        ...linkActiveStyles,
      },
    },
  };
});

// Component Definition
const SectionLink: FC<Props> = ({
  isNested,
  node,
}) => {
  const { title } = node;

  return (
    <StyledListItem className={isNested ? 'nested' : 'root'}>
      <Link
        activeClassName="nav-link-active"
        className="nav-link"
        to={node.link}
      >
        {title}
      </Link>
    </StyledListItem>
  );
};

export default SectionLink;
