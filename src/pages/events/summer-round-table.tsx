// External Dependencies
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, { FC } from 'react';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { EventList } from '.';
import { appNameShort } from '../../utils/app-constants';
import { useEventData } from '../../utils/hooks/useEventData';
import Container from '../../components/shared/container';
import EnhancedCard from '../../components/shared/EnhancedCard';
// import EnhancedAlert from '../../components/shared/EnhancedAlert';
import Layout from '../../components/layout';

// Local Typings
interface Props {
  location: Location;
}

// Local Variables
const StyledContainer = styled(Container)(({ theme }) => ({
  '.MuiCardContent-root': {
    padding: 0,
  },
  '.MuiCardHeader-root': {
    '&.top-card-header': {
      backgroundColor: alpha(theme.palette.ui.lilac, 0.4),
    },
    '&.bottom-card-header': {
      backgroundColor: alpha(theme.palette.tfaa.membership, 0.3),
    },
  },
  '.MuiChip-label': {
    padding: theme.spacing(1.5),
  },
  '.MuiChip-root': {
    backgroundColor: alpha(theme.palette.tfaa.resources, 0.6),
  },
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

        <Typography
          component="h2"
          sx={{ marginBottom: 3 }}
          variant="h5"
        >
          <time dateTime="Friday, July 21">
            Friday, July 21
          </time>
        </Typography>

        {/* <EnhancedAlert severity="info">
          Details about the 2022 TMAC Summer Round Table will be available soon.
        </EnhancedAlert> */}

        <section>
          <Box ml={2}>
            <EnhancedCard>
              <CardHeader
                className="top-card-header"
                title={(
                  <time dateTime="10:00">
                    10:00 AM-12:00 PM
                  </time>
                )}
              />

              <Box padding={2}>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                  variant="subtitle1"
                >
                  {appNameShort} Aspiring Fine Arts Administrator Boot Camp Workshop
                </Typography>

                <div className="description">
                  <Typography gutterBottom>
                    Targeted to brand new or aspiring administrators
                  </Typography>

                  <Box display="flex">
                    <Typography
                      gutterBottom
                      variant="body2"
                    >
                      CC205
                    </Typography>

                    <Chip
                      label="New Location"
                      size="small"
                      sx={{
                        marginLeft: 1.5,
                        // paddingY: 1,
                      }}
                    />
                  </Box>
                </div>
              </Box>
            </EnhancedCard>

            <EnhancedCard sx={{ marginTop: 3 }}>
              <CardHeader
                className="bottom-card-header"
                title={(
                  <time dateTime="1:30">
                    1:30-4:30 PM
                  </time>
                )}
              />

              <Box padding={2}>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                  variant="subtitle1"
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
                        secondary="An Introduction & Overview of the Teacher Incentive Allotment (TIA) Program"
                      />
                    </ListItem>
                  </List>
                </div>
              </Box>
            </EnhancedCard>
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
