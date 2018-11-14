// External Dependencies
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
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
Avatar.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

// Component Definition
const AreaReps = ({ location }) => (
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
            <CardHeadline>North Texas</CardHeadline>
            <FuturaParagraph>
              <a href="mailto:jeffrey.turner@allenisd.org">Jeff Turner</a>
            </FuturaParagraph>
            <FuturaParagraph>Allen ISD</FuturaParagraph>
          </Card>
          <Card>
            <Avatar
              alt="Central TX area representative"
              src="https://res.cloudinary.com/drumsensei/image/upload/v1542202104/peter-warshaw-avatar_g0haep.jpg"
            />
            <CardHeadline>Central Texas</CardHeadline>
            <FuturaParagraph>
              <a href="mailto:Peter.Warshaw@leanderisd.org">Peter Warshaw</a>
            </FuturaParagraph>
            <FuturaParagraph>Leander ISD</FuturaParagraph>
          </Card>
          <Card>
            <Avatar
              alt="South TX area representative"
              src="https://res.cloudinary.com/drumsensei/image/upload/v1542202286/manuel-rodriguez-avatar_tt5pr1.jpg"
            />
            <CardHeadline>South Texas</CardHeadline>
            <FuturaParagraph>
              <a href="mailto:">Manuel Rodriguez</a>
            </FuturaParagraph>
            <FuturaParagraph>Valley View ISD</FuturaParagraph>
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
              src="https://res.cloudinary.com/drumsensei/image/upload/v1542201956/jay-lester-avatar_soe2zw.jpg"
            />
            <CardHeadline>West Texas</CardHeadline>
            <FuturaParagraph>
              <a href="mailto:jon.lester@abileneisd.org">
                Jay Lester
              </a>
            </FuturaParagraph>
            <FuturaParagraph>Abilene ISD</FuturaParagraph>
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

AreaReps.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default AreaReps;
