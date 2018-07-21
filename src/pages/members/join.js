// External Dependencies
import format from 'date-fns/format';
import Helmet from 'react-helmet';
// import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Internal Dependencies
import Container from '../../components/shared/container';
import Status from './status';
import Card from '../../components/shared/cards/card';
import CardHeadline from '../../components/shared/cards/card-headline';
import Cards from '../../components/shared/cards';
// import FuturaParagraph from '../../components/shared/futura-paragraph';
import presets from '../../utils/presets';
import { options } from '../../utils/typography';
import { firebase } from '../../firebase';

// Sidebar Data
import SidebarBody from '../../components/shared/sidebar/sidebar-body';
import membersSidebar from './members-links.yml';

// Local Variables
// const propTypes = {
//   contentfulFileShareData: PropTypes.array,
//   contentfulFileShareDescriptionData: PropTypes.array,
// };
//
// const defaultProps = {
//   contentfulFileShareData: null,
//   contentfulFileShareDescriptionData: null,
// }
//
// const futuraStyles = {
//   fontFamily: options.headerFontFamily.join(`,`),
//   lineHeight: '1.6',
//   marginBottom: '1rem',
// };

// Local Components
// const FuturaDiv = ({ children }) => (
//   <div css={futuraStyles}>
//     {children}
//   </div>
// );
//
// const FuturaAnchor = ({ children, href }) => (
//   <a href={href} css={futuraStyles}>
//     {children}
//   </a>
// );
//
// const MemberFileShareCard = ({ node, description }) => {
//   console.log('node in MemberFileShareCard', node);
//   return (
//     <Card>
//       <CardHeadline>{node.title}</CardHeadline>
//       <h5 css={{ marginTop: '1rem' }}>{format(node.date, ['MMMM DD YYYY'])}</h5>
//       <FuturaDiv>{description}</FuturaDiv>
//       <FuturaAnchor download href={node.link}>Download</FuturaAnchor>
//     </Card>
//   );
// };

// Component Definition
class JoinContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser =>
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }))
    );
  }

  render() {
    const {
      authUser,
    } = this.state;

    const isAuthenticated = Boolean(authUser);

    return (
      <div css={{
        paddingLeft: 0,
        width: `0 auto`,
        [presets.Tablet]: {
          paddingLeft: !isAuthenticated ? '1.5rem' : 0,
        },
      }}>
        <Status authUser={authUser} />
        <Container>
          <Helmet>
            <title>TMAC | Join TMAC</title>
          </Helmet>
          <Cards>
            hey there
          </Cards>
        </Container>

        <div
          css={{
            display: `block`,
            [presets.Tablet]: {
              display: `none`,
            },
          }}
        >
          <hr css={{
            border: 0,
            height: 2,
            marginTop: 10,
          }} />
          <SidebarBody inline yaml={membersSidebar} />
        </div>
      </div>
    );
  }
}

export default JoinContent;
