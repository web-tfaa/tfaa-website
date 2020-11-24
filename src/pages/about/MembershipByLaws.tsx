// External Dependencies
import React from 'react';
import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/styles';

// Internal Dependencies
import CardHeadline from '../../components/shared/cards/card-headline';
import FuturaDiv from '../../components/shared/futura-div';

// Local Typings
interface Props {
  showLinkToByLaws?: boolean;
}

// Local Variables
const useStyles = makeStyles((theme: any) => ({
  paddingMedium: {
    paddingLeft: theme.spacing(2),
  },
}));

// Component Definition
const MembershipByLaws: React.FC<Props> = ({ showLinkToByLaws = false }) => {
  const classes = useStyles();

  return (
    <>
      <CardHeadline>ARTICLE II &mdash; MEMBERSHIP</CardHeadline>
      {showLinkToByLaws && (
        <FuturaDiv>
          (from the Texas Music Administrators Conference&apos;s{' '}
          <Link to="/about/constitution">Constitution and Bylaws</Link>)
        </FuturaDiv>
      )}
      <section>
        <dl className={classes.paddingMedium}>
          <dt>Section 1 &mdash; Membership</dt>
          <dd className={classes.paddingMedium}>
            {`Membership in this Corporation shall be open to all individuals who are currently
            serving in any administrative capacity, retired from such an administrative
            position, or interested in administration related to music education programs at any
            level. Membership shall be designated as “Active” or “Retired” as appropriate to the
            employment status of the member.`}
          </dd>
          <dt>Section 2 &mdash; Annual dues</dt>
          <dd className={classes.paddingMedium}>
            {`A registration fee of $50 (Active Member) or $30 (Retired Member) per year shall
            entitle an individual to full membership in the Texas Music Administrators
            Conference. A majority vote of the members present at a regular meeting of the full
            membership is required to change these amounts. Continued membership is contingent
            upon being up-to-date on annual membership registration fees.`}
          </dd>
          <dt>Section 3 &mdash; Rights of members</dt>
          <dd className={classes.paddingMedium}>
            {`Each member in good standing shall be eligible to vote on actions before the full
            membership, to vote for candidates for the executive board, serve on committees and
            bring business before the general membership.`}
          </dd>
          <dt>Section 4 &mdash; Non-voting membership</dt>
          <dd className={classes.paddingMedium}>
            {`The non-voting membership categories must be adopted by the Board of Directors and
            proposed as an amendment to these by-laws to the membership as outlined in Article
            VI.`}
          </dd>
        </dl>
      </section>
    </>
  )
};

export default MembershipByLaws;
