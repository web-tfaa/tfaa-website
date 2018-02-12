// External Dependencies
import React from "react";
import styled from "styled-components";

// Internal Dependencies
import Constitution from '../../components/constitution'

// Local Variables
const AboutTitle = styled.h3`
  display: inline-block;
  border-bottom: solid 1px;
`;

// Component Definition
export default ({ data }) =>
  <div>
    <AboutTitle>
      About {data.site.siteMetadata.title}
    </AboutTitle>
    <section>
      <h4>Our Mission</h4>
      <p>
        To promote and support music education and music educators through collaboration, networking, and the sharing of best practices so that every child in Texas is assured of receiving quality instruction in the understanding, appreciation, and performance of music.
      </p>
    </section>
    <section>
      <h4>Purpose</h4>
      <p>
        The Texas Music Administrators Conference is organized exclusively for charitable, scientific and educational purposes, more specifically to promote and support music education and music educators through collaboration, networking, and the sharing of best practices so that every child in Texas is assured of receiving quality instruction in the understanding, appreciation, and performance of music.

      </p>
    </section>
    <section>
      <h4>
        <a href="#">Constitution & Bylaws</a>
      </h4>
    </section>
    <section>
      <h4>
        <a href="#">Events</a>
      </h4>
      <ul>
        <li>Summer Convention</li>
        <li>Fall Retreat</li>
        <li>Fall Golf Tournament</li>
        <li>Winter Meetings</li>
        <li>Job Fair / Job Fair Rules</li>
      </ul>
    </section>
    <section>
      <h4>
        <a href="#">History</a>
      </h4>
    </section>
    <section>
      <h4>
        <a href="#">Officers</a>
      </h4>
    </section>
    <section>
      <h4>
        <a href="#">Past Presidents</a>
      </h4>
    </section>
    <section>
      <h4>
        <a href="#">Sponsors</a>
      </h4>
    </section>
    <section>
      <h4>
        <a href="#">Statements of Philosophy</a>
      </h4>
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
