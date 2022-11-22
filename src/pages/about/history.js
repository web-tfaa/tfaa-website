// External Dependencies
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

// Internal Dependencies
import CardHeadline from '../../components/shared/cards/card-headline';
import Container from '../../components/shared/container';
import FuturaParagraph from '../../components/shared/futura-paragraph';
import Layout from '../../components/layout';
import presets from '../../utils/presets';
import MobileSidebar from '../../components/shared/MobileSidebar';
import SidebarBody from '../../components/shared/sidebar/SidebarBody';

// Sidebar data
import aboutSidebar from './about-links.yml';

// Component Definition
const History = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | History</title>
    </Helmet>
    <div
      css={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <Container>
        <img
          alt="Woody Schober"
          src="https://res.cloudinary.com/tmac/image/upload/v1523131020/history_woody-schober.jpg"
        />
        <CardHeadline>TMAC History</CardHeadline>

        <FuturaParagraph>
          In the early 1970s a small group of music supervisors from the
          Dallas-Forth Worth metroplex met together periodically to share ideas
          and help each other with mutual related music concerns. This group
          began to expand and so we moved our meetings to Crystal&apos;s Pizza
          restaurant in Irving and found our meetings becoming more beneficial
          to each other. The meetings remained informal with no set agenda and
          no officers; the only constant was that I arranged the site and sent a
          reminder letter each month to the group. We all looked forward to our
          monthly meeting and always left the meetings with new ideas and a
          refreshed sense of purpose in our work.
        </FuturaParagraph>
        <FuturaParagraph>
          As the group enlarged in our area and across the state, we felt it
          would be beneficial to have music administration opportunities
          specifically targeting our work-related concerns at the TMEA
          conventions and summer meetings. The first TMAC officers were elected
          in February, 1983 at the Texas Music Educators Association Convention
          in San Antonio. The following people were elected as the charter
          officers of the TMAC organization: President R.J. (Dick) Winters,
          Music Coordinator for the Plano Independent School District; Vice
          President Woody Schober, Director of Music, Irving ISD; and
          Secretary-Treasurer Ken Howard, Music Supervisor, Waco ISD. Following
          the election of officers, meetings and workshops were scheduled at
          TMEA and at the summer conventions. These meetings addressed various
          topics including budget, curriculum, personnel, public relations,
          planning and organization, etc.
        </FuturaParagraph>
        <FuturaParagraph>
          As a music educator who spent 30 years in music administration, I was
          grateful for the help and assistance I received as a member of TMAC
          and applaud those now who are continuing to provide this worthwhile
          organization for the continued advancement of music education in our
          state.
        </FuturaParagraph>

        <div>Woody Schober,</div>
        <div>Director of Fine Arts, Retired</div>
        <div>Irving ISD, Irving, Texas</div>

        <MobileSidebar>
          <SidebarBody
            inline
            yaml={aboutSidebar}
          />
        </MobileSidebar>
      </Container>
    </div>
  </Layout>
);

History.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default History;
