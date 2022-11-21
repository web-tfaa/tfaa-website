// External Dependencies
import { FC } from 'react';
import styled from 'styled-components';

// Local Variables
const StyledRoot = styled.div({
  '.history-content': {
    display: 'flex'
  },
  '.history-title': {
    display: 'inline-block',
    borderBottom: 'solid 1px',
  },
});

// Component Definition
const History: FC = () => (
  <StyledRoot>
    <h3 className="history-title">History</h3>

    <div className="history-content">
      <div>
        <img
          alt="woody schober"
          src="https://res.cloudinary.com/tmac/image/upload/v1523131020/history_woody-schober.jpg"
        />
      </div>
      <div>
        In the early 1970s a small group of music supervisors from the
        Dallas-Forth Worth metroplex met together periodically to share ideas
        and help each other with mutual related music concerns. This group began
        to expand and so we moved our meetings to Crystal&apos;s Pizza restaurant in
        Irving and found our meetings becoming more beneficial to each other.
        The meetings remained informal with no set agenda and no officers; the
        only constant was that I arranged the site and sent a reminder letter
        each month to the group. We all looked forward to our monthly meeting
        and always left the meetings with new ideas and a refreshed sense of
        purpose in our work. As the group enlarged in our area and across the
        state, we felt it would be beneficial to have music administration
        opportunities specifically targeting our work-related concerns at the
        TMEA conventions and summer meetings. The first TMAC officers were
        elected in February, 1983 at the Texas Music Educators Association
        Convention in San Antonio. The following people were elected as the
        charter officers of the TMAC organization: President R.J. (Dick)
        Winters, Music Coordinator for the Plano Independent School District;
        Vice President Woody Schober, Director of Music, Irving ISD; and
        Secretary-Treasurer Ken Howard, Music Supervisor, Waco ISD. Following
        the election of officers, meetings and workshops were scheduled at TMEA
        and at the summer conventions. These meetings addressed various topics
        including budget, curriculum, personnel, public relations, planning and
        organization, etc. As a music educator who spent 30 years in music
        administration, I was grateful for the help and assistance I received as
        a member of TMAC and applaud those now who are continuing to provide
        this worthwhile organization for the continued advancement of music
        education in our state. Woody Schober, Director of Fine Arts, Retired
        Irving ISD, Irving, Texas
      </div>
    </div>
  </StyledRoot>
);

export default History;
