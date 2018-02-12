// External Dependences
import React from "react";

// Component Definition
export default ({ data }) =>
  <div>
    <h1>
      About {data.site.siteMetadata.title}
    </h1>
    <section>
      <h3>Our Mission</h3>
      <p>
        To promote and support music education and music educators through collaboration, networking, and the sharing of best practices so that every child in Texas is assured of receiving quality instruction in the understanding, appreciation, and performance of music.
      </p>
    </section>
    <section>
      <h3>Purpose</h3>
      <p>
        The Texas Music Administrators Conference is organized exclusively for charitable, scientific and educational purposes, more specifically to promote and support music education and music educators through collaboration, networking, and the sharing of best practices so that every child in Texas is assured of receiving quality instruction in the understanding, appreciation, and performance of music.

      </p>
    </section>
    <section>
      <h3>
        <a href="#">Constitution & Bylaws</a>
      </h3>
    </section>
    <section>
      <h3>
        <a href="#">Events</a>
      </h3>
      <ul>
        <li>Summer Convention</li>
        <li>Fall Retreat</li>
        <li>Fall Golf Tournament</li>
        <li>Winter Meetings</li>
        <li>Job Fair / Job Fair Rules</li>
      </ul>
    </section>
    <section>
      <h3>
        <a href="#">History</a>
      </h3>
    </section>
    <section>
      <h3>
        <a href="#">Officers</a>
      </h3>
    </section>
    <section>
      <h3>
        <a href="#">Past Presidents</a>
      </h3>
    </section>
    <section>
      <h3>
        <a href="#">Sponsors</a>
      </h3>
    </section>
    <section>
      <h3>
        <a href="#">Statements of Philosophy</a>
      </h3>
    </section>
  </div>

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
