// External Dependencies
import React from 'react';
import Helmet from 'react-helmet';

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
          hi
        </p>
      </section>
      <section>
        <h4>Fall Retreat</h4>
        <p>
          hello
        </p>
      </section>
      <section>
        <h4>Winter Round Table</h4>
        <p>hey there</p>
      </section>
      <section>
        <h4>Job Fair</h4>
        <p>oh yeah</p>
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
