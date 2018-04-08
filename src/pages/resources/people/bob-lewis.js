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
      <title>TMAC | Bob Lewis</title>
    </Helmet>
    <div css={rootStyles}>
      <Container>
        <img
          css={imageStyles}
          src="https://res.cloudinary.com/tmac/image/upload/v1523146399/bob-lewis.jpg"
        />
        <h2 css={headingNameStyles}>Bob Lewis</h2>
        <CardHeadline>TMAC Past President, 1988-1989</CardHeadline>

        <FuturaParagraph>
          Bob Lewis retired in 1990 as Director of Fine Arts for the Northside Independent School District in San Antonio, Texas after serving forty-one years as a music educator.
        </FuturaParagraph>
        <FuturaParagraph>
          Lewis was band director for one year in Sanderson, one year in Abilene, six years in Hondo, and thirty-three years in Northside. Under Lewis`s direction the Northside High School Band (later John Marshall High School) grew from thirty-six members to three hundred ninety members in 1975 when he became an administrator. The band established a tradition of excellence in local, state, and national music and marching competitions.
        </FuturaParagraph>
        <FuturaParagraph>
          As Director of Fine Arts Lewis established the elementary music program, the elementary art program, the string orchestra program, and continued to expand the band, choir, orchestra, art, and theater arts programs, and Northside's performing groups have continued the tradition of excellence. At the time of his retirement in 1990 there were over 50,000 students involved in fine arts programs.
        </FuturaParagraph>
        <FuturaParagraph>
          Lewis played trumpet in the Abilene High School Band under the direction of beloved “Prof” Raymond T. Bynum and has enjoyed a long career as a professional trumpet player. He attended Hardin-Simmons University and North Texas State University before joining the U.S. Army in 1945 where he rose to the rank of tech-sergeant and was among the first troops to occupy Japan. After the war Lewis returned to Hardin-Simmons University and graduated with the Bachelor of Music degree in1948 and later earned a Master of Education degree at Our Lady of the Lake University.
        </FuturaParagraph>
        <FuturaParagraph>
          Bob and Celeste, his wife (deceased) of 59 years have six children: Chris Lewis (deceased), Greg Lewis, Theresa Espinoza, Mary Anna Smith, David Lewis, and Gabriel Lewis. There are also seventeen grand-children and twelve great grand-children.
        </FuturaParagraph>
        <FuturaParagraph>
          Lewis is thankful for his association with the many students, parents, patrons, and colleagues he has been privileged to know through these many years.
        </FuturaParagraph>
        <FuturaParagraph>
          In 2001 the Northside District named a school Bob Lewis Elementary School in appreciation for his contributions to the district.
        </FuturaParagraph>
      </Container>
    </div>
  </div>
);
