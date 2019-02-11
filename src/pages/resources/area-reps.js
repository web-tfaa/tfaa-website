// External Dependencies
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import {
  StaticQuery,
  graphql,
} from 'gatsby';

// Internal Dependencies
import Card from '../../components/shared/cards/card';
import CardHeadline from '../../components/shared/cards/card-headline';
import Cards from '../../components/shared/cards';
import Container from '../../components/shared/container';
import FuturaParagraph from '../../components/shared/futura-paragraph';
import Layout from '../../components/layout';
import SidebarBody from '../../components/shared/sidebar/sidebar-body';
import presets from '../../utils/presets';

// Sidebar data
import resourcesSidebar from './resources-links.yml';

// Local Variables
const Avatar = ({ alt, src }) => (
  <div
    css={{
      alignItems: 'baseline',
      borderRadius: '50%',
      display: 'flex',
      flexShrink: 0,
      height: 120,
      justifyContent: 'center',
      marginBottom: 16,
      overflow: 'hidden',
      position: 'relative',
      width: 120,
      [presets.Phablet]: {
        height: 140,
        width: 140,
      },
      [presets.Tablet]: {
        height: 160,
        width: 160,
      },
    }}
  >
    <img
      css={{
        height: '100%',
        textAlign: 'center',
        width: '100%',
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
export default props => (
  <StaticQuery
    query={graphql`
      query areaRepsPageQuery {
        allContentfulAreaReps(
          filter: {
            node_locale: { eq: "en-US" }
          }
        ) {
          edges {
            node {
              title
              name
              email
              schoolDistrict
              linkToPicture
            }
          }
        }
      }`}
    render={data => <AreaReps data={data.allContentfulAreaReps.edges} {...props} />}
  />
);

const AreaReps = ({
  data,
  location,
}) => {
  console.log('data in area reps page →', data);

  const north = data.find(o => o.node.title === 'North Texas').node;
  const central = data.find(o => o.node.title === 'Central Texas').node;
  const south = data.find(o => o.node.title === 'South Texas').node;
  const houston = data.find(o => o.node.title === 'Greater Houston').node;
  const west = data.find(o => o.node.title === 'West Texas').node;

  return (
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
          }}
        >
          <Cards>
            <Card>
              <Avatar
                alt="North Texas area representative"
                src={north.linkToPicture}
              />
              <CardHeadline>North Texas</CardHeadline>
              <FuturaParagraph>
                <a href={`mailto:${north.email}`}>
                  {north.name}
                </a>
              </FuturaParagraph>
              <FuturaParagraph>
                {north.schoolDistrict}
              </FuturaParagraph>
            </Card>

            <Card>
              <Avatar
                alt="Central Texas area representative"
                src={central.linkToPicture}
              />
              <CardHeadline>Central Texas</CardHeadline>
              <FuturaParagraph>
                <a href={`mailto:${central.email}`}>
                  {central.name}
                </a>
              </FuturaParagraph>
              <FuturaParagraph>
                {central.schoolDistrict}
              </FuturaParagraph>
            </Card>

            <Card>
              <Avatar
                alt="South Texas area representative"
                src={south.linkToPicture}
              />
              <CardHeadline>South Texas</CardHeadline>
              <FuturaParagraph>
                <a href={`mailto:${south.email}`}>
                  {south.name}
                </a>
              </FuturaParagraph>
              <FuturaParagraph>
                {south.schoolDistrict}
              </FuturaParagraph>
            </Card>

            <Card>
              <Avatar
                alt="Greater Houston area representative"
                src={houston.linkToPicture}
              />
              <CardHeadline>Greater Houston</CardHeadline>
              <FuturaParagraph>
                <a href={`mailto:${houston.email}`}>
                  {houston.name}
                </a>
              </FuturaParagraph>
              <FuturaParagraph>
                {houston.schoolDistrict}
              </FuturaParagraph>
            </Card>

            <Card>
              <Avatar
                alt="West Texas area representative"
                src={west.linkToPicture}
              />
              <CardHeadline>West Texas</CardHeadline>
              <FuturaParagraph>
                <a href={`mailto:${west.email}`}>
                  {west.name}
                </a>
              </FuturaParagraph>
              <FuturaParagraph>
                {west.schoolDistrict}
              </FuturaParagraph>
            </Card>
          </Cards>
        </div>
        <div
          css={{
            display: 'block',
            [presets.Tablet]: {
              display: 'none',
            },
          }}
        >
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
};

AreaReps.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  location: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
};
