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
const BobBryant = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Bob Bryant</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Bob Bryant"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523146400/bob-bryant.jpg"
        />
        <h2 css={headingNameStyles}>Bob Bryant</h2>
        <CardHeadline>TMAC Past President, 2014-2015</CardHeadline>
        <CardHeadline>2008 TMAC Outstanding Administrator</CardHeadline>

        <FuturaParagraph>
          Bob Bryant is the Executive Director of Fine Arts for Katy I.S.D. Mr.
          Bryant is married to Felice, his supportive and understanding wife of
          39 years. They have three children, Nathan, Natalie, and Noel, all
          accomplished musicians, who participated in concert and marching bands
          throughout their college careers. All three children are now married.
          Bob boasts of their four talented and intelligent grandchildren!
        </FuturaParagraph>
        <FuturaParagraph>
          Prior to this position, Mr. Bryant served as Director of Bands and
          Fine Arts Department Chairman at Katy High School for 17 years. Before
          coming to Katy, he served as Director of Bands in Lamesa, Texas (6
          years) and Sudan, Texas (3 years).
        </FuturaParagraph>
        <FuturaParagraph>
          Throughout his 26 year teaching tenure, bands under the direction of
          Mr. Bryant earned numerous Texas UIL Sweepstakes Awards, by earning
          Division I (Superior) ratings in marching, concert, and sight reading
          competitions. The Katy High School Marching Band reached a student
          enrollment of over 400 members during his term as director and earned
          UIL Superior Ratings 14 of his last 15 years, advancing to the Area
          level of UIL Competition each time for the last 10 years. The Katy
          High School Symphonic Band earned consistent Superior ratings in UIL
          Concert and Sight Reading Competitions and awarded “Best in Class”
          honors and “Outstanding Instrumental Program” honors at numerous music
          festivals across five states. On June 10, 2000, under the direction of
          Mr. Bryant, the Katy High School Symphonic Band presented a concert at
          Carnegie Hall in New York City, New York. In 2013, The Lone Star
          Symphonic Band was named the sole recipient of “The Sudler Silver
          Scroll” as an outstanding community band by the John Philip Sousa
          Association. Mr. Bryant has been the conductor of this volunteer
          ensemble for 6 years.
        </FuturaParagraph>
        <FuturaParagraph>
          Mr. Bryant was awarded the distinction of “Outstanding Music Educator”
          by Texas Tech University in 2006 and was named “Texas Music
          Administrator of the Year” by the Texas Music Administrators
          Conference (TMAC) for 2007-08.
        </FuturaParagraph>
        <FuturaParagraph>
          Mr. Bryant received his Bachelor of Music Education Degree from Texas
          Tech University, Lubbock, Texas, where he studied with Mr. Dean
          Killion. He also received the Master of Music Education Degree from
          Texas Tech University under the tutelage of Mr. James Sudduth. Mr.
          Bryant has served as a member of the State Board for the Texas Music
          Educators Association, continues to serve as a member of state
          committees for TMEA and the Texas Music Administrators Conference.
        </FuturaParagraph>
        <FuturaParagraph>
          Bob is a certified member of the Center for Educator Development in
          Fine Arts training Cadre. He has served two terms as a member of the
          Committee on Standards and Performance Practices for TMAA, and is a
          member of state University Interscholastic League and Texas Education
          Agency committees regarding music education and competition.
        </FuturaParagraph>
        <FuturaParagraph>
          He presently serves as the President of the Texas Music Administrators
          Conference, the state organization for music/fine arts administrators.
          Mr. Bryant is the Founder and Board President of the Katy Jazz
          Association and serves on the Board of the Katy Culture and Arts
          Alliance. He is an active member of the Texas Music Educators
          Association, Texas Bandmasters Association, National Band Association,
          Texas Music Adjudicators Association, Texas Music Administrators
          Conference, and the Phi Beta Mu – Alpha Chapter professional band
          fraternity. He also fulfills a busy schedule as a clinician,
          adjudicator, and staff development provider throughout Texas.
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

BobBryant.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default BobBryant;
