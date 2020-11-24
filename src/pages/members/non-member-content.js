// External Dependencies
import React from 'react';
import { Link } from 'gatsby';

// Internal Dependencies
import ArrowForwardIcon from '../../components/shared/ArrowForwardIcon';
import Card from '../../components/shared/cards/card';
import CardHeadline from '../../components/shared/cards/card-headline';
import Cards from '../../components/shared/cards';
import CtaButton from '../../components/masthead/cta-button';
import FuturaDiv from '../../components/shared/futura-div';
import MembershipByLaws from '../about/MembershipByLaws';

// Local Styles
const constitutionStyles = {
  marginTop: 36,
};

const contentStyles = {
  display: 'flex',
  marginBottom: '1rem',
};

const paddingStyles = {
  paddingLeft: 16,
};

// Component Definition
const NonMemberContent = () => (
  <>
    <div
      css={{
        paddingBottom: '1.5rem',
      }}>
      <CardHeadline>Membership</CardHeadline>
      <div css={contentStyles}>
        Our members promote and support music education and music educators through collaboration,
        networking, and the sharing of best practices so that every child in Texas is assured of
        receiving quality instruction in the understanding, appreciation, and performance of music.
      </div>
      <CtaButton to="/members/join">
        <span>Join TMAC</span>
        <ArrowForwardIcon />
      </CtaButton>
    </div>

    <Cards>
      <Card className="members-constitution" css={constitutionStyles}>
        <MembershipByLaws showLinkToByLaws />
      </Card>
    </Cards>
  </>
);

export default NonMemberContent;
