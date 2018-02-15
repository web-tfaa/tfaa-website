// External Dependencies
import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

// Internal Dependencies
import typography, { rhythm, scale, options } from "../utils/typography"
import presets, { colors } from "../utils/presets"

// Local Variables
const accentColor = colors.gatsby

const UnorderedList = styled.ul`
  list-style: none,
  margin: 0;
  padding: 0;
  font-family: typography.options.headerFontFamily.join(`,`);
  & li: {
    margin-bottom: options.blockMarginBottom / 2;
    line-height: 1.3;
    padding-top: rhythm(1 / 8);
    padding-bottom: rhythm(1 / 8);
    "& .nav-link": {
      position: `relative`,
      "&:before": {
        content: ` `,
        height: 4,
        width: 4,
        border-radius: `100%`,
        top: `.5em`,
        left: `-.7em`,
        font-weight: `normal`,
        position: `absolute`,
        transform: `scale(0.1)`,
        transition: `all ${presets.animation.speedDefault} ${
          presets.animation.curveDefault
        }`,
        [presets.Hd]: {
          height: 6,
          width: 6,
          top: `.65em`,
          margin-top: -3,
          left: `-1em`,
        },
      },
    },
    "& .nav-link-active": {
      opacity: 1,
      color: accentColor,
      font-weight: 600,
      "&:before": {
        background: accentColor,
        transform: `scale(1)`,
      },
    },
  },
`;

const SectionLinkListItem = styled.li`
  &&: {
    & .nav-link: {
      border-bottom: `none`,
      box-shadow: `none`,
      color: colors.gray.text,
      font-weight: `normal`,
      font-style: false,
    },
    & .nav-link-active: {
      color: accentColor,
      font-weight: `bold`,
      font-style: false,
    },
  },
`;


const SectionH3 = styled.h3()

const Section = props => (
  <div>
    <h3
      css={{
        ...props.headerStyles,
        marginTop: props.index === 0 ? 0 : rhythm(3 / 2),
      }}
    >
      {props.title}
    </h3>
    <SectionLinks
      {...props}
      title={props.title}
      isTutorial={props.title === `Tutorial`}
    />
  </div>
)

const SectionLinks = props => {
  const tutorialStyles = props.isTutorial
    ? {
        "&&": {
          "& > li": {
            marginBottom: `1rem`,
            "& > .nav-link": {
              fontWeight: `bold`,
            },
          },
        },
      }
    : false

  return (
    <ul
      css={{
        ...listStyles,
        "& ul": {
          ...listStyles,
        },
        ...tutorialStyles,
      }}
    >
      {props.items.map((item, index) => (
        <SectionLink
          node={item}
          children={item.items}
          key={index}
          isInline={props.isInline}
        />
      ))}
    </ul>
  )
}


const SectionLink = props => {
  // Don't show the main docs link on mobile as we put these
  // links on that main docs page so it's confusing to have
  // the page link to itself.
  if (props.isInline && props.node.link === `/docs/`) {
    return null
  }

  let childnodes = null
  if (props.children) {
    childnodes = props.children.map((childnode, index) => (
      <SectionLink key={index} node={childnode} children={childnode.items} />
    ))
  }

  const item = props.node

  return (
    <SectionLinkListItem key={item.title}>
      {item.link.charAt(0) == `#` ? (
        <a href={item.link} className="nav-link">
          {item.title}
        </a>
      ) : (
        <Link
          to={item.link}
          activeClassName="nav-link-active"
          className="nav-link"
          exact
        >
          {title}
        </Link>
      )}
      {childnodes ? <ul>{childnodes}</ul> : null}
    </SectionLinkListItem>
  )
}


// Component Definition
class SidebarBody extends React.Component {
  render() {
    const menu = this.props.yaml
    const isInline = this.props.inline

    // Use original sizes on mobile as the text is inline
    // but smaller on > tablet so as not to compete with body text.
    const fontSize = isInline ? scale(0).fontSize : scale(-2 / 10).fontSize
    const headerStyles = isInline
      ? {
          fontSize: scale(2 / 5).fontSize,
        }
      : {
          fontSize: scale(-2 / 5).fontSize,
          color: colors.lilac,
          textTransform: `uppercase`,
          letterSpacing: `.15em`,
          fontWeight: `normal`,
        }

    return (
      <div
        css={{
          padding: isInline ? 0 : rhythm(3 / 4),
        }}
        className="docSearch-sidebar"
      >
        {menu.map((section, index) => (
          <div
            key={index}
            css={{
              fontSize,
            }}
          >
            <Section
              {...section}
              title={section.title}
              headerStyles={headerStyles}
              index={index}
              isInline={isInline}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default SidebarBody
