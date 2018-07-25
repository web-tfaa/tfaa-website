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
      <title>TMAC | Robert Rumph</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Robert Rumph"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523146400/robert-rumph.jpg"
        />
        <h2 css={headingNameStyles}>Robert Rumph</h2>
        <CardHeadline>TMAC Past President, 2009-2010</CardHeadline>

        <FuturaParagraph>
          Upon high school graduation from Enid, Oklahoma, Robert came to Texas as quickly as possible! He attended West Texas A&M University in Canyon where he earned his full Texas citizenship by marrying his wife Johnny, a TMEA All-State Band member! Robert received his Bachelor of Music Education and Master of Music Degrees from WTAMU. As a band director for 10 years, his Canyon HS Bands were consistent sweepstakes winners.
        </FuturaParagraph>
        <FuturaParagraph>
          In 1996 he entered school administration, where he has served as a middle school principal, elementary principal, and superintendent. As superintendent of Wildorado ISD, the district was awarded as a  National Title I School from the Texas Education Agency,  and was a TEA Exemplary District for 5 consecutive years. From 2004 – 2010 Robert was the Director of Fine Arts for Lubbock ISD, where he served as TMAC President in 2010.
        </FuturaParagraph>
        <FuturaParagraph>
          He is currently the Director of Secondary and Federal Programs, Fine Arts, and Public Relations for Pampa ISD. His wife Johnny teaches elementary music for the district. Professional affiliations include TMEA, TMAC, TASPA, and TASBO.  Robert and wife Johnny’s proudest accomplishments are their three grown children, all products of Texas Public Schools, and talented band students throughout their school career.
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
