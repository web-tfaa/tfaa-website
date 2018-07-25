// External Dependencies
import Helmet from 'react-helmet';
import React from 'react';

// Internal Dependencies
import CardHeadline from '../../../components/shared/cards/card-headline';
import Container from '../../../components/shared/container';
import FuturaParagraph from '../../../components/shared/futura-paragraph';

// Sidebar data
import Layout from '../../../components/layout';
import presets from '../../../utils/presets';
import resourcesSidebar from '../resources-links.yml';
import SidebarBody from '../../../components/shared/sidebar/sidebar-body';

// Local Variables
const rootStyles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
};

const imageStyles = {
  marginBottom: 0,
};

const headingNameStyles = {
  marginBottom: 32,
};

// Component Definition
export default ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Peter Warshaw</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Peter Warshaw"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523146399/peter-warshaw.jpg"
        />
        <h2 css={headingNameStyles}>Peter Warshaw</h2>
        <CardHeadline>TMAC Past President, 2011-2012</CardHeadline>
        <CardHeadline>2014 TMAC Outstanding Administrator</CardHeadline>

        <FuturaParagraph>
          Peter J. Warshaw is the Fine Arts Director for Leander ISD. Previously, Mr. Warshaw served as the Coordinator of Fine Arts for Bryan ISD, as well as the Director of Bands at J. J. Pearce High School in Richardson ISD. During his tenure at Pearce High School, the band performed twice by invitation in New York’s Carnegie Hall and was awarded the Sudler Flag of Honor in 2000. In 2001, the Symphonic I Band, under Mr. Warshaw’s direction, was selected as the Texas Music Educators Association Class 4A Honor Band.
        </FuturaParagraph>
        <FuturaParagraph>
          Mr. Warshaw has been a presenter at the Midwest Clinic, the TMEA and TBA Conventions, the Midwest Clinic, and the CEDFA Conference. He is a life member of the International Percy Grainger Society and received the Grainger Medallion from the International Percy Grainger Society in 1998, in recognition of his distinctive contribution to the music of Percy Grainger. He has served as a guest lecturer in music education at Sam Houston State University and The University of Texas at Austin and is in great demand as an adjudicator throughout the state.
        </FuturaParagraph>
        <FuturaParagraph>
          Under Mr. Warshaw’s leadership, Leander ISD fine arts programs annually present district-wide events showcasing the work of student artists and performers. Additionally, four LISD groups have performed at the Midwest Clinic, two at the Western International Band Clinic, and two at the TMEA Convention.
        </FuturaParagraph>
        {/* Mobile sidebar */}
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
          <SidebarBody inline yaml={resourcesSidebar} />
        </div>
      </Container>
    </div>
  </Layout>
);
