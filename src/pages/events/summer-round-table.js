// External Dependencies
import Helmet from 'react-helmet';
import React from 'react';

// Internal Dependencies
import Container from '../../components/shared/container';

// Local Variables
const indentStyles = {
  marginLeft: 16,
};

// Component Definition
export default () => (
  <div>
    <Helmet>
      <title>TMAC | Summer Round Table</title>
    </Helmet>
    <Container>
      <h1>2017 Summer Convention Round Table</h1>
      <section>
        <h4>When</h4>
        <p css={indentStyles}>Friday, July 21, 2017</p>
      </section>

      <section>
        <h4>Where</h4>
        <div css={indentStyles}>
          <a
            href="http://www.sahbgcc.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Henry B. Gonzalez Convention Center
          </a>,&nbsp;
          CC210 (tentative room assignment)
          <p>
            <a
              href="https://www.google.com/maps/place/Henry+B.+Gonzalez+Convention+Center/@29.4205819,-98.4839688,15z/data=!4m5!3m4!1s0x0:0x9adbeeaa9ace85f0!8m2!3d29.4205819!4d-98.4839688"
              rel="noopener noreferrer"
              target="_blank"
            >
              900 E. Market St<br />San Antonio, TX 78205
            </a>
          </p>
        </div>
      </section>

      <section>
        <h4>Why</h4>
        <p css={indentStyles}>
          Held in conjunction with the&nbsp;
          <a href="http://www.texasbandmasters.org/">Texas Bandmasters Association</a>,&nbsp;
          <a href="https://www.tcda.net/">Texas Choral Directors Association</a>, and&nbsp;
          <a href="https://www.todaweb.org/">Texas Orchestra Directors Association</a> summer conventions.
        </p>
      </section>

      <section>
        <h4>Who</h4>
        <p css={indentStyles}>New music administrators are encouraged to attend!</p>
      </section>

    </Container>
  </div>
);
