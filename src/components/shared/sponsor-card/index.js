// External Dependencies
import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';

// Local Variables
const propTypes = {
  sponsorData: PropTypes.arrayOf(PropTypes.shape({})),
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

const defaultProps = {
  sponsorData: [],
};

const TITLE_BLUE = '#32456B';

export const SPONSORSHIP_LEVELS = {
  CLASS_CHAMPION: 'Class Champion',
  GOLD_MEDAL: 'Gold Medal',
  SILVER_MEDAL: 'Silver Medal',
};

export const SPONSORSHIP_PRICE = {
  [SPONSORSHIP_LEVELS.SILVER_MEDAL]: '$1000',
  [SPONSORSHIP_LEVELS.GOLD_MEDAL]: '$2000',
};

const useStyles = makeStyles((theme) => ({
  alert: {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  card: {
    background: 'aliceblue',
    fontSize: '0.9rem',
    marginBottom: '1rem',
    maxWidth: '90%',
  },
  cardContent: {
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  championPriceCard: {
    background: green[50],
    fontSize: '0.9rem',
    marginBottom: '1rem',
    maxWidth: '90%',
  },
  chip: {
    border: `1px solid ${theme.palette.grey[500]}`,
    fontSize: '0.8rem',
  },
  chipAvailable: {
    backgroundColor: green.A400,
    border: `1px solid ${theme.palette.grey[500]}`,
    fontSize: '0.8rem',
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
  perkNote: {
    fontSize: '0.8rem',
  },
  root: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    boxShadow: 'rgba(25, 17, 34, 0.05) 0px 3px 10px',
    marginBottom: '1em',
    padding: '0.5rem 1rem',
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
    fontSize: '1.25rem',
    marginTop: '1.25rem',
  },
  titleFive: {
    color: TITLE_BLUE,
    marginTop: '0.5rem',
  },
}));

const silverMedalPerksListItems = (
  <>
    <li>Name recognition in all printed programs</li>
    <li>Company name and link to company website on the TMAC website</li>
  </>
);

const goldMedalPerksListItems = (
  <>
    <li>Name recognition in all printed programs</li>
    <li>Company name and link to company website on the TMAC website</li>
    <li>Attendance to Fall Retreat (Nov) and TMEA Roundtable (Feb)</li>
    <ul>
      <li>
        Each &quot;Gold Medal&quot; sponsor will have a designated space
        around the banquet room for tables during the Fall Retreat.
        TMAC members in attendance at the Fall Retreat will have time
        to visit the tables and vendors.
      </li>
    </ul>
    <li>
      Options for sponsors to work with TMAC Executive Secretary for additional name recognition:
    </li>
    <ul>
      <li>
        Table Decorations
      </li>
      <li>
        Lanyards
      </li>
      <li>
        Note Pads
      </li>
      <li>
        Pens
      </li>
      <li>
        Keynote Speakers on professional development topics for administrators in attendance
      </li>
    </ul>
    <li>
      Two (2) emails sent to membership through the TMAC Executive
      Secretary from the Gold Medal Sponsor.
    </li>
  </>
);

const classChampionPerksListItems = (
  <>
    <li>
      10 min (max) to address the membership at the event
      in which lunch or reception is sponsored.
    </li>
    <li>Same perks as listed for Gold Medal</li>
  </>
);

// Component Definition
const SponsorCard = ({
  sponsorData,
  subtitle,
  title,
}) => {
  const classes = useStyles();

  // TODO: Can this live outside of the component?
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

  return (
    <div className={classes.root}>
      <h2>{title}</h2>

      <h4 className={classes.titleFour}>{subtitle}</h4>

      {sponsorData.length > 0 && <hr className={classes.divider} />}

      {renderSponsors(sponsorData)}

      {sponsorData.length > 0 && <hr className={classes.divider} />}

      <div className={classes.sponsorInfo}>
        {title === SPONSORSHIP_LEVELS.CLASS_CHAMPION && (
          <Card
            className={classes.championPriceCard}
            variant="outlined"
          >
            <CardContent className={classes.cardContent}>
              <h5 className={classes.titleFive}>Sponsor a Meal</h5>

              <Typography
                className={classes.perkNote}
                variant="body2"
              >
                All costs are paid to TMAC. TMAC is a tax exempt organization now.
              </Typography>

              <Box mt={1.5}>
                <Typography
                  className={classes.perkNote}
                  variant="body2"
                >
                  Secure sponsorship by paying for:
                </Typography>
              </Box>

              <ul className={classes.list}>
                <li>
                  The cost of lunch at the Fall Retreat{' '}
                  <Chip
                    className={classes.chip}
                    label="Already Secured"
                    size="small"
                  />

                </li>
                <li>
                  The cost of lunch at the TMEA TMAC Roundtable{' '}
                  <Chip
                    className={classes.chipAvailable}
                    label="Available"
                    size="small"
                  />
                </li>
                <li>
                  The cost of a reception at the Fall Retreat{' '}
                  <Chip
                    className={classes.chip}
                    label="Already Secured"
                    size="small"
                  />
                </li>
              </ul>
            </CardContent>
          </Card>
        )}

        <Card className={classes.card} variant="outlined">
          <CardContent className={classes.cardContent}>
            <h5 className={classes.titleFive}>Sponsorship perks:</h5>
            <ul className={classes.list}>
              {title === SPONSORSHIP_LEVELS.SILVER_MEDAL
                && silverMedalPerksListItems}
              {title === SPONSORSHIP_LEVELS.GOLD_MEDAL
                && goldMedalPerksListItems}
              {title === SPONSORSHIP_LEVELS.CLASS_CHAMPION
                && classChampionPerksListItems}
            </ul>
          </CardContent>
        </Card>

        {title === SPONSORSHIP_LEVELS.SILVER_MEDAL && (
          <Box mx={5}>
            <Typography
              className={classes.perkNote}
              variant="body2"
            >
              Please note that admission/attendance at the
              TMAC Fall Retreat and TMAC Roundtable Meeting
              at TMEA is not included in this sponsor level.
            </Typography>
          </Box>
        )}

        {title === SPONSORSHIP_LEVELS.GOLD_MEDAL && (
          <Box mx={5}>
            <Typography
              className={classes.perkNote}
              variant="body2"
            >
              There is no presentation to the membership with this sponsor level.
            </Typography>
          </Box>
        )}

        <Link
          className={classes.payLink}
          state={{ level: title }}
          to="/sponsors/sponsor-info"
        >
          {`Register and pay for ${title} sponsorship`}
        </Link>
      </div>
    </div>
  );
};

SponsorCard.propTypes = propTypes;
SponsorCard.defaultProps = defaultProps;

export default SponsorCard;
