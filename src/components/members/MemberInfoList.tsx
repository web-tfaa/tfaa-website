// External Dependencies
// import { Link } from 'gatsby-theme-material-ui';
import { lighten } from '@mui/material';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../utils/app-constants';
import MembershipByLaws from '../about/MembershipByLaws';
import Motifs from '../shared/Motifs';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.MuiCard-root': {
    backgroundColor: lighten(theme.palette.tfaa.resources, 0.9),
    borderColor: lighten(theme.palette.tfaa.resources, 0.9),
    borderRadius: 20,
    maxWidth: '50%',
  },

  '.MuiCardContent-root': {
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
  },

  '.memberInfoListTitle': {
    fontSize: 34,
    fontWeight: 900,
    marginBottom: theme.spacing(4),
  },

  '.memberInfoListDetails': {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },

  [theme.breakpoints.down('mobile')]: {
    padding: theme.spacing(18, 6),
  },

  display: 'flex',
  overflow: 'hidden',
  padding: theme.spacing(10),
  position: 'relative',
  width: '100%',
}));

// Component Definition
const MemberInfoList: React.FC = () => {
  return (
    <StyledRoot>
      <Motifs small />

      <div>
        <Typography
          className="memberInfoListTitle"
          component="h2"
          variant="h4"
        >
          Membership
        </Typography>

        <div className="memberInfoListDetails">
          <Card
            className="membershipCard"
            variant="outlined"
          >
            <CardContent>
              <MembershipByLaws showLinkToByLaws />
            </CardContent>
          </Card>

          <section>
            <Typography
              className="sectionTitle"
              component="h3"
            >
              Join {appNameShort}
            </Typography>
          </section>
        </div>
      </div>
    </StyledRoot>
  );
};

export default MemberInfoList;
