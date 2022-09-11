// External Dependencies
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React, { FC } from 'react';

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
  width: '50%',
};

const headingNameStyles = {
  marginBottom: 32,
};

// Component Definition
const SamHarris: FC = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Linda Fletcher</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Linda Fletcher"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/ar_1:1,c_fill,g_auto,w_1000/v1661896794/fletcher.jpg"
        />
        <h2 css={headingNameStyles}>Linda Fletcher</h2>
        <CardHeadline>2022 TMAC Outstanding Administrator</CardHeadline>

        <FuturaParagraph>
          Linda Fletcher currently serves as the Director of Fine Arts for the Pasadena Independent
          School District, a position she has held since 2005.
          She is currently in her forty-eighth year with
          Pasadena ISD where she has spent her entire career.
          During her first 30 years with PISD, Linda
          taught general music at the elementary level and choral music at the secondary level.
          Her secondary choirs consistently won Sweepstakes at
          UIL Concert &amp; Sightreading Evaluations.
        </FuturaParagraph>

        <FuturaParagraph>
          Linda holds a Bachelor of Music Education with vocal emphasis from Sam Houston State
          University and a Masters in Educational
          Leadership from University of Houston Clear Lake. As
          Pasadena ISD&apos;s Director of Fine Arts, Linda oversees the
          administration and personnel for the
          band, choir, orchestra, elementary music, theatre arts, visual arts,
          and dance programs for the district&apos;s 5 high schools, 10 intermediates,
          11 middle schools, and 36 elementary campuses.
          PISD currently has 300 Fine Arts teachers and directors.
        </FuturaParagraph>

        <FuturaParagraph>
          Under Mrs. Fletcher&apos;s leadership, Pasadena ISD fine arts programs annually
          present district-wide events showcasing the work of all
          students and teachers. Two of her groups have performed at the Midwest Clinic
          and many of her teachers have presented sessions at the TMEA Convention.
          During her tenure she successfully added 79 fine arts instructional positions;
          a full-time assistant Director of Fine Arts;
          a coordinator of Fine Arts; a district lead art teacher;
          and two full time administrative assistants.
          Linda is strongly committed to providing a quality fine arts education
          for the over 50,000 students in Pasadena. She works at accomplishing this
          goal by offering a high level of professional development and supportive systems for the
          teachers in her district.
        </FuturaParagraph>

        <FuturaParagraph>
          Linda is a member of the Texas Music Educators Association, Texas Music Administrators
          Conference, Texas Choral Directors Association, Texas Dance Educators Association and the
          Texas Association of School Administrators. At TMEA this past February, Linda was named as
          the 2022 Texas Music Administrator of the Year by TMAC.
        </FuturaParagraph>

        <FuturaParagraph>
          Linda and her husband of 44 years have a wonderful daughter &amp; son-in-law,
          and two amazing grandsons. She is thrilled both of her grandsons are
          involved in their school band programs, one playing percussion and the other bassoon.
          She enjoys singing in her church choir, performing solos, going on cruises,
          as well as being a proud grandparent and attending as many of her
          grandsons&apos; performances and baseball games as possible!
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

SamHarris.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default SamHarris;
