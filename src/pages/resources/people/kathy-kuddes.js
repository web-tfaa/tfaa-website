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
      <title>TMAC | Kathy Kuddes</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Kathy Kuddes"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523146400/kathy-kuddes.png"
        />
        <h2 css={headingNameStyles}>Kathy Kuddes</h2>
        <CardHeadline>TMAC Past President, 2015-2016</CardHeadline>
        <CardHeadline>2017 TMAC Outstanding Administrator</CardHeadline>

        <FuturaParagraph>
          Kathy Kuddes is currently the Director of Fine Arts for the Plano Independent School District, Coordinator of the Plano Kodály Teacher Training Program, and lead instructor for the partnership training program with Southern Methodist University. She holds a Bachelor of Music Education degree from Millikin University in Decatur, Illinois (1983), a Masters degree in Music Education from the University of North Texas in Denton (1995). She earned her Kodály Teacher Training certification from the University of Texas program at Festival Hill in Round Top (1990) and a Texas Supervisors Certification through UNT (1999). Her professional certifications include All-Level Music, Supervisor and English as a Second Language Supplemental; all from the State of Texas.
        </FuturaParagraph>
        <FuturaParagraph>
          Before stepping into her current administrative role, Kuddes was an elementary music specialist. Her classroom teaching career of 14 years included positions teaching elementary music, middle school and high school choirs, community pre-school music programs, church choirs, undergraduate music methods courses and graduate Kodály Training. Kathy’s current teaching activities include two levels of Folk Music Research for the Plano Kodály Teacher Training Program @ SMU and regular collaborations with faculty at Southern Methodist University on Orff and Kodály in Historical Context graduate courses.
        </FuturaParagraph>
        <FuturaParagraph>
          Mrs. Kuddes was recognized in 1993 by the Music Educators National Conference as a Nationally Registered Music Educator and in 1995 as the Outstanding Graduate Student in Music Education by the College of Music at the University of North Texas. Kathy was honored as the Outstanding Administrator for 2010 by the Organization of American Kodály Educators (OAKE), recipient of the 2013 Alumni Merit-Loyalty Award from Millikin University and the 2016 Honored Alumna Award from the University of North Texas College of Music. She has served on the boards of the OAKE, the Kodály Educators of Texas and the Texas Music Administrators Conference. Her biography is contained in the “Who’s Who of American Women,” the “Manchester Who’s Who,” the “Cambridge Who’s Who,” and the “Who’s Who” publication of the International Kodály Society.
        </FuturaParagraph>
        <FuturaParagraph>
          Kathy is an active member of Texas Music Educators Association (TMEA), National Association for Music Education (NAfME), Organization of American Kodály Educators (OAKE), American Orff-Schulwerk Association (AOSA), International Kodály Society (IKS), Texas Music Administrators Conference (TMAC) and Association for Supervision and Curriculum Development (ASCD). She is in demand as a workshop and conference presenter across Texas and beyond, including invitations to present for the International Kodály Symposia held in Newcastle, Australia (2003), Keckemét, Hungary (2013) and Edinburgh, Scotland (2015).
        </FuturaParagraph>
        <FuturaParagraph>
          In addition to her school work Kathy continues to sing in her local church choir, ring in one of the handbell choirs and plays occasionally in a flute ensemble. She is an avid student of American folk music, plays mountain dulcimer and autoharp, and has recently taken up the hammered dulcimer. She and her husband, Kent, spend their leisure time traveling and doting on their dachshunds. Their travels have included Britain, South Korea, Japan, the Czech Republic, Hungary, Spain, Portugal, Germany, the Caribbean and Australia. In 2007 Kent established a named scholarship at Millikin University in Kathy’s name to support a music education student in the pursuit of their degree at her Alma Mater.
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
