// External Dependencies
import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

// Internal Dependencies
import Container from '../../../components/shared/container';

// Local Variables
const indentStyles = {
  marginLeft: 16,
};

// Component Definition
export default () => (
  <div>
    <Helmet>
      <title>TMAC | Fall Retreat</title>
    </Helmet>
    <Container>
      <h1>2017 TMAC Fall Retreat</h1>

      <section>
        <h4>Who</h4>
        <p css={indentStyles}>
          The TMAC Fall Retreat is open to all current TMAC members who are in good standing (registered and paid). There is no separate conference registration process.
        </p>
      </section>
      
      <section>
        <h4>When</h4>
        <p css={indentStyles}>Wednesday, November 15 (6:30 PM) — Friday, November 17, 2017 (noon)</p>
      </section>

      <section>
        <h4>Where</h4>
        <div css={indentStyles}>
          <p>
            <a
              href="http://www.marriott.com/hotels/travel/ausap-austin-marriott-south/?scid=45f93f1b-bd77-45c9-8dab-83b6a417f6fe"
              rel="noopener noreferrer"
              target="_blank"
            >
              Austin Airport Marriott South
            </a>
          </p>
          <p>
            <a
              href="https://www.google.com/maps/place/4415+S+IH+35+Frontage+Rd,+Austin,+TX+78744/@30.2109504,-97.755463,17z/data=!3m1!4b1!4m5!3m4!1s0x8644b49cb7935da1:0x5a86d0320722c79b!8m2!3d30.2109504!4d-97.7532743"
              rel="noopener noreferrer"
              target="_blank"
            >
              4415 South IH-35<br />Austin, Texas 78744
            </a>
          </p>
          <p>
            Phone: <a href="tel:+15124418900">(512) 441-7900</a><br />
            Fax: (512) 441-7899
          </p>
        </div>
      </section>

    </Container>
  </div>
);
