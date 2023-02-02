// External Dependencies
import { Box } from '@mui/material';
import React from 'react';

// Internal Dependencies
import ArrowForwardIcon from '../../components/shared/ArrowForwardIcon';
import Card from '../../components/shared/cards/card';
import CardHeadline from '../../components/shared/cards/card-headline';
import Cards from '../../components/shared/cards';
import CtaButton from '../../components/masthead/cta-button';
import MembershipByLaws from '../../components/about/MembershipByLaws';

// Component Definition
const NonMemberContent = () => (
  <>
    <Box paddingBottom={3}>
      <CardHeadline>Membership</CardHeadline>

      <Box
        display="flex"
        marginBottom={2}
      >
        Our members promote and support music education and music educators through collaboration,
        networking, and the sharing of best practices so that every child in Texas is assured of
        receiving quality instruction in the understanding, appreciation, and performance of music.
      </Box>

      <CtaButton
        buttonColor="green"
        to="/members/join"
      >
        <span>Join TMAC</span>

        <ArrowForwardIcon />
      </CtaButton>
    </Box>

    <Cards>
      <Box marginTop={4}>
        <Card className="members-constitution">
          <MembershipByLaws showLinkToByLaws />
        </Card>
      </Box>
    </Cards>
  </>
);

export default NonMemberContent;
