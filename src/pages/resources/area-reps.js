// External Dependencies
import Helmet from 'react-helmet';
import React from 'react';

// Internal Dependencies
import Card from '../../components/shared/cards/card';
import CardHeadline from '../../components/shared/cards/card-headline';
import Cards from '../../components/shared/cards';
import Container from '../../components/shared/container';
import FuturaParagraph from '../../components/shared/futura-paragraph';
import Layout from '../../components/layout';
import presets from '../../utils/presets';
import SidebarBody from '../../components/shared/sidebar/sidebar-body';

// Sidebar data
import resourcesSidebar from './resources-links.yml';

// Local Variables
const Avatar = ({ alt, src }) => (
  <div
    css={{
      position: 'relative',
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'center',
      flexShrink: 0,
      borderRadius: '50%',
      overflow: 'hidden',
      width: 120,
      height: 120,
      marginBottom: 16,
      [presets.Phablet]: {
        height: 140,
        width: 140,
      },
      [presets.Tablet]: {
        height: 160,
        width: 160,
      },
    }}>
    <img
      css={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
        // Handle non-square image. The property isn't supported by IE11.
        // objectFit: 'cover',
      }}
      alt={alt}
      src={src}
    />
  </div>
);

// Component Definition
export default ({ location }) => (
  <Layout location={location}>
    <Container>
      <Helmet>
        <title>TMAC | Area Reps</title>
      </Helmet>
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        <Cards>
          <Card>
            <Avatar
              alt="DFW area representative"
              src="https://res.cloudinary.com/tmac/image/upload/v1523131020/Turner.jpg"
            />
            <CardHeadline>DFW Area</CardHeadline>
            <FuturaParagraph>
              <a href="mailto:jeffrey.turner@allenisd.org">Jeff Turner</a>
            </FuturaParagraph>
            <FuturaParagraph>Allen ISD</FuturaParagraph>
          </Card>
          <Card>
            <Avatar
              alt="Central TX area representative"
              src="https://res.cloudinary.com/tmac/image/upload/v1523154886/lisa-roebuck.jpg"
            />
            <CardHeadline>Central Texas</CardHeadline>
            <FuturaParagraph>
              <a href="mailto:lisa_roebuck@roundrockisd.org">Lisa Roebuck</a>
            </FuturaParagraph>
            <FuturaParagraph>Round Rock ISD</FuturaParagraph>
          </Card>
          <Card>
            <Avatar
              alt="South TX area representative"
              src="https://res.cloudinary.com/tmac/image/upload/v1523158252/manny-gamez.jpg"
            />
            <CardHeadline>South Texas</CardHeadline>
            <FuturaParagraph>
              <a href="mailto:manuel.gamez@pfisd.net">Manny Gamez</a>
            </FuturaParagraph>
            <FuturaParagraph>Mission CISD</FuturaParagraph>
          </Card>
          <Card>
            <Avatar
              alt="Greater Houston area representative"
              src="https://res.cloudinary.com/tmac/image/upload/v1523157293/monte-mast-square.jpg"
            />
            <CardHeadline>Greater Houston</CardHeadline>
            <FuturaParagraph>
              <a href="mailto:mmast@kleinisd.net">Monte Mast</a>
            </FuturaParagraph>
            <FuturaParagraph>Klein ISD</FuturaParagraph>
          </Card>
          <Card>
            <Avatar
              alt="West TX area representative"
              src="https://res.cloudinary.com/tmac/image/upload/v1523157441/christopher-anderson.jpg"
            />
            <CardHeadline>West Texas</CardHeadline>
            <FuturaParagraph>
              <a href="mailto:canderson60@lubbockisd.org">
                Christopher Anderson
              </a>
            </FuturaParagraph>
            <FuturaParagraph>Lubbock ISD</FuturaParagraph>
          </Card>
        </Cards>
      </div>
      <div
        css={{
          display: `block`,
          [presets.Tablet]: {
            display: `none`,
          },
        }}>
        <hr
          css={{
            border: 0,
            height: 2,
            marginTop: 10,
          }}
        />
        <SidebarBody inline yaml={resourcesSidebar} />
      </div>
    </Container>
  </Layout>
);
