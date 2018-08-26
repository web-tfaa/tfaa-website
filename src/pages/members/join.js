// External Dependencies
import ArrowForwardIcon from 'react-icons/lib/md/arrow-forward';
import Helmet from 'react-helmet';
// import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Internal Dependencies
// import Card from '../../components/shared/cards/card';
import CardHeadline from '../../components/shared/cards/card-headline';
import Cards from '../../components/shared/cards';
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import Status from './status';
import presets from '../../utils/presets';
// import { options } from '../../utils/typography';
import { firebase } from '../../firebase';
import CtaButton from '../../components/masthead/cta-button';

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

const futuraStyles = {
  // fontFamily: options.headerFontFamily.join(`,`),
  lineHeight: '1.6',
  marginBottom: '1rem',
};

const boldStyles = { fontWeight: 600 };

// Local Components
const SpacedDiv = ({ children }) => (
  <div css={futuraStyles}>
    {children}
  </div>
);

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
              <title>TMAC | Join TMAC</title>
            </Helmet>

              <div
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 32,
                }}
              >
                <CardHeadline>Join TMAC</CardHeadline>
                <SpacedDiv>
                  To join TMAC please complete these three steps:
                </SpacedDiv>
                <SpacedDiv>
                  <span css={boldStyles}>1.</span> Sign up for a TMAC website login.
                </SpacedDiv>
                <SpacedDiv>
                  <span css={boldStyles}>2.</span> Complete the Registration Form.
                </SpacedDiv>
                <SpacedDiv>
                  <span css={boldStyles}>3.</span> Pay dues online (or with check via mail).
                </SpacedDiv>
              </div>

              <div
                css={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <CtaButton to="/members/register">
                  <span css={{ verticalAlign: `middle` }}>
                    Begin Registration
                  </span>
                  <ArrowForwardIcon
                    css={{
                      verticalAlign: `baseline`,
                      marginLeft: `.6em`,
                    }}
                  />
                </CtaButton>
              </div>

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

export default JoinContent;
