// External Dependencies
import React, { FC } from 'react';
import { Link } from 'gatsby-theme-material-ui';

// Internal Dependencies
import { rhythm, scale, options } from '../../../utils/typography';
import presets, { colors } from '../../../utils/presets';

// Local Typings
interface SidebarBodyProps {
  inline?: boolean;
  yaml: unknown;
}

interface SectionProps {
  headerStyles: unknown;
  index: number;
  isInline: boolean;
  title: string;
}

interface SectionLinksProps {
  isInline: boolean;
  items: unknown;
}

// Component Definitions
const Section: FC<SectionProps> = ({
  headerStyles,
  index,
  title,
  ...otherProps
}) => (
  <div>
    <h3
      css={{
        ...headerStyles,
        marginTop: index === 0 ? 0 : rhythm(3 / 2),
      }}
    >
      {title}
    </h3>

    <SectionLinks
      {...otherProps}
      title={title}
    />
  </div>
);

const SectionLinks: FC<SectionLinksProps> = ({
  isInline,
  items,
}) => {
  const listStyles = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    fontFamily: options.headerFontFamily.join(','),
  };

  return (
    <ul
      css={{
        ...listStyles,
        '& ul': {
          ...listStyles,
        },
      }}
    >
      {/* eslint-disable-next-line react/no-array-index-key */}
      {items.map((item, index) => (
        <SectionLink
          isInline={isInline}
          key={index}
          node={item}
        >
          {item.items}
        </SectionLink>
      ))}
    </ul>
  );
};

const SectionLink: FC = (props) => {
  let childnodes = null;
  if (props.children) {
    childnodes = props.children.map((childnode, index) => (
      <SectionLink
        isNested
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        node={childnode}
      >
        {childnode.items}
      </SectionLink>
    ));
  }

  const item = props.node;

  const { title } = item;

  const styles = {
    listItem: {
      marginBottom: options.blockMarginBottom / 2,
      lineHeight: 1.3,
      paddingTop: rhythm(1 / 8),
      paddingBottom: rhythm(1 / 8),
    },
    linkDefault: {
      position: 'relative',
      borderBottom: 'none',
      boxShadow: 'none',
      fontWeight: 'normal',
      color: colors.gray.text,
      fontStyle: false,
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
    },
    linkActive: {
      opacity: 1,
      color: colors.gatsby,
      fontWeight: 'bold',
      '&:before': {
        background: colors.gatsby,
        transform: 'scale(1)',
      },
    },
  };

  const linkStyle = props.isNested
    ? {
      ...styles.listItem,
      '& .nav-link': {
        ...styles.linkDefault,
        color: colors.gray.text,
      },
      '& .nav-link-active': {
        ...styles.linkActive,
        color: colors.gray.text,
        fontWeight: 'normal',
        '&:before': {
          display: 'none',
        },
      },
    }
    : {
      ...styles.listItem,
      '& > .nav-link': {
        ...styles.linkDefault,
      },
      '& > .nav-link-active': {
        ...styles.linkActive,
      },
    };

  return (
    <li
      css={linkStyle}
      key={item.title}
    >
      {item.link.charAt(0) === '#' ? (
        <a
          className="nav-link"
          href={item.link}
        >
          {title}
        </a>
      ) : (
        <Link
          activeClassName="nav-link-active"
          className="nav-link"
          to={item.link}
        >
          {title}
        </Link>
      )}
      {childnodes ? <ul>{childnodes}</ul> : null}
    </li>
  );
};

const SidebarBody: FC<SidebarBodyProps> = ({
  inline: isInline,
  yaml: menu
}) => {
  // Use original sizes on mobile as the text is inline
  // but smaller on > tablet so as not to compete with body text.
  const fontSize = isInline
    ? scale(0).fontSize
    : scale(-2 / 10).fontSize;

  const headerStyles = isInline
    ? {
      fontSize: scale(2 / 5).fontSize,
    }
    : {
      fontSize: scale(-2 / 5).fontSize,
      fontWeight: 600,
      color: colors.texasFlagBlue,
      textTransform: 'uppercase',
      letterSpacing: '.15em',
    };

  return (
    <div
      className="docSearch-sidebar"
      css={{
        padding: isInline ? 0 : rhythm(3 / 4),
      }}
    >
      {menu.map((section, index) => (
        <div
          css={{ fontSize }}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        >
          <Section
            {...section}
            headerStyles={headerStyles}
            index={index}
            isInline={isInline}
            title={section.title}
          />
        </div>
      ))}
    </div>
  );
};

export default SidebarBody;
