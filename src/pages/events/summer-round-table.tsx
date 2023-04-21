// External Dependencies
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { EventList } from '.';
import { useEventData } from '../../utils/hooks/useEventData';
import Container from '../../components/shared/container';
// import EnhancedAlert from '../../components/shared/EnhancedAlert';
import Layout from '../../components/layout';
import { appNameShort } from '../../utils/app-constants';

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

  const { titleOfEvent } = summerRoundTable;

  return (
    <Layout
      location={location}
      pageTitle="Summer Round Table"
    >
      <StyledContainer>
        <h1>{titleOfEvent}</h1>

        {/* <EnhancedAlert severity="info">
          Details about the 2022 TMAC Summer Round Table will be available soon.
        </EnhancedAlert> */}

        <section>
          <Box ml={2}>
            <Typography
              component="h3"
              gutterBottom
              variant="h6"
            >
              {appNameShort} Aspiring Fine Arts Administrator Boot Camp Workshop
            </Typography>

            <div className="description">
              <Typography gutterBottom>
                Targeted to brand new or aspiring administrators
              </Typography>

              <Typography
                gutterBottom
                variant="body2"
              >
                CC218
              </Typography>

              <Typography
                component="time"
                dateTime="2023-07-21"
                gutterBottom
                sx={{ display: 'block' }}
                variant="body2"
              >
                Friday, July 21, 2023 • 10:00 AM-12:00 PM
              </Typography>
            </div>

            <Box marginTop={3}>
              <Typography
                component="h3"
                gutterBottom
                variant="h6"
              >
                {appNameShort} Summer Roundtable
              </Typography>

              <div className="description">
                <Typography
                  gutterBottom
                  variant="body2"
                >
                  CC210
                </Typography>

                <Typography
                  component="time"
                  dateTime="2023-07-21"
                  gutterBottom
                  sx={{ display: 'block' }}
                  variant="body2"
                >
                  Friday, July 21, 2023 • 1:30-4:30 PM
                </Typography>

                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Keynote • 1:30-2:00 PM"
                      secondary="Larry Livingston"
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary="Updates"
                      secondary="Mr. Floyd; Dr. Kent"
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemText primary="Roundtable" />
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary="TIA with Frank Ghafoor, TEA Specialist • 3:30-4:30pm"
                      secondary="Teacher Observation Best Practices in a Fine/Performing Arts Classroom followed by Q&A"
                    />
                  </ListItem>
                </List>
              </div>
            </Box>
          </Box>
        </section>

        <Box
          component="section"
          marginTop={4}
        >
          <h4>Where</h4>

          <div className="description">
            <address>
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
        </Box>

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
          >
            New music administrators are encouraged to attend!
          </Box>
        </section>
      </StyledContainer>
    </Layout>
  );
};

export default SummerRoundTable;
