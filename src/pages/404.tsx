// External Dependencies
import { Link } from 'gatsby-theme-material-ui';
import { lighten } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../utils/app-constants';
import Layout from '../components/layout';
import FourOhFourBanner from '../components/fourOhFour/FourOhFourBanner';

// Local Typings
interface Props {
  location: Location;
}

// Local Variables
const StyledRoot = styled.div(({ theme }) => ({
  '.fourOhFourCard': {
    backgroundColor: lighten(theme.palette.tfaa.resources, 0.8),
  },

  '.fourOhFourCardContent': {
    '&:last-child': {
      paddingBottom: theme.spacing(6),
    },
    padding: theme.spacing(4, 6),
  },

  '.fourOhFourTitle': {
    fontSize: 34,
    fontWeight: 900,
    marginBottom: theme.spacing(4),
  },

  section: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: theme.spacing(10),
  },

  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  width: '100vw',
}));

// Component Definition
const FourOhFour: FC<Props> = ({ location }) => {
  return (
    <Layout location={location} pageTitle="Not Found">
      <StyledRoot>
        <FourOhFourBanner />

        <section>
          <Typography
            className="fourOhFourTitle"
            component="h2"
            variant="h4"
          >
            Page Not Found
          </Typography>

          <Card className="fourOhFourCard" variant="outlined">
            <CardContent className="fourOhFourCardContent">
              <Typography>
                Try heading back to our <Link to="/">main page</Link> to find out more
                about {appNameShort}!
              </Typography>
            </CardContent>
          </Card>
        </section>
      </StyledRoot>
    </Layout>
  );
};

export default FourOhFour;
