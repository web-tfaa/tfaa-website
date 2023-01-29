// External Dependencies
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

// Internal Dependencies
import CardHeadline from '../../components/shared/cards/card-headline';
import Cards from '../../components/shared/cards';
import Container from '../../components/shared/container';
import FuturaParagraph from '../../components/shared/futura-paragraph';
import Layout from '../../components/layout';
import FuturaDiv from '../../components/shared/futura-div';
import PhilosophyCard from '../../components/shared/PhilosophyCard';

// Local Variables
const StyledRoot = styled(Box)({
  '.strong': {
    fontWeight: 600,
  },

  li: {
    marginBottom: 0,
  },
});

// Component Definition
const Philosophy = ({ location }) => (
  <Layout location={location}>
    <Helmet>
      <title>TMAC | Philosophy</title>
    </Helmet>

    <StyledRoot
      display="flex"
      flexWrap="wrap"
      justifyContent="space-between"
    >
      <Container>
        <Box
          component="h1"
          marginTop={2}
        >
          Statements of Philosophy
        </Box>

        <Cards>
          <PhilosophyCard>
            <CardHeadline>ASSESSMENT IN THE ARTS</CardHeadline>

            <Box
              component="h5"
              marginTop={2}
            >
              Approved at the TMAC Fall Retreat, 2004
            </Box>

            <FuturaParagraph>
              Texas Music Administrators Conference acknowledges that formal assessments are
              integral to insure a quality fine arts program. Because districts across the state
              vary greatly in the areas of curriculum development, scheduling and staffing issues,
              it is the recommendation of the TMAC Vision Committee that every district develop
              their own standards for assessments in the arts.
            </FuturaParagraph>

            <FuturaParagraph>
              The Vision Committee recommends that TMAC collaborate with TMEA to form a mini task
              force that will establish guidelines to aid districts in developing TEKS standard
              based assessments.
            </FuturaParagraph>

            <FuturaDiv>
              Vision Committee:
              <ul>
                <li>Randy Bartlett, Chair</li>
                <li>Deborah Kidwell</li>
                <li>Mike Mamminga</li>
                <li>Lisa Roebuck</li>
                <li>Barry Talley</li>
                <li>Craig Welle</li>
              </ul>
            </FuturaDiv>

            <FuturaDiv>
              Mini Task Force Committee:
              <ul>
                <li>Randy Bartlett, Chair</li>
                <li>Lisa Roebuck, Elementary Music Representative</li>
                <li>Deborah Kidwell, Orchestra Representative</li>
                <li>&quot;Buzzy&quot; Green, Band Representative</li>
                <li>David McCullar, Vocal Representative</li>
              </ul>
            </FuturaDiv>
          </PhilosophyCard>

          <PhilosophyCard>
            <CardHeadline>UIL MARCHING BAND PHILOSOPHY STATEMENT</CardHeadline>

            <Box
              component="h5"
              marginTop={2}
            >
              Approved at the TMEA Business Meeting, 2006
            </Box>

            <FuturaParagraph>
              <span className="strong">Recognize:</span>
            </FuturaParagraph>

            <FuturaParagraph>
              The Texas Music Administrators Conference recognizes that marching band continues to
              evolve as an art form. TMAC also recognizes that there are many types of adjudicated
              festival/competition experiences. TMAC support the commitment of UIL and TMAA to
              continually evaluate the requirements of the marching band in Texas and make the
              necessary revisions, as needed, in the adjudication instrument and process to meet the
              needs of this ever-changing medium of performance.
            </FuturaParagraph>

            <FuturaParagraph>
              <span className="strong">Recommendations:</span>
            </FuturaParagraph>

            <FuturaParagraph>
              <span className="strong">A.</span> TMAC is in complete support of and
              recommends that the integrity of the music and learning experience always remain the
              highest priority.
            </FuturaParagraph>

            <FuturaParagraph>
              <span className="strong">B.</span> TMAC recommends that all Texas high school
              marching band programs, in conjunction with the UIL music office, seek to ensure that
              the UIL State Marching Contest be established as the premier marching contest in the
              state of Texas.
            </FuturaParagraph>

            <FuturaParagraph>
              <span className="strong">C.</span> TMAC commends the UIL for its ongoing
              efforts in making the UIL marching competition at the region, area, and state levels
              remain the ultimate assessment and evaluation instrument for all Texas marching bands.
            </FuturaParagraph>

            <FuturaParagraph>
              <span className="strong">D.</span> TMAC recommends and supports a continued
              dialog regarding the escalating costs associated with marching band productions.
            </FuturaParagraph>
          </PhilosophyCard>
        </Cards>
      </Container>
    </StyledRoot>
  </Layout>
);

Philosophy.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default Philosophy;
