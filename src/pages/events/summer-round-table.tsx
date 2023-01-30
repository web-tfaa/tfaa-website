// External Dependencies
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { EventList } from '.';
import { useEventData } from '../../utils/hooks/useEventData';
import Container from '../../components/shared/container';
// import EnhancedAlert from '../../components/shared/EnhancedAlert';
import Layout from '../../components/layout';

// Local Typings
interface Props {
  location: Location;
}

// Local Variables
const StyledContainer = styled(Container)(({ theme }) => ({
  '.description': {
    marginLeft: theme.spacing(2),
  },
}));

// Component Definition
const SummerRoundTable: FC<Props> = ({ location }) => {
  const { edges } = useEventData();

  const summerRoundTable = edges.find(({ node }: EventList) =>
    node.titleOfEvent.includes('Summer Convention')).node;

  const {
    dateOfEvent,
    timeOfEvent,
    titleOfEvent,
  } = summerRoundTable;

  return (
    <Layout location={location}>
      <Helmet>
        <title>TMAC | Summer Round Table</title>
      </Helmet>

      <StyledContainer>
        <h1>{titleOfEvent}</h1>

        {/* <EnhancedAlert severity="info">
          Details about the 2022 TMAC Summer Round Table will be available soon.
        </EnhancedAlert> */}

        <section>
          <h4>When</h4>

          <Box ml={2}>
            <Box mb={2}>
              {dateOfEvent}
            </Box>

            {timeOfEvent}
          </Box>
        </section>

        <section>
          <h4>Where</h4>

          <div className="description">
            <address>
              <div>Room CC210</div>
              <a
                href="http://www.sahbgcc.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Henry B. Gonzalez Convention Center
              </a>
              <p>
                <a
                  href="https://www.google.com/maps/place/Henry+B.+Gonzalez+Convention+Center/@29.4205819,-98.4839688,15z/data=!4m5!3m4!1s0x0:0x9adbeeaa9ace85f0!8m2!3d29.4205819!4d-98.4839688"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  900 E. Market St
                  <br />
                  San Antonio, TX 78205
                </a>
              </p>
            </address>
          </div>
        </section>

        <section>
          <h4>Why</h4>

          <Box ml={2}>
            Held in conjunction with these summer conventions:
            <ul>
              <li>
                <a href="http://www.texasbandmasters.org/">Texas Bandmasters Association</a>
              </li>
              <li>
                <a href="https://www.tcda.net/">Texas Choral Directors Association</a>
              </li>
              <li>
                <a href="https://www.todaweb.org/">Texas Orchestra Directors Association</a>
              </li>
            </ul>
          </Box>
        </section>

        <section>
          <h4>Who</h4>

          <Box
            component="p"
            ml={2}
          >New music administrators are encouraged to attend!
          </Box>
        </section>
      </StyledContainer>
    </Layout>
  );
};

export default SummerRoundTable;
