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
  width: '50%',
};

const headingNameStyles = {
  marginBottom: 32,
};

// Component Definition
export default ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Sam Harris</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Sam Harris"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523152959/sam-harris.jpg"
        />
        <h2 css={headingNameStyles}>Sam Harris</h2>
        <CardHeadline>TMAC Past President, 2012-2013</CardHeadline>

        <FuturaParagraph>
          Sam Harris is beginning his twenty-ninth year in public education as Director of Fine Arts and Academic Enrichment for the Galena Park Independent School District. Prior to assuming this position in 2000 he spent fifteen years as the choral director at North Shore High School. Sam completed undergraduate and graduate school at Texas State University (formerly Southwest Texas State University), in San Marcos, Texas.
        </FuturaParagraph>
        <FuturaParagraph>
          Under his leadership the North Shore Choral program grew from thirty-five students to more than five hundred and twenty-five students in twelve choral ensembles with choirs receiving multiple Sweepstakes and First Division ratings each year at UIL Concert and Sight-reading Contest as well as winning Best-in-Class and Outstanding Choral Program trophies at regional and national choral competitions. In 1994 the North Shore Chorale was named “Grand Champion of Texas” in the American Classic Music Festivals and performed as an honor choir at the 1996 Texas Music Educators Association State Convention.
        </FuturaParagraph>
        <FuturaParagraph>
          He brings this same commitment to excellence to his tenure as Director of Fine Arts as he supervises more than one hundred staff members in music, art, theater and dance, speech/debate, journalism, cheerleading and drill team for the GPISD. He is responsible for directing all Fine Arts programs, non-athletic UIL, student clubs and organizations, parent support groups and booster clubs, as well as all fundraising activities for the district. Even though every school in GPISD is a Title I campus with a student population that is 70 percent economically disadvantaged and 78 percent Hispanic, GPISD Fine Arts organizations consistently out perform their more affluent peers at UIL competitions.
        </FuturaParagraph>
        <FuturaParagraph>
          He is sought after as an adjudicator and clinician as well as presenting staff development sessions across the state. In addition to his service to the Texas Music Administrators Conference his professional affiliations include the Texas Music Educators Association, Music Educators National Conference, Texas Music Educators Conference, Texas Choral Directors Association, Texas Bandmasters Association, Texas Art Educators Association, Texas Educational Theater Association, Texas Dance Educators Association, Texas Music Adjudicators Association, American Choral Directors Association, and Phi Mu Alpha Sinfonia.
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
