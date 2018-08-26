// External Dependencies
// import ArrowForwardIcon from 'react-icons/lib/md/arrow-forward';
// import Helmet from 'react-helmet';
// import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Internal Dependencies
import RegisterHr from './register-hr';
// import Card from '../../components/shared/cards/card';
// import CardHeadline from '../../components/shared/cards/card-headline';
// import Cards from '../../components/shared/cards';
// import Container from '../../components/shared/container';
// import Layout from '../../components/layout';
// import Status from './status';
// import presets from '../../utils/presets';
// import { options } from '../../utils/typography';
// import { firebase } from '../../firebase';
// import CtaButton from '../../components/masthead/cta-button';

// Sidebar Data
// import SidebarBody from '../../components/shared/sidebar/sidebar-body';
// import membersSidebar from './members-links.yml';

// Local Variables
// const propTypes = {
//   contentfulFileShareData: PropTypes.array,
//   contentfulFileShareDescriptionData: PropTypes.array,
// };

// const defaultProps = {
//   contentfulFileShareData: null,
//   contentfulFileShareDescriptionData: null,
// }

const futuraStyles = {
  // fontFamily: options.headerFontFamily.join(`,`),
  lineHeight: '1.6',
  marginBottom: '1rem',
};

// const boldStyles = { fontWeight: 600 };

// Local Components
// const SpacedDiv = ({ children }) => (
//   <div css={futuraStyles}>
//     {children}
//   </div>
// );

// const FuturaAnchor = ({ children, href }) => (
//   <a href={href} css={futuraStyles}>
//     {children}
//   </a>
// );

// const MemberFileShareCard = ({ node, description }) => {
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
class RegisterEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    // firebase.auth.onAuthStateChanged(authUser =>
    //   authUser
    //     ? this.setState(() => ({ authUser }))
    //     : this.setState(() => ({ authUser: null }))
    // );
  }

  render() {
    const {
      authUser,
    } = this.state;

    const isAuthenticated = Boolean(authUser);

    return (
      <section>
        <h2>2. Register for TMAC</h2>
        <RegisterHr />
        Register Info
      </section>
    );
  }
}

export default RegisterEmail;
