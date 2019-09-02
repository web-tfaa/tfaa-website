// External Dependencies
import Helmet from 'react-helmet';
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
const JamesDrew = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | James Drew</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="James Drew"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1567444074/james-drew.jpg"
        />
        <h2 css={headingNameStyles}>James Drew</h2>
        <CardHeadline>2019 TMAC Outstanding Administrator</CardHeadline>
        <FuturaParagraph>
          Since 2011, James Drew has served as the Director of Fine Arts for the Fort Bend Independent School District in Sugar Land, Texas. Prior to this appointment as Fine Arts Director, James conducted bands and orchestras in the Texas public schools for 21 years, one year in Killeen, Texas and the remaining 20 years in Fort Bend ISD. Ensembles under James’s direction have been selected as state Honor Band finalists and performed at the prestigious Midwest Clinic on four separate occasions. James was chosen the Outstanding Young Bandmaster of the Year in 1997 by the honorary band director’s fraternity, Phi Beta Mu.
        </FuturaParagraph>
        <FuturaParagraph>
          Since his appointment as Fine Arts Director, James has worked tirelessly to advance the Department’s vision of becoming the premier school districts for Fine Arts education in the nation. With the Department’s support, FBISD performing groups and individual students continue to garner state and national recognition. Under James’s leadership, FBISD has added 134 teaching positions, three administrative positions, and two clerical positions to support Arts education. The Department’s annual budget has increased from $1.5 million to $3.1 million and the District has purchased over $5 million in new instruments to replace aging inventory. To develop teaching capacity among FBISD’s Fine Arts staff, James established a job-embedded professional growth model, linking classroom observations with professional coaching. He worked collaboratively with stakeholders to create an innovative program evaluation system to promote excellence in all artistic disciplines. James has implemented new curricula for the District’s 80-plus Fine Arts courses, established a progressive arts-integration teacher network, and initiated an El-Sistema-type, after-school string program. James recently was named the 2019 Music Administrator of the Year by the Texas Music Administrators Conference.
        </FuturaParagraph>
        <FuturaParagraph>
          James earned a Bachelor of Music Education degree from Oral Roberts University, a Master of Music degree in Instrumental Conducting from West Texas State University, and a Master of Arts in Psychology degree from Houston Baptist University. James holds membership in the Texas Music Educators Association, Texas Bandmasters Association, Texas Music Administrators Conference, Alpha Chapter of Phi Beta Mu, and currently serves as the Concert Band Vice-President for the Texas Music Adjudicators Association.
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

JamesDrew.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default JamesDrew;
