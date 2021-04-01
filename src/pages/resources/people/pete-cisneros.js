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
const PeteCisneros = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Pete Cisneros</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Pete Cisneros"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523146399/pete-cisneros.jpg"
        />
        <h2 css={headingNameStyles}>Pete Cisneros</h2>
        <CardHeadline>TMAC Past President, 1989-1990</CardHeadline>

        <FuturaParagraph>
          Mr. Pedro “Pete” Cisneros was born in Ozona, Texas on January 28,
          1934. His parents were Mr. Reyes Cisneros and Mrs. Chita Cisneros,
          owners of a local grocery store. Mr. Cisneros attended elementary
          through high school in this community and excelled as a musician and
          as an athlete. Pete, as he prefers to be called, became an All-State
          saxophone player, as well as an All-State football player. This was a
          remarkable feat, as times were difficult, especially for a young
          Hispanic male. Mr. Cisneros never allowed this to get in his way, as
          he would constantly be challenged, and was always trying to be the
          best that he could be.
        </FuturaParagraph>
        <FuturaParagraph>
          Upon graduating from Ozona High School, he proceeded to enter Sol Ross
          University in Alpine, Texas and pursue a career in music education.
          Mr. Cisneros played clarinet while attending Sol Ross, and received
          his bachelor of music education degree. Once he attained his degree,
          he entered into the United States Army and became a member of the
          fifth Army Band in San Antonio, Texas. After completing his tour of
          duty, he accepted a teaching position in the Pharr-San Juan-Alamo
          School District in the Rio Grande Valley.
        </FuturaParagraph>
        <FuturaParagraph>
          Mr. Cisneros moved to the P.S.J.A. School District and became an
          assistant band director during the 1959-1960 school year. The
          following year he became the high school band director and devoted a
          lot of his time in the development of a very strong music program. He
          was single during these years, and could devote countless hours to his
          profession, becoming extremely influential to many young musicians.
          The P.S.J.A. bands earned countless 1st divisions and sweepstakes, as
          well as placing numerous students in the All-Region, Area, and
          All-State bands. His bands also represented Region XV as the Region
          Honor Band in the State Honor Band competitions. Mr. Cisneros became
          Music Supervisor for P.S.J.A. School District and served in this
          capacity until his retirement.
        </FuturaParagraph>
        <FuturaParagraph>
          Pete was a member of the Rotary Club, TBA, TMEA, and Phi Beta Mu. He
          served as Region XV band chairman, hosted countless competitions at
          his school, and continued on to become the President of the Texas
          Bandmasters Association. These accomplishments demonstrated his
          professionalism, persistence for excellence, and his quest for always
          doing his best at all he attempted. These qualities he instilled in
          his students, staff, and peers.
        </FuturaParagraph>
        <FuturaParagraph>
          Today, there are many band directors who were his students and they
          continue to provide the best possible musical education to their
          students, just as they received the best at P.S.J.A. High School under
          Mr. Pete Cisneros. Among these students that are working as educators
          are Mr. Wilfredo Perez from Edinburg North High School, Mr. Ruben
          Adame from La Joya High School, and Mr. George Trevino of Lopez High
          School in Brownsville, Texas. These three gentlemen are consistent
          representatives of Region XV at the state level in marching and
          concert competitions.
        </FuturaParagraph>
        <FuturaParagraph>
          Other alumni of P.S.J.A. High School who are teaching include Mr.
          Eddie Echeverria from P.S.J.A. North High School, Mr. Javier Cantu
          from Nellie Schunior Middle School in La Joya, Texas, Mr. Rudy Salazar
          from Crowley High School, Ms. Iris Gonzalez from Hodges Bend, and Mr.
          Schott Meyers from La Joya ISD. Numerous other students went on to
          become professionals and serve their communities. They all remember
          Mr. Pete Cisneros with love and respect.
        </FuturaParagraph>
        <FuturaParagraph>
          Mr. Cisneros married his wife Armandina and they still reside in the
          Rio Grande Valley. Pete is and always will be remembered as one of the
          “Great Valley Band Directors,” who has earned the respect and
          admiration of all his students, former staff members, and music
          educators of the “Great State of Texas.”
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

PeteCisneros.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default PeteCisneros;
