// External Dependencies
import { Link } from 'gatsby-theme-material-ui';
import React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { appName } from '../../utils/app-constants';
import FormTitle from '../shared/FormTitle';

// Local Typings
interface Props {
  showLinkToByLaws?: boolean;
}
interface StyledRootProps {
  $small: boolean;
}

// Local Variables
const StyledRoot = styled.div<StyledRootProps>(({
  $small,
  theme,
}) => ({
  '.memberByLawsTitle': {
    fontSize: $small ? 16 : 18,
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  '.paddingMedium': {
    paddingLeft: theme.spacing(2),
  },

  p: {
    fontSize: $small ? 16 : 18,
    marginBottom: theme.spacing(2),
  },

  fontSize: $small ? 16 : 18,
}));

// This section of the By-laws is used in the Constitution and Membership pages.
// The `showLinkToByLaws` prop is only used on the Membership page.

// Component Definition
const MembershipByLaws: React.FC<Props> = ({
  showLinkToByLaws = false,
}) => (
  <StyledRoot $small={showLinkToByLaws}>
    <FormTitle
      className="memberByLawsTitle"
      component="h3"
    >
      ARTICLE II &mdash; MEMBERSHIP
    </FormTitle>

    {showLinkToByLaws && (
      <Typography>
        (from the {appName}&apos;s{' '}
        <Link to="/about/constitution">Constitution and Bylaws</Link>)
      </Typography>
    )}

    <section>
      <dl className="paddingMedium">
        <dt>Section 1 &mdash; Membership</dt>

        <dd className="paddingMedium">
          {`Membership in this Corporation shall be open to all individuals who are currently
          serving in any administrative capacity, retired from such an administrative
          position, or interested in administration related to music education programs at any
          level. Membership shall be designated as “Active” or “Retired” as appropriate to the
          employment status of the member.`}
        </dd>

        <dt>Section 2 &mdash; Annual dues</dt>

        <dd className="paddingMedium">
          {`A registration fee of $50 (Active Member) or $30 (Retired Member) per year shall
          entitle an individual to full membership in the ${appName}. A majority vote of the members present at a regular meeting of the full
          membership is required to change these amounts. Continued membership is contingent
          upon being up-to-date on annual membership registration fees.`}
        </dd>

        <dt>Section 3 &mdash; Rights of members</dt>

        <dd className="paddingMedium">
          {`Each member in good standing shall be eligible to vote on actions before the full
          membership, to vote for candidates for the executive board, serve on committees and
          bring business before the general membership.`}
        </dd>

        <dt>Section 4 &mdash; Non-voting membership</dt>

        <dd className="paddingMedium">
          {`The non-voting membership categories must be adopted by the Board of Directors and
          proposed as an amendment to these by-laws to the membership as outlined in Article
          VI.`}
        </dd>
      </dl>
    </section>
  </StyledRoot>
);

export default MembershipByLaws;
