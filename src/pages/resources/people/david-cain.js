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
const DavidCain = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | David Cain</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="David Cain"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523146399/david-cain.png"
        />
        <h2 css={headingNameStyles}>David Cain</h2>
        <CardHeadline>2016 TMAC Outstanding Administrator</CardHeadline>

        <FuturaParagraph>
          David received his Bachelor of Music Education from University of
          North Texas and began his teaching career in San Antonio and North
          East I.S.D. In 1980, he started with Northside I.S.D. after four years
          of teaching in California for the Ford Foundation. While in
          California, he studied with Lois Choksy and received his Master of
          Music Education with a Kodály Emphasis from Holy Names University. His
          Orff-Schulwerk Certification was obtained at Memphis State University.
          Westminster Choir College, San Jose State, and UTSA are a few of the
          places he has had the opportunity of additional training.
        </FuturaParagraph>
        <FuturaParagraph>
          David has studied choral music with Dr. Arpad Darazs, Katinka Daniel,
          Robert Shaw, Sir David Willocks, Dr. Charlene Archibeque, Dr. John
          Silantien, Roger Melone, Helen Kemp, and others. As a bass/baritone,
          he has sung with the San Antonio Symphony as a guest soloist, the San
          Antonio Mastersingers, the Trinity University Chorus, the Falcon
          Singers and UTSA Choral Ensembles. He continues to learn and teach at
          each level: children to adults, infants to senior citizens, public
          school to university classroom, All-District Elementary Honor Choir to
          the Sanctuary Choir at St. Matthew’s United Methodist Church. He has
          accompanied singers, choirs, instrumentalists and chamber ensembles on
          the piano. He has directed festivals, operas, musicals and major
          choral works with orchestras.
        </FuturaParagraph>
        <FuturaParagraph>
          As an educator, David has mentored many young music educators. He has
          been an officer for the Kodály Educators of Texas. Central Texas Orff
          Chapter has awarded him Honorary Lifetime Membership for his
          encouragement of teacher training and development. He is a member of
          TMEA, TMAC, TCDA, ACDA, CEDFA, OAKE and AOSA.
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

DavidCain.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default DavidCain;
