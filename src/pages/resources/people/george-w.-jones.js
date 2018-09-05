// External Dependencies
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
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
const GeorgeWJones = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | George W. Jones</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="George W. Jones"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523146399/george-w-jones.png"
        />
        <h2 css={headingNameStyles}>George W. Jones</h2>
        <CardHeadline>TMAC Past President, 2010-2011</CardHeadline>
        <CardHeadline>2010 TMAC Outstanding Administrator</CardHeadline>

        <FuturaParagraph>
          George W. Jones has served as the Director of Fine Arts for the
          Garland Independent School District since 1997. In this capacity, he
          oversees the daily operations, curriculum, staff development, budget,
          and staffing for Music, Art, Theatre Arts, Dance and Competitive
          Speech. He is a constant advocate for the arts in education.
        </FuturaParagraph>
        <FuturaParagraph>
          Prior to assuming this administrative position, he served as a band
          director in Garland for 18 years teaching at Memorial Middle School,
          South Garland High School, Lakeview Centennial High School and Rowlett
          High School. He is still active as a clinician and adjudicator for
          music programs across the State of Texas.
        </FuturaParagraph>
        <FuturaParagraph>
          Mr. Jones is a native of Pekin, Illinois where he was mentored by “The
          Leader of the Band” Lawrence Fogelberg. He holds a Bachelor of Music
          Education degree from Illinois Wesleyan University and a Master of
          Music from Southern Methodist University. He is a member of the Texas
          Music Educators’ Association, the Texas Bandmasters Association, Phi
          Beta Mu honorary music fraternity, and the Texas Music Administrators’
          Conference. He is also a lifetime member of the PTA.
        </FuturaParagraph>
        <FuturaParagraph>
          In addition to his duties in the GISD, George has served as conductor
          of the Richardson Community Band since 1983. During his tenure as
          director of the band, the band has grown both in size and popularity.
          He instituted the band’s summer series, which has become a favorite
          summer activity for families across the Metroplex. In 2010, George was
          presented with the “Real Heroes Award” by the Richardson Coalition for
          his service as conductor of the RCB. In 2011, the Richardson Arts
          Alliance presented him with the “Lifetime Achievement Award.”
        </FuturaParagraph>
        <FuturaParagraph>
          George is married to Donna Jones, a teacher in the Garland ISD, and
          they have two children and one grandson.
        </FuturaParagraph>
        {/* Mobile sidebar */}
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
    </div>
  </Layout>
);

GeorgeWJones.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default GeorgeWJones;
