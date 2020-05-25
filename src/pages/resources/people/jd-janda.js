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
const JdJanda = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | JD Janda</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="JD Janda"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523131020/Janda.jpg"
        />
        <h2 css={headingNameStyles}>JD Janda</h2>
        <CardHeadline>TMAC Past President, 2017-2018</CardHeadline>
        <FuturaParagraph>
          JD (John David) Janda is the Director of Fine Arts in Tomball
          ISD, a position he has held since July 2015. In Tomball, Janda supervises the dance,
          theater, visual arts and music departments of the fast growth district. Immediately prior
          to moving to Tomball, Janda served six years as the Director of Curriculum and Fine Arts
          in Georgetown ISD. While in Georgetown, he founded the Vivace Youth Orchestra and served
          as music director and conductor of VYO’s advanced high school orchestra. JD’s professional
          career has spanned 38 years - 22 of which were spent in Katy ISD at James E. Taylor High
          School as Director of Bands and Associate Orchestra Director.
        </FuturaParagraph>
        <FuturaParagraph>
          Janda was recognized for his outstanding contributions to students lives in 2001 when he
          was named recipient of the “Southwestern Bell - UIL Sponsor Excellence Award” for the
          State of Texas. His bands earned multiple performances at the UIL State Marching Band
          Contest and placed high in the TMEA Honor Band process. His bands and orchestras earned
          many consecutive years of UIL Sweepstakes Awards and won dozens of “Best in Class” awards.
          Mr. Janda has worked in numerous state-wide leadership capacities. He recently served on
          the select committee to rewrite the Texas Essential Knowledge and Skills (TEKS) for Fine
          Arts. Janda has presented lectures and professional development sessions across Texas - at
          educator conferences, universities and school districts small and large. He is a Past
          President of the Texas Music Administrators Conference (TMAC), is a Past President of the
          Texas Music Educators Association, past TMEA State Band Chair and has served multiple
          three-year terms as a member of the UIL State Music Technical Advisory Committee.
        </FuturaParagraph>
        <FuturaParagraph>
          JD’s wife of 31 years, Nancy Janda, teaches Algebra at Willow Wood Junior High in Tomball
          ISD. His daughter, Jane Janda Maloy teaches middle school band in Alvin ISD and Janda’s
          son Gordon is an assistant band director at Dickinson High School. JD has two awesome,
          beautiful and amazing grandsons, Elwood James Maloy and Finn Hobbs Maloy.
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

JdJanda.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default JdJanda;
