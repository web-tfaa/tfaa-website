// External Dependencies
import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

// Internal Dependencies
import Container from '../../../components/shared/container';

// Component Definition
export default ({ data }) => (
  <div>
    <Helmet>
      <title>TMAC | Events</title>
    </Helmet>
    <Container>
      <h1>
       {data.site.siteMetadata.title} Events
      </h1>
      <section>
        <h4>Summer Round Table</h4>
        <p>
          Held in conjunction with the&nbsp;
          <a href="http://www.texasbandmasters.org/">Texas Bandmasters Association</a>,&nbsp;
          <a href="https://www.tcda.net/">Texas Choral Directors Association</a>, and&nbsp;
          <a href="https://www.todaweb.org/">Texas Orchestra Directors Association</a> summer conventions.
          New music administrators are encouraged to attend!
        </p>
      </section>
      <section>
        <h4>Fall Retreat</h4>
        <p>
          The TMAC Fall Retreat is open to all current TMAC members who are in good standing (registered and paid). There is no separate conference registration process.
        </p>
      </section>
      <section>
        <h4>Winter Round Table</h4>
        <p>Round Table Meeting at the <a href="https://www.tmea.org/">Texas Music Educators Association</a> convention.</p>
      </section>
      <section>
        <h4>Job Fair</h4>
        <p>District representatives must be TMAC members to participate in the TMAC/TMEA job fair (see Job Fair Rules)</p>
      </section>
    </Container>
  </div>
);

export const query = graphql`
  query EventsQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
