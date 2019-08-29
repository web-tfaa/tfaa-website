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
import SidebarBody from '../../components/shared/sidebar/sidebar-body';
import presets from '../../utils/presets';
import { useOfficerData } from '../../utils/hooks/useOfficerData';

// Sidebar data
import aboutSidebar from './about-links.yml';

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
      alt={alt}
      css={{
        height: '100%',
        textAlign: 'center',
        width: '100%',
        // Handle non-square image. The property isn't supported by IE11.
        // objectFit: 'cover',
      }}
      src={src}
    />
  </div>
);
Avatar.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

// Component Definition
const Officers = ({ location }) => {
  const { edges } = useOfficerData();

  const president = edges.find(o => o.node.title === 'President').node;
  const vicePresident = edges.find(o => o.node.title === 'Vice-President').node;
  const executiveSecretary = edges.find(o => o.node.title === 'Executive Secretary').node;
  const secretary = edges.find(o => o.node.title === 'Secretary').node;
  const pastPresident = edges.find(o => o.node.title === 'Past-President').node;

  return (
    <Layout location={location}>
      <Container>
        <Helmet>
          <title>TMAC | Officers</title>
        </Helmet>
        <h2>TMAC Officers</h2>
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
                alt="president picture"
                src={president.linkToPicture}
              />
              <CardHeadline>President</CardHeadline>
              <FuturaParagraph>
                <a href={`mailto:${president.email}`}>
                  {president.name}
                </a>
              </FuturaParagraph>
              <FuturaParagraph>
                {president.districtTitle}, {president.schoolDistrict}
              </FuturaParagraph>
            </Card>

            <Card>
              <Avatar
                alt="vice-president picture"
                src={vicePresident.linkToPicture}
              />
              <CardHeadline>Vice-President</CardHeadline>
              <FuturaParagraph>
                <a href={`mailto:${vicePresident.email}`}>
                  {vicePresident.name}
                </a>
              </FuturaParagraph>
              <FuturaParagraph>
                {vicePresident.districtTitle}, {vicePresident.schoolDistrict}
              </FuturaParagraph>
            </Card>

            <Card>
              <Avatar
                alt="secretary picture"
                src={secretary.linkToPicture}
              />
              <CardHeadline>Secretary</CardHeadline>
              <FuturaParagraph>
                <a href={`mailto:${secretary.email}`}>
                  {secretary.name}
                </a>
              </FuturaParagraph>
              <FuturaParagraph>
                {secretary.districtTitle}, {secretary.schoolDistrict}
              </FuturaParagraph>
            </Card>

            <Card>
              <Avatar
                alt="past-president picture"
                src={pastPresident.linkToPicture}
              />
              <CardHeadline>Past-President</CardHeadline>
              <FuturaParagraph>
                <a href={`mailto:${pastPresident.email}`}>
                  {pastPresident.name}
                </a>
              </FuturaParagraph>
              <FuturaParagraph>
                {pastPresident.districtTitle}, {pastPresident.schoolDistrict}
              </FuturaParagraph>
            </Card>

            <Card>
              <Avatar
                alt="treasurer picture"
                src={executiveSecretary.linkToPicture}
              />
              <CardHeadline>Executive Secretary</CardHeadline>
              <FuturaParagraph>
                <a href={`mailto:${executiveSecretary.email}`}>
                  {executiveSecretary.name}
                </a>
              </FuturaParagraph>
              <FuturaParagraph>
                {executiveSecretary.districtTitle}, {executiveSecretary.schoolDistrict}
              </FuturaParagraph>
            </Card>
          </Cards>
          {/* Mobile sidebar */}
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
            <SidebarBody inline yaml={aboutSidebar} />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

Officers.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
};

export default Officers;
