// External Dependencies
import { Helmet } from 'react-helmet';
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
const JimVanZandt = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Jim Van Zandt</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Jim Van Zandt"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523146399/jim-van-zandt.jpg"
        />
        <h2 css={headingNameStyles}>Jim Van Zandt</h2>
        <CardHeadline>2011 TMAC Outstanding Administrator</CardHeadline>

        <FuturaParagraph>
          Jim Van Zandt is in his tenth year as Director of Fine Arts for the
          Round Rock Independent School District. In this capacity, is involved
          with operations, curriculum, staff development, budget, and staffing
          for Music, Art, Theatre, and Dance. He is also actively involved with
          the structure and curriculum of the district’s Visual and Performing
          Arts Academies. As a part of his role, he is a constant advocate for
          the arts in education.
        </FuturaParagraph>
        <FuturaParagraph>
          Jim holds Bachelor of Music and Master of Music Education degrees from
          the University of North Texas, where he was listed in Who’s Who in
          American Colleges and Universities. He was Director of Bands and Fine
          Arts Department Chair at Westwood High School (Round Rock ISD) from
          1995-2001, after serving as Director of Bands at Richland High School
          (Birdville ISD) for the previous twenty years. He has also taught in
          Denton, Fredericksburg, Raymondville, and Jayton, Texas.
        </FuturaParagraph>
        <FuturaParagraph>
          Jim’s bands earned Best-in-Class or First Division awards in festivals
          in Colorado, Florida, Texas, Louisiana, and California, as well as
          consistent sweepstakes awards in Texas University Interscholastic
          League competition. He is active as a clinician, guest conductor, and
          adjudicator, and has served in these roles in Texas, Colorado,
          Oklahoma, Arkansas, Louisiana, Florida, and Arizona.
        </FuturaParagraph>
        <FuturaParagraph>
          Jim is Past President of the Texas Music Educators Association, and
          served on the TMEA Executive Board from 1982-1986. He also serves on
          the Cadre of Trainers for the Center for Educator Development in Fine
          Arts, and as such, is frequently invited to present training sessions
          for school districts and professional organizations.
        </FuturaParagraph>
        <FuturaParagraph>
          Jim serves bands, choirs, and orchestras as the Executive Secretary
          for Music Region 26 of the Texas University Interscholastic League,
          which manages the state sponsored music competitions. He has also
          previously served as a member of the Technical Advisory Committee for
          UIL Music Activities.Professional Associations include the Texas Music
          Educators Association, Texas Art Educators Association, Texas
          Educational Theatre Association, Texas Dance Educators Association,
          Texas Bandmasters Association, Texas Music Administrators Conference,
          Texas Choral Directors Association, and Texas Orchestra Directors
          Association, and Phi Beta Mu International Bandmasters Fraternity.
        </FuturaParagraph>
        <FuturaParagraph>
          Jim and his wife Carolyn have one daughter, one son, and five
          grandchildren. He enjoys reading, gardening, canoeing, and hiking (but
          he wants MORE time for these things!)
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

JimVanZandt.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default JimVanZandt;
