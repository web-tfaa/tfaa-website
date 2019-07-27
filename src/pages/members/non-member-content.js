// External Dependencies
import React, { Fragment } from 'react';
import { MdArrowForward as ArrowForwardIcon } from 'react-icons/md';
import { Link } from 'gatsby';

// Internal Dependencies
import Card from '../../components/shared/cards/card';
import CardHeadline from '../../components/shared/cards/card-headline';
import Cards from '../../components/shared/cards';
import CtaButton from '../../components/masthead/cta-button';
import FuturaDiv from '../../components/shared/futura-div';

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
const NonMemberContent = () => {
  return (
    <Fragment>
      <div
        css={{
          paddingBottom: '1.5rem',
        }}
      >
        <CardHeadline>Membership</CardHeadline>
        <div css={contentStyles}>
          Our members promote and support music education and music educators
          through collaboration, networking, and the sharing of best practices
          so that every child in Texas is assured of receiving quality
          instruction in the understanding, appreciation, and performance of
          music.
        </div>
        <CtaButton to="/members/join">
          <span css={{ verticalAlign: 'middle' }}>Join TMAC</span>
          <ArrowForwardIcon
            css={{
              verticalAlign: 'baseline',
              marginLeft: '0.6em',
            }}
          />
        </CtaButton>
      </div>

      <Cards>
        <Card className="members-constitution" css={constitutionStyles}>
          <CardHeadline>ARTICLE II &mdash; MEMBERSHIP</CardHeadline>
          <FuturaDiv>
            (from the Texas Music Administrators Conference&apos;s{' '}
            <Link to="/about/constitution">Constitution and Bylaws</Link>)
          </FuturaDiv>
          <FuturaDiv>
            <dl css={paddingStyles}>
              <dt>Section 1 &mdash; Membership</dt>
              <dd css={paddingStyles}>
                Membership in this organization shall be open to all
                individuals who are currently serving in any administrative
                capacity, retired from such an administrative position, or
                interested in administration related to music education
                programs at any level. Membership shall be designated as
                “Active” or “Retired” as appropriate to the employment status
                of the member.
              </dd>
              <dt>Section 2 &mdash; Annual dues</dt>
              <dd css={paddingStyles}>
                A registration fee of $50 (Active Member) or $30 (Retired
                Member) per year shall entitle an individual to full
                membership in the Texas Music Administrators Conference. A
                majority vote of the members present at a regular meeting of
                the full membership is required to change these amounts.
                Continued membership is contingent upon being up-to-date on
                annual membership registration.
              </dd>
              <dt>Section 3 &mdash; Rights of members</dt>
              <dd css={paddingStyles}>
                Each member in good standing shall be eligible to vote on
                actions before the full membership, to vote for candidates for
                the executive board, serve on committees and bring business
                before the general membership.
              </dd>
              <dt>Section 4 &mdash; Non-voting membership</dt>
              <dd css={paddingStyles}>
                The non-voting membership categories must be adopted by the
                Board of Directors and proposed as an amendment to these
                by-laws to the membership as outlined in Article VI.
              </dd>
            </dl>
          </FuturaDiv>
        </Card>
      </Cards>
    </Fragment>
  );
};

export default NonMemberContent;
