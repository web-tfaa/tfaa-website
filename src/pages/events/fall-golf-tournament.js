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
      <title>TMAC | Fall Golf Tournament</title>
    </Helmet>
    <Container>
      <h1>2017 Fall Golf Tournament</h1>

      <section>
        <p>
          The 5th annual Texas Music Administrators Conference Golf Tournament is scheduled in conjunction with our Fall Retreat on Wednesday, November 17th. If you are interested in participating, please communicate directly with <a href="mailto:David_Jennison@roundrockisd.org">David Jennison</a>, Assistant Director of Instrumental Music, Round Rock I.S.D., to reserve your spot.
        </p>
      </section>

      <section>
        <h4>Who</h4>
        <p css={indentStyles}>TMAC members, sponsors and guests</p>
      </section>

      <section>
        <h4>What</h4>
        <p css={indentStyles}>Golf scramble (Best Ball format with mulligans and cheating encouraged!)</p>
      </section>

      <section>
        <h4>When</h4>
        <p css={indentStyles}>
          Wednesday, November 17th
        </p>
        <ul css={{ marginLeft: 36 }}>
          <li>10:30 AM — Warm-up/Check-in</li>
          <li>11:00 AM — Lunch (provided by Conn-Selmer)</li>
          <li>11:45 AM — Begin to tee off in groups</li>
        </ul>
      </section>

      <section>
        <h4>Where</h4>
        <div css={indentStyles}>
          <p>
            <a
              href="http://www.austintexas.gov/department/jimmy-clay-course"
              rel="noopener noreferrer"
              target="_blank"
            >
              Jimmy Clay
            </a> or&nbsp;
            <a
              href="http://www.austintexas.gov/department/roy-kizer-course"
              rel="noopener noreferrer"
              target="_blank"
            >
              Roy Kizer
            </a>&nbsp;Municipal Golf Courses
          </p>
          <p>
            <a
              href="https://www.google.com/maps/place/5400+Jimmy+Clay+Dr,+Austin,+TX+78744/@30.1839103,-97.7341085,17z/data=!3m1!4b1!4m5!3m4!1s0x8644b399c09e5c25:0xbf41df44818b84e6!8m2!3d30.1839103!4d-97.7319198?shorturl=1"
              rel="noopener noreferrer"
              target="_blank"
            >
             5400 Jimmy Clay Dr<br />Austin, TX 78744
            </a>
          </p>
          <p>
            Phone: <a href="tel:+15124440999">(512) 444-0999</a>
          </p>
        </div>
      </section>

      <section>
        <h4>Cost</h4>
        <p css={indentStyles}>
          $35 (due at the course) which includes green fee and cart
        </p>
      </section>

      <div><em>*Please note that this information is subject to change</em></div>

    </Container>
  </div>
);
