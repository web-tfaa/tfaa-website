// External Dependencies
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

// Internal Dependencies
import Avatar from '../../components/shared/Avatar';
import Card from '../../components/shared/cards/card';
import CardHeadline from '../../components/shared/cards/card-headline';
import Cards from '../../components/shared/cards';
import Container from '../../components/shared/container';
import FuturaParagraph from '../../components/shared/futura-paragraph';
import Layout from '../../components/layout';
import SidebarBody from '../../components/shared/sidebar/sidebar-body';
import presets from '../../utils/presets';
import { useAreaRepsData } from '../../utils/hooks/useAreaRepsData';

// Sidebar data
import resourcesSidebar from './resources-links.yml';

// Component Definition
const AreaReps = ({ location }) => {
  const { edges } = useAreaRepsData();

  const north = edges.find(o => o.node.title === 'North Texas').node;
  const central = edges.find(o => o.node.title === 'Central Texas').node;
  const south = edges.find(o => o.node.title === 'South Texas').node;
  const southeast = edges.find(o => o.node.title === 'Southeast Texas').node;
  const west = edges.find(o => o.node.title === 'West Texas').node;

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
                alt="Southeast Texas area representative"
                src={southeast.linkToPicture}
              />
              <CardHeadline>Southeast Texas</CardHeadline>
              <FuturaParagraph>
                <a href={`mailto:${southeast.email}`}>
                  {southeast.name}
                </a>
              </FuturaParagraph>
              <FuturaParagraph>
                {southeast.schoolDistrict}
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
  location: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
};

export default AreaReps;
