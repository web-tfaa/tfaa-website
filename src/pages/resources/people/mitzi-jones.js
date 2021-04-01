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
const MitziJones = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Mitzi Jones</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Mitzi Jones"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523146400/mitzi-jones.jpg"
        />
        <h2 css={headingNameStyles}>Mitzi Jones</h2>
        <CardHeadline>TMAC Past President, 2005-2006</CardHeadline>
        <CardHeadline>2013 TMAC Outstanding Administrator</CardHeadline>

        <FuturaParagraph>
          Mitzi Jones is in her thirteenth year as a fine arts administrator for
          the Katy Independent School District. As Assistant Director of Fine
          Arts, Mitzi’s supervisory role includes elementary music, elementary
          theatre and visual arts kindergarten through twelfth grade. She is
          directly involved with curriculum, professional development, fine arts
          facility and operations as well as various other district fine arts
          organizational events.
        </FuturaParagraph>
        <FuturaParagraph>
          Mitzi holds a Bachelor of Education with a Music Minor and emphasis in
          elementary music education from Sam Houston State University, where
          she was listed in Who’s Who in American Colleges and Universities,
          enjoyed her role as principal violinist, and served as president of
          the student chapter of the American String Teachers’ Association. She
          studied Kodály pedagogy with Virginia Irvin and Dr. Alan Strong. Later
          in her educational career, she obtained a Master of Supervision and
          Instruction with music emphasis from Sam Houston State University.
        </FuturaParagraph>
        <FuturaParagraph>
          During Mrs. Jones’ career in the Katy ISD Fine Arts Department, she
          initiated the organization and development of the district’s
          Elementary Honor Choir. The choir is in its eleventh season with two
          successful performances at TMEA’s State Convention and appearances at
          the Houston Children’s and the Aldine Children’s Choir Festival as
          well as the Texas Association of School Administrator’s opening
          ceremony.
        </FuturaParagraph>
        <FuturaParagraph>
          While working with fifty-two campuses and over one hundred and fifty
          fine arts teachers, Mitzi has had the honor of being awarded the
          prestigious greater Houston area’s Culture Shapers’ Art Administrator
          of the Year (2004). Mrs. Jones is an active member of TAEA (Region IV
          Representative 2002-03), TMEA and TMAC and enjoys serving the Katy
          community in its many faceted fine arts opportunities.
        </FuturaParagraph>
        <FuturaParagraph>
          Mitzi and her husband Michael (orchestra director, Katy ISD Mayde
          Creek High School) have two sons. Matthew is a student at Texas A & M
          University and Philip is beginning his journey as a Katy High School
          Tiger. She enjoys performing on her principle instrument, violin,
          gardening, volunteering at church and school and being a proud and
          loud Katy Tiger Varsity football fan!
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

MitziJones.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default MitziJones;
