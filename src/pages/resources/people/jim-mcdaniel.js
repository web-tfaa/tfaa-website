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
      <title>TMAC | Jim McDaniel</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Jim McDaniel"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523146399/jim-mcdaniel.jpg"
        />
        <h2 css={headingNameStyles}>Jim McDaniel</h2>
        <CardHeadline>TMAC Past President, 2008-2009</CardHeadline>
        <CardHeadline>2010 TMAC Outstanding Administrator</CardHeadline>

        <FuturaParagraph>
          Jim McDaniel has served for the past 15 years (1996–2010) as the Executive Director of Fine Arts for the Carrollton/Farmers Branch Independent School District. Prior to this position, Mr. McDaniel served as the first Supervisor of Fine Arts in Bryan Independent School District. He also held the positions of Assistant Director of Bands for Texas A&M University (1990-1993), Director of Bands for Martin High School in Arlington (opened the school in 1982–1990), Assistant Director of Bands for James Bowie High School in Arlington (1980–1982); Assistant Director of Bands for Skyline High School (1976–1979) and Graduate Assistant at Texas Christian University under Dr. James A. Jacobsen 1974-1976). Mr. McDaniel has been the conductor of the “Carrollton Wind Symphony” for the past 5 years. The Carrollton Wind Symphony performed at both the National Association of Concert Bands Conference and the Texas Bandmasters Association Convention in 2010. He holds a Bachelor of Music degree with a minor in trumpet from Texas Christian University and a Master of Music Education from Texas Christian University. Additionally, Mr. McDaniel has Supervision Certification and certification from the Texas A&M University Principal’s Institute.
        </FuturaParagraph>
        <FuturaParagraph>
          The Martin Warrior Band program under his direction won numerous UIL “SWEEPSTAKES” Awards, performed at the prestigious Montreux Jazz Festival in Switzerland, named the “OUTSTANDING” Symphonic Band, Marching and Jazz Band at festivals in Texas, Colorado, Oklahoma and Florida; and was selected three times to the Texas UIL State Marching Contest. Mr. McDaniel received the Kappa Kappa Psi – Tau Beta Sigma TCU Bands Award of Honor as the “Most Outstanding Bandsman”, was selected as the “Teacher of the Year” at Martin High School (1988), the TCU Jazz Ensemble Alumni Award for “Outstanding Service in Jazz Education” (1988), inducted into the TCU Ex-Bandsman Hall of Fame (1996) and was named an “Outstanding Alumnus” by the TCU Bands in 1997. Jim was named one of the top 5 trumpet players from TCU and performed at a halftime performance with the TCU Marching Band. Additionally, he played professionally for a number of years including playing at Six Flags Over Texas while it was a union position. Mr. McDaniel has served as President of Region 5 and 8, Band Division Chair of Region 5, served on the UIL State Music Advisory Board two times.
        </FuturaParagraph>
        <FuturaParagraph>
          Over the past 15 years while at Carrollton/Farmers Branch the district Fine Arts Department has had four of its’ bands as finalist at the state level for Honor Band, two TOP FIVE finalists for Honor Orchestra and Full Orchestra, three Marching Bands selected to the Texas State Marching Contest, one high school choir and three elementary choirs selected to perform at the Texas Music Educators Association Conference, and seven times that one of their high schools finished in the Top Three for State One Act Play.
        </FuturaParagraph>
        <FuturaParagraph>
          Jim Co-chairs the TMEA/TMAC State Assessment Committee, serves on the Texas Coalition for Quality Arts Education, serves as the UIL Region 24 Executive Secretary, Assistant AREA Executive Secretary for Marching AREA B, served for 16 years as the chair for Phi Beta Mu (Alpha Chapter) for selecting presentations for TBA and served as President of the Texas Music Administrators Conference in 2008-2009. He is active as a clinician and judge in Texas, Oklahoma and Louisiana in marching, jazz and symphonic. Mr. McDaniel holds membership in the Texas Bandmasters Association, the Texas Music Educators Association, the Texas Music Adjudicators Association and the Texas Music Administrators Conference. Jim was named “Outstanding Administrator of the Year” by the Texas Music Administrators Conference for 2009-2010.
        </FuturaParagraph>
        <FuturaParagraph>
          He and his wife, Susan, have been married for 36 years (2010). They reside in Carrollton, Texas and their daughter, Heather teaches in the Carrollton/Farmers Branch ISD.
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
