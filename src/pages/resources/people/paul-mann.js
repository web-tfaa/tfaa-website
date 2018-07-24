// External Dependencies
import Helmet from 'react-helmet';
import React from 'react';

// Internal Dependencies
import CardHeadline from '../../../components/shared/cards/card-headline';
import Container from '../../../components/shared/container';
import FuturaParagraph from '../../../components/shared/futura-paragraph';

// Local Variables
const rootStyles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
};

const imageStyles = {
  marginBottom: 0,
};

const headingNameStyles = {
  marginBottom: 32,
};

// Component Definition
export default () => (
  <div>
    <Helmet>
      <title>TMAC | Paul Mann</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          alt="Paul Mann"
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523146399/paul-mann.jpg"
        />
        <h2 css={headingNameStyles}>Paul Mann</h2>
        <CardHeadline>TMAC Past President, 1987-1988</CardHeadline>

        <FuturaParagraph>
          From 1969 to 1977, Paul Mann taught high school band and orchestra at Roswell, Georgia, where his groups were consistently awarded first division ratings. After directing the McAllen High School Band in the late 1970s and early 1980s, he became McAllen ISD’s first Director of Music Education (later Director of Fine Arts). He remained in that position for nineteen years and then went on to serve as MISD’s Director of Research and Policy until his retirement in 2004. By the time of his retirement, he had coordinated the construction or complete renovation of every secondary music facility in the district and had witnessed a doubling of district enrollment along with a four-fold increase in music enrollment.
        </FuturaParagraph>
        <FuturaParagraph>
          He holds a PhD from the University of Southern Mississippi and two other degrees from the Louisiana State University at Monroe. Paul was President of the Texas Music Administrators Conference in the late 1980s and also compiled and edited TMAC’s first statewide data book on music programs.
        </FuturaParagraph>
        <FuturaParagraph>
          A Vietnam War veteran, he served a combined total of ten years on active duty and in the US Army Reserve. He has been married for the past forty-seven years to the former Rosalyn Thweatt. Since 2004 he has assisted his daughter, Dr. Laura Tamayo and her partner in the management of their pediatric practice. His son Bill is an Associate Professor of Music at Morehead State University in Kentucky.
        </FuturaParagraph>
      </Container>
    </div>
  </div>
);
