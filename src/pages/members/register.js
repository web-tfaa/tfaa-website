// External Dependencies
// import ArrowForwardIcon from 'react-icons/lib/md/arrow-forward';
// import format from 'date-fns/format';
import Helmet from 'react-helmet';
// import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

// Internal Dependencies
// import Card from '../../components/shared/cards/card';
// import CardHeadline from '../../components/shared/cards/card-headline';
// import Cards from '../../components/shared/cards';
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import Status from './status';
// import presets, { colors } from '../../utils/presets';
import presets from '../../utils/presets';
// import { options } from '../../utils/typography';
import { firebase } from '../../firebase';
// import CtaButton from '../../components/masthead/cta-button';
import RegisterForm from '../../components/register/register-form';
import RegisterEmail from '../../components/register/register-email';
import RegisterInfo from '../../components/register/register-info';
import RegisterPayment from '../../components/register/register-payment';

// Sidebar Data
import SidebarBody from '../../components/shared/sidebar/sidebar-body';
import membersSidebar from './members-links.yml';

// Local Variables
// const propTypes = {
//   contentfulFileShareData: PropTypes.array,
//   contentfulFileShareDescriptionData: PropTypes.array,
// };

// const defaultProps = {
//   contentfulFileShareData: null,
//   contentfulFileShareDescriptionData: null,
// }

// const futuraStyles = {
//   fontFamily: options.headerFontFamily.join(`,`),
//   lineHeight: '1.6',
//   marginBottom: '1rem',
// };

// const boldStyles = { fontWeight: 600 };

// Local Components
// const FuturaDiv = ({ children }) => (
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

/*
  Main container for the Registration process
*/

// Component Definition
class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 1,
      authUser: null,
      // Possible completed steps are [1, 2, 3]
      completedSteps: [],
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser =>
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }))
    );
  }

  getCurrentStepContent() {
    const {
      activeStep,
    } = this.state;

    const step1Content = (
      <RegisterEmail />
    );

    const step2Content = (
      <Fragment>



        <RegisterForm />
      </Fragment>
    );

    const step3Content = (
      <RegisterPayment />
    );

    switch (activeStep) {
      case 1:
        return step1Content;
        break;
      case 2:
        return step2Content;
        break;
      case 3:
        return step3Content;
        break;
      default:
        return step1Content;
        break;

    }
  }

  render() {
    const {
      authUser,
    } = this.state;

    const isAuthenticated = Boolean(authUser);

    return (
      <Layout location={this.props.location}>
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
              <title>TMAC | Register</title>
            </Helmet>

            {/* Children change depending on which step is active */}

            {this.getCurrentStepContent()}

            <div style={{ marginTop: '1.5rem' }}>
              * Registration is not complete until payment is received.
            </div>
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
      </Layout>
    );
  }
}

export default Register;
