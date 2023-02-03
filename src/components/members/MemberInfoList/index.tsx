// External Dependencies
import { lighten } from '@mui/material';
import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import EnhancedCard from '../../shared/EnhancedCard';
import MembersInfoListJoin from './MembersInfoListJoin';
import MembershipByLaws from '../../about/MembershipByLaws';
import Motifs from '../../shared/Motifs';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.membershipArticleCard': {
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(3),
      maxWidth: '100%',
    },
    backgroundColor: lighten(theme.palette.tfaa.resources, 0.9),
    borderColor: lighten(theme.palette.tfaa.resources, 0.9),
    borderRadius: 20,
    maxWidth: '50%',
  },

  '.memberInfoListTitle': {
    fontSize: 34,
    fontWeight: 900,
    marginBottom: theme.spacing(4),
  },

  '.memberInfoListDetails': {
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
    columnGap: theme.spacing(5),
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },

  [theme.breakpoints.down('mobile')]: {
    padding: theme.spacing(18, 6, 8),
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
          <EnhancedCard className="membershipArticleCard">
            <CardContent>
              <MembershipByLaws showLinkToByLaws />
            </CardContent>
          </EnhancedCard>

          <MembersInfoListJoin />
        </div>
      </div>
    </StyledRoot>
  );
};

export default MemberInfoList;
