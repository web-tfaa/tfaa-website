// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

// Internal Dependencies
import CardHeadline from '../../../components/shared/cards/card-headline';
import Container from '../../../components/shared/container';
import FuturaParagraph from '../../../components/shared/futura-paragraph';

// Sidebar data
import Layout from '../../../components/layout';
import presets from '../../../utils/presets';
import resourcesSidebar from '../resources-links.yml';
import SidebarBody from '../../../components/shared/sidebar/SidebarBody';

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
const LisaRoebuck = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Lisa Roebuck</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Lisa Roebuck"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1590082444/lisa-roebuck.jpg"
        />
        <h2 css={headingNameStyles}>Lisa Roebuck</h2>
        <CardHeadline>2020 TMAC Outstanding Administrator</CardHeadline>
        <FuturaParagraph>
          Lisa Weinheimer Roebuck currently serves Round Rock ISD as the Director of Fine Arts.
          Round Rock ISD serves approximately 50,000 students that attend the district’s 55
          campuses. The district offers numerous course selections for students in the areas of
          dance, music, theatre and visual art and is extremely proud of their strong and vital fine
          arts programs.
        </FuturaParagraph>
        <FuturaParagraph>
          Lisa grew up in Fredericksburg, Texas. She holds a Bachelor of Music Education from the
          University of Texas at Austin, a Kodály Music Certification from Texas State University
          and a Masters in Educational Leadership from Lamar University. She taught general music at
          the elementary level and choral music at the secondary level for 21 years. Lisa taught in
          both public and private schools before entering the world of full time fine arts
          administration in 2006. She presents professional development for other school districts
          and educational service centers in the areas of elementary music, choir, fine arts
          curriculum and program development.
        </FuturaParagraph>
        <FuturaParagraph>
          Lisa has served as the Elementary Music Region 26 Chair for the Texas Music Educators
          Association, and President of the Kodály Educators of Texas. She collaborated with
          &qout;The Vision Committee for Curriculum and Assessments in the Arts&qout; for the Texas
          Music Administration Conference/Texas Music Educators Association and was selected by the
          State Board of Education and worked on the Fine Arts TEKS Revision Committee.
        </FuturaParagraph>
        <FuturaParagraph>
          She is strongly committed to quality music and overall fine arts education in the state of
          Texas. She strives to accomplish this goal by offering a high level of professional
          development and supportive systems for the teachers who instruct the deserving and
          talented students in the state
        </FuturaParagraph>
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
          <SidebarBody inline yaml={resourcesSidebar} />
        </div>
      </Container>
    </div>
  </Layout>
);

LisaRoebuck.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default LisaRoebuck;
