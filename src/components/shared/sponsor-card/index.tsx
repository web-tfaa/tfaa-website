// External Dependencies
import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';
import { FC, useCallback, useMemo } from 'react';
import { Link } from 'gatsby-theme-material-ui';
import { green } from '@mui/material/colors';
import styled from 'styled-components';

// Internal Dependencies
import { options } from '../../../utils/typography';

// Local Typings
interface Props {
  sponsorData: Sponsor[];
  subtitle?: string;
  title: string;
}
interface Sponsor {
  name: string;
}

// Local Variables
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

const MEAL_AVAILABILITY = {
  AVAILABLE: 'Available',
  SECURED: 'Already Secured',
};

const StyledRoot = styled.div(({ theme }) => ({
  '.alert': {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  '.card': {
    background: 'aliceblue',
    fontSize: '0.9rem',
    marginBottom: '1rem',
    maxWidth: '92%',
  },
  '.cardContent': {
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  '.championPriceCard': {
    background: green[50],
    fontSize: '0.9rem',
    marginBottom: '1rem',
    maxWidth: '92%',
    width: '100%',
  },
  '.chip': {
    backgroundColor: theme.palette.grey[200],
    border: `1px solid ${theme.palette.grey[400]}`,
    fontFamily: options.headerFontFamily.join(','),
    fontSize: '0.7rem',
  },
  '.chipAvailable': {
    backgroundColor: green.A400,
    border: `1px solid ${theme.palette.grey[400]}`,
    fontFamily: options.headerFontFamily.join(','),
    fontSize: '0.7rem',
  },
  '.deadlineText': {
    marginBottom: 16,
    maxWidth: '75%',
  },
  '.deadlineTextBottom': {
    maxWidth: '75%',
  },
  '.divider': {
    height: 3,
    marginTop: 32,
  },
  '.list': {
    textAlign: 'justify',
  },
  '.payLink': {
    fontSize: 20,
    fontWeight: '600',
    margin: '24px 0',
  },
  '.perkNote': {
    fontSize: '0.8rem',
  },
  '.sponsorInfo': {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  '.sponsorLink': {
    margin: '0 8px',
  },
  '.sponsorLinktText': {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1.25rem',
    height: 48,
    justifyContent: 'center',
    marginBottom: 6,
  },
  '.strongText': {
    fontWeight: 500,
  },
  '.titleFour': {
    color: TITLE_BLUE,
    fontSize: '1.25rem',
    marginTop: '1.25rem',
  },
  '.titleFive': {
    color: TITLE_BLUE,
    marginTop: '0.5rem',
  },

  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: 4,
  boxShadow: 'rgba(25, 17, 34, 0.05) 0px 3px 10px',
  marginBottom: '1em',
  padding: '0.5rem 1rem',
}));

const silverMedalPerksListItems = (
  <>
    <li>Name recognition in all printed programs</li>
    <li>Company name and link to company website on the TMAC website</li>
  </>
);

const goldMedalPerksListItems = (
  <>
    <li>Company name recognition in all printed materials</li>
    <li>Company name and website link on TMAC website</li>
    <li>Attendance to Fall Retreat (Nov) and TMEA Roundtable (Feb)</li>
    <ul>
      <li>
        Tables will be placed around the banquet hall/hallway
        for TMAC members to visit with sponsors during the
        Fall Retreat.  Time will be scheduled to visit the vendor tables.
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
const SponsorCard: FC<Props> = ({
  sponsorData = [],
  subtitle,
  title,
}) => {
  // TODO: Can this live outside of the component?
  const renderSponsors = useCallback(
    (sponsorData) =>
      sponsorData.length > 0
    && sponsorData.map((sponsor) => (
      <div
        className="sponsorLinktText"
        key={sponsor.SponsorOrganization}
      >
        <a
          className="sponsorLink"
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
    )),
    []
  );

  const sponsorshipSecuredChip = useMemo(() => (
    <Chip
      className="chip"
      label={MEAL_AVAILABILITY.SECURED}
      size="small"
    />
  ), []);

  return (
    <StyledRoot>
      <h2>{title}</h2>

      <h4 className="titleFour">{subtitle}</h4>

      {sponsorData.length > 0 && <hr className="divider" />}

      {renderSponsors(sponsorData)}

      {sponsorData.length > 0 && <hr className="divider" />}

      <div className="sponsorInfo">
        {title === SPONSORSHIP_LEVELS.CLASS_CHAMPION && (
          <Card
            className="championPriceCard"
            variant="outlined"
          >
            <CardContent className="cardContent">
              <h5 className="titleFive">Sponsor a Meal</h5>

              <Typography
                className="perkNote"
                variant="body2"
              >
                All costs are paid to TMAC. TMAC is a tax exempt organization.
              </Typography>

              <Box mt={1.5}>
                <Typography
                  className="perkNote"
                  variant="body2"
                >
                  Secure sponsorship by paying for:
                </Typography>
              </Box>

              <ul className="list">
                <li>
                  The cost of lunch at the <span className="strongText">Fall Retreat</span>{' '}
                  {sponsorshipSecuredChip}

                </li>
                <li>
                  The cost of lunch at the <span className="strongText">TMEA TMAC Roundtable</span>{' '}
                  {sponsorshipSecuredChip}
                </li>
                <li>
                  The cost of a reception at the <span className="strongText">Fall Retreat</span>{' '}
                  {sponsorshipSecuredChip}
                </li>
              </ul>
            </CardContent>
          </Card>
        )}

        <Card
          className="card"
          variant="outlined"
        >
          <CardContent className="cardContent">
            <h5 className="titleFive">Sponsorship perks:</h5>
            <ul className="list">
              {title === SPONSORSHIP_LEVELS.CLASS_CHAMPION
                && classChampionPerksListItems}
              {title === SPONSORSHIP_LEVELS.GOLD_MEDAL
                && goldMedalPerksListItems}
              {title === SPONSORSHIP_LEVELS.SILVER_MEDAL
                  && silverMedalPerksListItems}
            </ul>
          </CardContent>
        </Card>

        {title === SPONSORSHIP_LEVELS.SILVER_MEDAL && (
          <Box mx={5}>
            <Typography
              className="perkNote"
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
              className="perkNote"
              variant="body2"
            >
              There is no presentation to the membership with this sponsor level.
            </Typography>
          </Box>
        )}

        <Link
          className="payLink"
          state={{ level: title }}
          to="/sponsors/sponsor-info"
        >
          {`Register and pay for ${title} sponsorship`}
        </Link>
      </div>
    </StyledRoot>
  );
};

export default SponsorCard;
