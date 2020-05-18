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
const RandyBartlett = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Randy Bartlett</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Randy Bartlett"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523146399/randy-bartlett.jpg"
        />
        <h2 css={headingNameStyles}>Randy Bartlett</h2>
        <CardHeadline>TMAC Past President, 2006-2007</CardHeadline>

        <FuturaParagraph>
          Mr. Randy Bartlett was appointed as Executive Secretary for UIL Region
          25 Music in February, 2006. Prior to this position he was Director of
          Fine Arts for the Hurst Euless Bedford Independent School District in
          Bedford, Texas for five years and Director of Fine Arts for Round Rock
          ISD in the Austin area for two years. Prior to those positions, he was
          Director of Bands at South Garland High School for 19 years, serving
          as Fine Arts Department Head for 16 years. His previous teaching
          assignments include South Grand Prairie High School, Richland High
          School, and Allen High School. From 1971-75, he served as a
          clarinetist in the Air Force Band stationed in Wichita Falls, Texas,
          and Anchorage, Alaska.
        </FuturaParagraph>
        <FuturaParagraph>
          During Mr. Bartlett’s tenure at South Garland, the bands competed in
          festivals in Louisiana, Colorado, Tennessee, Washington, D.C.,
          Florida, and Texas, and were selected as the outstanding band several
          times. The South Garland Bands were consistent first division UIL
          winners. Mr. Bartlett has served as a frequent clinician and
          adjudicator in Texas, New Mexico, Arkansas, Louisiana, and Oklahoma.
          He has held several positions in TMEA Region III and served for five
          years as region president. Mr. Bartlett recently served on the UIL
          Technical Advisory Committee in Austin. He has also served as
          President of the Texas Music Administrators Conference.
        </FuturaParagraph>
        <FuturaParagraph>
          Mr. Bartlett holds a Bachelor of Music and Master of Education degrees
          from the University of North Texas and has Mid-Management
          Certification. He is a member of Phi Mu Alpha, Phi Beta Mu, the Texas
          Music Educators Association, the Texas Bandmasters Association, and
          the Texas Music Adjudicators Association, and the Texas Music
          Administrator’s Conference.
        </FuturaParagraph>
        <FuturaParagraph>
          Mr. Bartlett has been nominated twice for the UIL Denius Award for
          Teaching Excellence and was a nominee for the University of Texas
          Excellence in Teaching Award for 1996-97.
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

RandyBartlett.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default RandyBartlett;
