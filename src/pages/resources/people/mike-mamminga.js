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
const MikeMamminga = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Mike Mamminga</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Mike Mamminga"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523144935/mike-mamminga.jpg"
        />
        <h2 css={headingNameStyles}>Mike Mamminga</h2>
        <CardHeadline>2001 TMAC Outstanding Administrator</CardHeadline>

        <FuturaParagraph>
          Dr. Michael Mamminga was a teacher and administrator in the Richardson
          Independent School District (RISD) for 36 years, with 33 of those
          serving as the Director of Fine Arts. Having served through the
          administrations of seven superintendents, he retired in June, 2007.
        </FuturaParagraph>
        <FuturaParagraph>
          During his distinguished career as Director of Fine Arts, the Fine
          Arts program flourished in the tradition of academic excellence in the
          Richardson schools. His leadership, management, marketing and
          communication skills were catalysts for the Fine Arts program’s
          success. He takes particular pride in the outstanding staff in the
          program, both past and present, as well as the comprehensive
          curriculum of study. These ingredients, along with dedicated students
          and supportive parents, school administrators and community members,
          enabled the Fine Arts program in the RISD to enjoy an unparalleled
          local, state and national reputation for outstanding accomplishments
          in music, art and theatre during his tenure.
        </FuturaParagraph>
        <FuturaParagraph>
          A native of Illinois, Dr. Mamminga earned a Bachelor of Science in
          Music Education (B.S.M.E.) with Honors from the University of
          Illinois, a Master of Music Education (M.M.E.) from the University of
          North Texas, and a Doctor of Philosophy in Music Education (Ph.D.)
          from Florida State University. During the 1968-1969 school year, Dr.
          Mamminga was awarded a Fulbright Scholarship to study Euphonium and
          British Brass Bands in London, England. While in London, he earned an
          Artist Diploma in Euphonium Performance (L.G.S.M.) from the Guildhall
          School of Music and Drama, and a Diploma in Brass Band Conducting,
          Arranging, and Musical Knowledge (L.T.C.L.) from the Trinity College
          of Music. During that year, he studied with the celebrated British
          trombonist Denis Wick of the London Symphony Orchestra and performed
          with the Hendon Brass Band alongside the esteemed British euphonium
          performer Barrie Perrins. As a student, Dr. Mamminga studied and
          worked with the eminent British composer Dr. Gordon Jacob and is the
          dedicatory recipient of Dr. Jacob’s acclaimed “Fantasia” for Euphonium
          and Band.
        </FuturaParagraph>
        <FuturaParagraph>
          Dr. Mamminga serves as a guest conductor or presenter/clinician in
          music education and administration seminars, as an adjudicator for
          band festivals and as a guest conductor. He recently served as the
          Director of the Early Brass ensemble at Richland College for four
          years. He has been active in the Texas Music Educators Association
          (TMEA), the Texas Music Administrators Conference (TMAC), and the
          Texas Bandmasters’ Association (TBA). In February, 2000, at the Texas
          Music Educators Association Convention, he was awarded the Texas Music
          Administrator of the Year by the Texas Music Administrators
          Conference. In August, 2004, at the Texas Bandmasters Association
          Convention, he was awarded a Lifetime Administrator Achievement Award
          by the Texas Bandmasters Association. In May, 2007, he was awarded an
          Honorary Membership in the International School Bandmaster Fraternity,
          Phi Beta Mu, as one of only four such honorees in the long history of
          the organization. He is a Life Member (TLM) of the Texas Congress of
          Parents and Teachers (PTA) through the RISD Council of PTAs and a
          member and Past President of the Dallas Chapter of the Sons of the
          American Revolution.
        </FuturaParagraph>
        <FuturaParagraph>
          Dr. Mamminga also enjoys a passion for real estate. He is currently a
          REALTOR® in residential sales with the renowned Dallas real estate
          firm of Allie Beth Allman & Associates.
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

MikeMamminga.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default MikeMamminga;
