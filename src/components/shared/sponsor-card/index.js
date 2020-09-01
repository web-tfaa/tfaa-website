// External Dependencies
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/styles';

// Internal Dependencies
import Alert from '../Alert';

// Local Variables
const propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  sponsorClass: PropTypes.string.isRequired,
  sponsorData: PropTypes.arrayOf(PropTypes.shape({})),
};

const defaultProps = {
  max: null,
  min: null,
  sponsorData: [],
};

const TITLE_BLUE = '#32456B';

const useStyles = makeStyles((theme) => ({
  alert: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  card: {
    background: 'aliceblue',
    fontSize: '0.9rem',
    marginBottom: '1rem',
    maxWidth: '90%',
    padding: '0 1rem',
  },
  deadlineText: {
    marginBottom: 16,
    maxWidth: '75%',
  },
  deadlineTextBottom: {
    maxWidth: '75%',
  },
  divider: {
    height: 3,
    marginTop: 32,
  },
  list: {
    textAlign: 'justify',
  },
  payLink: {
    fontSize: 20,
    fontWeight: '600',
    margin: '24px 0',
  },
  root: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    boxShadow: 'rgba(25, 17, 34, 0.05) 0px 3px 10px',
    marginBottom: '1em',
    padding: '2em 3em',
  },
  sponsorInfo: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  sponsorLink: {
    margin: '0 8px',
  },
  sponsorLinktText: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1.25rem',
    height: 48,
    justifyContent: 'center',
    marginBottom: 6,
  },
  strongText: {
    fontWeight: 600,
  },
  titleFour: {
    color: TITLE_BLUE,
    marginTop: '1.25rem',
  },
}));

// Component Definition
const SponsorCard = ({
  max, min, sponsorClass, sponsorData,
}) => {
  const classes = useStyles();

  const renderSponsors = (sponsorData) =>
    sponsorData.length > 0
    && sponsorData.map((sponsor) => (
      <div
        className={classes.sponsorLinktText}
        key={sponsor.SponsorOrganization}
      >
        <a
          className={classes.sponsorLink}
          href={
            sponsor.OrganizationWebsiteAddress.startsWith('http')
              ? sponsor.OrganizationWebsiteAddress
              : `http://${sponsor.OrganizationWebsiteAddress}`
          }
          rel="noopener noreferrer"
          target="_blank"
        >
          {sponsor.SponsorOrganization}
        </a>
      </div>
    ));

  // const donationAmount = min
  //   ? `${min.toLocaleString()}-${max.toLocaleString()}`
  //   : `${max.toLocaleString()}+`;

  return (
    <div className={classes.root}>
      <h2>{sponsorClass}</h2>
      <h4 className={classes.titleFour}>($500 donation)</h4>
      {/* <h4 className={classes.titleFour}>(${donationAmount} donation)</h4> */}

      {sponsorData.length > 0 && <hr className={classes.divider} />}

      {renderSponsors(sponsorData)}

      <hr className={classes.divider} />

      <div className={classes.sponsorInfo}>
        <Card className={classes.card} elevation={2}>
          <h5 className={classes.titleFour}>Sponsorship receives:</h5>
          <ul className={classes.list}>
            {/* {sponsorClass === 'Class Champion' && (
              <li>
                Up to 20 min presentation to TMAC membership at either November Conference or TMEA
                Meeting
              </li>
            )}
            <li>Company name in programs for TMAC November Conference and TMEA Meeting</li> */}
            <li>Company name on TMAC website with link to your company</li>
          </ul>
        </Card>
        {/* <Alert
          bodyText="Sponsorship opportunities will be available soon."
          fullWidth
          rootClasses={classes.alert}
          type="info"
        /> */}
        {/* <div className={classes.deadlineText}>
          Deadline for recogntion at <span className={classes.strongText}>Fall Conference</span> is
          November 1st.
        </div>
        <div className={classes.deadlineTextBottom}>
          {' '}
          Sponsors registering after November 1st will be recognized at the{' '}
          <span className={classes.strongText}>TMEA Round Table</span>.
        </div> */}
        <Link
          className={classes.payLink}
          state={{ level: sponsorClass }}
          to="/sponsors/sponsor-info"
        >
          Click here to register and pay for Bronze Sponsorship
        </Link>
      </div>
    </div>
  );
};

SponsorCard.propTypes = propTypes;
SponsorCard.defaultProps = defaultProps;

export default SponsorCard;
