// External Dependencies
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

// Internal Dependencies
import CardHeadline from '../../components/shared/cards/card-headline';
import Cards from '../../components/shared/cards';
import Container from '../../components/shared/container';
import FuturaParagraph from '../../components/shared/futura-paragraph';
import Layout from '../../components/layout';
import SidebarBody from '../../components/shared/sidebar/sidebar-body';

// Sidebar data
import aboutSidebar from './about-links.yml';

// Helpers
import presets, { colors } from '../../utils/presets';
import { rhythm, options } from '../../utils/typography';

const PhilosophyCard = ({ children }) => (
  <div
    css={{
      boxSizing: 'border-box',
      display: 'flex',
      transform: 'translateZ(0)',
      [presets.Tablet]: {
        boxShadow: `0 1px 0 0 ${colors.ui.light}`,
        '&:nth-child(5),&:nth-child(6)': {
          boxShadow: 'none',
        },
        '&:nth-child(2n)': {
          borderLeft: `1px solid ${colors.ui.light}`,
        },
      },
      [presets.Hd]: {
        borderLeft: `1px solid ${colors.ui.light}`,
        flex: '0 0 100%',
        maxWidth: '100%',
        '&:nth-child(4)': {
          boxShadow: 'none',
        },
        '&:nth-child(3n+1)': {
          borderLeft: 0,
        },
      },
    }}
  >
    <div
      css={{
        padding: rhythm(presets.gutters.default / 2),
        paddingBottom: 0,
        transform: 'translateZ(0)',
      }}
    >
      {children}
    </div>
  </div>
);
PhilosophyCard.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const FuturaDiv = ({ children }) => (
  <div
    css={{
      fontFamily: options.headerFontFamily.join(','),
      lineHeight: '1.6',
    }}
  >
    {children}
  </div>
);
FuturaDiv.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({}),
    ]),
  ).isRequired,
};

// Component Definition
const Philosophy = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Philosophy</title>
    </Helmet>
    <div
      css={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <Container>
        <h1 css={{ marginTop: '1rem' }}>Statements of Philosophy</h1>
        <Cards>
          <PhilosophyCard>
            <CardHeadline>ASSESSMENT IN THE ARTS</CardHeadline>
            <h5 css={{ marginTop: '1rem' }}>
              Approved at the TMAC Fall Retreat, 2004
            </h5>

            <FuturaParagraph>
              Texas Music Administrators Conference acknowledges that formal
              assessments are integral to insure a quality fine arts program.
              Because districts across the state vary greatly in the areas of
              curriculum development, scheduling and staffing issues, it is the
              recommendation of the TMAC Vision Committee that every district
              develop their own standards for assessments in the arts.
            </FuturaParagraph>
            <FuturaParagraph>
              The Vision Committee recommends that TMAC collaborate with TMEA to
              form a mini task force that will establish guidelines to aid
              districts in developing TEKS standard based assessments.
            </FuturaParagraph>
            <FuturaDiv>
              Vision Committee:
              <ul>
                <li css={{ marginBottom: 0 }}>Randy Bartlett, Chair</li>
                <li css={{ marginBottom: 0 }}>Deborah Kidwell</li>
                <li css={{ marginBottom: 0 }}>Mike Mamminga</li>
                <li css={{ marginBottom: 0 }}>Lisa Roebuck</li>
                <li css={{ marginBottom: 0 }}>Barry Talley</li>
                <li css={{ marginBottom: 0 }}>Craig Welle</li>
              </ul>
            </FuturaDiv>
            <FuturaDiv>
              Mini Task Force Committee:
              <ul>
                <li css={{ marginBottom: 0 }}>Randy Bartlett, Chair</li>
                <li css={{ marginBottom: 0 }}>
                  Lisa Roebuck, Elementary Music Representative
                </li>
                <li css={{ marginBottom: 0 }}>
                  Deborah Kidwell, Orchestra Representative
                </li>
                <li css={{ marginBottom: 0 }}>
                  "Buzzy” Green, Band Representative
                </li>
                <li css={{ marginBottom: 0 }}>
                  David McCullar, Vocal Representative
                </li>
              </ul>
            </FuturaDiv>
          </PhilosophyCard>
          <PhilosophyCard>
            <CardHeadline>UIL MARCHING BAND PHILOSOPHY STATEMENT</CardHeadline>
            <h5 css={{ marginTop: '1rem' }}>
              Approved at the TMEA Business Meeting, 2006
            </h5>

            <FuturaParagraph>
              <span css={{ fontWeight: 600 }}>Recognize:</span>
            </FuturaParagraph>
            <FuturaParagraph>
              The Texas Music Administrators Conference recognizes that marching
              band continues to evolve as an art form. TMAC also recognizes that
              there are many types of adjudicated festival/competition
              experiences. TMAC support the commitment of UIL and TMAA to
              continually evaluate the requirements of the marching band in
              Texas and make the necessary revisions, as needed, in the
              adjudication instrument and process to meet the needs of this
              ever-changing medium of performance.
            </FuturaParagraph>
            <FuturaParagraph>
              <span css={{ fontWeight: 600 }}>Recommendations:</span>
            </FuturaParagraph>
            <FuturaParagraph>
              <span css={{ fontWeight: 600 }}>A.</span> TMAC is in complete
              support of and recommends that the integrity of the music and
              learning experience always remain the highest priority.
            </FuturaParagraph>
            <FuturaParagraph>
              <span css={{ fontWeight: 600 }}>B.</span> TMAC recommends that all
              Texas high school marching band programs, in conjunction with the
              UIL music office, seek to ensure that the UIL State Marching
              Contest be established as the premier marching contest in the
              state of Texas.
            </FuturaParagraph>
            <FuturaParagraph>
              <span css={{ fontWeight: 600 }}>C.</span> TMAC commends the UIL
              for its ongoing efforts in making the UIL marching competition at
              the region, area, and state levels remain the ultimate assessment
              and evaluation instrument for all Texas marching bands.
            </FuturaParagraph>
            <FuturaParagraph>
              <span css={{ fontWeight: 600 }}>D.</span> TMAC recommends and
              supports a continued dialog regarding the escalating costs
              associated with marching band productions.
            </FuturaParagraph>
          </PhilosophyCard>
        </Cards>
        {/* Mobile sidebar */}
        <div
          css={{
            display: 'block',
            [presets.Tablet]: {
              display: 'none',
            },
          }}
        >
          <hr
            css={{
              border: 0,
              height: 2,
              marginTop: 10,
            }}
          />
          <SidebarBody inline yaml={aboutSidebar} />
        </div>
      </Container>
    </div>
  </Layout>
);

Philosophy.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default Philosophy;
