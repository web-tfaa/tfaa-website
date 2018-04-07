// External Dependencies
import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

// Internal Dependencies
import Container from '../../../components/shared/container';

// Component Definition
export default () => (
  <div>
    <Helmet>
      <title>TMAC | Summer Round Table</title>
    </Helmet>
    <Container>
      <h1>2017 Summer Convention Round Table</h1>
      <section>
        <h4>Friday, July 21, 2017</h4>
        <div>
          <a href="http://www.sahbgcc.com/">
            Henry B. Gonzalez Convention Center
          </a>,&nbsp;
          CC210 (tentative room assignment)
        </div>
        <p>
          <a href="https://www.google.com/maps/place/Henry+B.+Gonzalez+Convention+Center/@29.4205819,-98.4839688,15z/data=!4m5!3m4!1s0x0:0x9adbeeaa9ace85f0!8m2!3d29.4205819!4d-98.4839688">900 E Market St, San Antonio, TX 78205</a>
        </p>
          <p>
            Held in conjunction with the&nbsp;
            <a href="http://www.texasbandmasters.org/">Texas Bandmasters Association</a>,&nbsp;
            <a href="https://www.tcda.net/">Texas Choral Directors Association</a>, and&nbsp;
            <a href="https://www.todaweb.org/">Texas Orchestra Directors Association</a> summer conventions.
          </p>

          <h4>New music administrators are encouraged to attend!</h4>
      </section>

    </Container>
  </div>
);
