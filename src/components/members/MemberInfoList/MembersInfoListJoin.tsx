// External Dependencies
// import { Link } from 'gatsby-theme-material-ui';
import { lighten } from '@mui/material';
import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../../utils/app-constants';
import EnhancedCardContent from '../../shared/EnhancedCardContent';

// Local Variables
const StyledCard = styled(Card)(({ theme }) => ({
  // '.topImageContainer': {
  //   background: 'url("https://res.cloudinary.com/tmac/image/upload/v1675224839/teacher-in-class.png") no-repeat',
  //   backgroundSize: 'cover',
  //   width: '100%',
  // },

  backgroundColor: lighten(theme.palette.tfaa.resources, 0.1),
  borderColor: lighten(theme.palette.tfaa.resources, 0.9),
  borderRadius: 20,
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '50%',
}));

// Component Definition
const MembersInfoListJoin: React.FC = () => {
  return (
    <StyledCard variant="outlined">
      <img
        alt="Teacher in class with students."
        src="https://res.cloudinary.com/tmac/image/upload/v1675224839/teacher-in-class.png"
      />

      <EnhancedCardContent>
        <Typography
          className="sectionTitle"
          component="h3"
        >
          Join {appNameShort}
        </Typography>

        <Typography>
          * Membership is not complete until payment is received.
        </Typography>
      </EnhancedCardContent>
    </StyledCard>
  );
};

export default MembersInfoListJoin;
