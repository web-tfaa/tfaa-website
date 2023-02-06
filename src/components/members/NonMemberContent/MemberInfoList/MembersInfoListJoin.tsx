// External Dependencies
// import { Link } from 'gatsby-theme-material-ui';
import { lighten } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../../../utils/app-constants';
import CtaButton from '../../../shared/CtaButton';
import EnhancedCardContent from '../../../shared/EnhancedCardContent';

// Local Variables
const StyledCard = styled(Card)(({ theme }) => ({
  '&&': {
    '.joinListBody': {
      fontSize: 16,
      fontWeight: 600,
    },
    '.joinListCardContent': {
      '& a': {
        borderBottom: 'none',
      },
      [theme.breakpoints.down('mobile')]: {
        maxWidth: '100%',
      },
      padding: theme.spacing(0, 4, 2),
    },
    '.joinListFootnote': {
      fontSize: 16,
      fontWeight: 500,
    },
    '.memberInfoListJoinTitle': {
      color: theme.palette.common.white,
      fontSize: 34,
      fontWeight: 900,
    },

    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
    },
    backgroundColor: theme.palette.tfaa.resources,
    borderColor: lighten(theme.palette.tfaa.resources, 0.1),
    borderRadius: 20,
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '50%',
  }
}));

// Component Definition
const MembersInfoListJoin: React.FC = () => {
  return (
    <StyledCard variant="outlined">
      <img
        alt="Teacher in class with students."
        src="https://res.cloudinary.com/tmac/image/upload/v1675224839/teacher-in-class.png"
      />

      <EnhancedCardContent className="joinListCardContent">
        <Typography
          className="memberInfoListJoinTitle"
          component="h3"
        >
          Join {appNameShort}
        </Typography>

        <Typography
          className="joinListBody"
          variant="body2"
        >
          To join {appNameShort} please complete these three steps:
        </Typography>

        <ol className="joinListBody">
          <li>
            Sign up for a {appNameShort} website login.
          </li>

          <li>
            Complete the Membership Form.
          </li>

          <li>
            Pay dues online using a credit card or PayPal (or mail invoice with check via mail).
          </li>
        </ol>

        <Typography
          className="joinListBody"
          variant="body2"
        >
          Note: Sponsors should complete the Sponsor Form.
        </Typography>

        <Box
          display="flex"
          justifyContent="center"
          marginY={4}
        >
          <CtaButton
            colorVariant="events"
            fontWeight={600}
            rightArrow
            size="large"
            to="/members/register"
            width={224}
          >
            Begin Membership
          </CtaButton>
        </Box>

        <Typography
          className="joinListFootnote"
          variant="body2"
        >
          * Membership is not complete until payment is received.
        </Typography>
      </EnhancedCardContent>
    </StyledCard>
  );
};

export default MembersInfoListJoin;
