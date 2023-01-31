// External Dependencies
import { Link } from 'gatsby-theme-material-ui';
import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { Sponsor } from '../../utils/hooks/useSponsorData';
import ClassChampionIconSvg from './sponsor-icons/ClassChampionIconSvg';
import GoldMedalIconSvg from './sponsor-icons/GoldMedalIconSvg';
import SilverMedalIconSvg from './sponsor-icons/SilverMedalIconSvg';
import { appNameShort } from '../../utils/app-constants';

// Local Typings
interface Props {
  sponsorData: Sponsor[] | undefined;
  sponsorLevel: 'Class Champion' | 'Gold Medal' | 'Silver Medal';
}

// Local Variables
const StyledCard = styled(Card)(({ theme }) => ({
  '&.MuiCard-root': {
    marginBottom: theme.spacing(6),
  },

  '.cardTitle': {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: theme.spacing(0),
  },

  '.eventName': {
    fontWeight: 600,
  },

  '.registerLink': {
    fontSize: 30,
    textAlign: 'center',
    width: '100%',
  },

  '.secured': {
    color: theme.palette.tfaa.resources,
    fontSize: 12,
    fontWeight: 800,
    marginLeft: theme.spacing(1),
  },

  '.sponsorInfo': {
    [theme.breakpoints.down('md')]: {
      columnGap: theme.spacing(3),
      flexWrap: 'wrap',
    },

    columnGap: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(4, 0),
  },

  '.sponsorLevelDetailsContent': {
    '& li': {
      marginBottom: theme.spacing(0.5),
    },
    '& p': {
      fontSize: 16,
    },
    fontSize: 16,
  },

  '.sponsorLevelDetailsTitle': {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: theme.spacing(2),
  },

  '.sponsorLevelExemptions': {
    '& p': {
      fontSize: 16,
    },
    [theme.breakpoints.down('mobile')]: {
      width: '100%',
    },
    width: '30%',
  },

  '.sponsorList': {
    '& a': {
      fontWeight: 600,
    },

    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(6),
      width: '100%',
    },
    [theme.breakpoints.down('mobile')]: {
      width: '100%',
    },
    width: '33%',
  },

  '.sponsorLevelCost': {
    fontSize: 20,
    fontWeight: 700,
  },

  '.sponsorPerks': {
    '&::before': {
      content: '""',
      display: 'block',
      backgroundColor: theme.palette.tfaa.resources,
      opacity: 0.1,
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
    },

    [theme.breakpoints.down('md')]: {
      width: '60%',
    },
    [theme.breakpoints.down('mobile')]: {
      marginBottom: theme.spacing(2),
      width: '100%',
    },
    borderRadius: 19,
    position: 'relative',
    width: '50%',
  },

  '.sponsorPerksClassChampion': {
    '&::before': {
      content: '""',
      display: 'block',
      backgroundColor: theme.palette.tfaa.membership,
      opacity: 0.1,
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
    },

    [theme.breakpoints.down('mobile')]: {
      width: '100%',
    },
    borderRadius: 19,
    position: 'relative',
    width: '30%',
  },
}));

const getSponsorIcon = (sponsorLevel: Props['sponsorLevel']) => {
  switch (sponsorLevel) {
    case 'Class Champion':
      return <ClassChampionIconSvg />;
    case 'Gold Medal':
      return <GoldMedalIconSvg />;
    case 'Silver Medal':
      return <SilverMedalIconSvg />;
    default:
      return null;
  }
};

const getSponsorCost = (sponsorLevel: Props['sponsorLevel']) => {
  switch (sponsorLevel) {
    case 'Gold Medal':
      return '$2000';
    case 'Silver Medal':
      return '$1000';
    default:
      return null;
  }
};

// Component Definition
const SponsorCard: FC<Props> = ({
  sponsorData,
  sponsorLevel,
}) => {
  const isClassChampionCard = sponsorLevel === 'Class Champion';

  const alreadtSecuredText = (
    <Typography
      className="secured"
      component="span"
      variant="body2"
    >
      Already Secured
    </Typography>
  );

  // Perks
  const classChampionPerks = (
    <ul>
      <li>
        10 min (max) to address the membership at the event
        in which lunch or reception is sponsored.
      </li>

      <li>
        Same perks as listed for Gold Medal
      </li>
    </ul>
  );

  const goldMedalPerks = (
    <ul>
      <li>
        Company name recognition in all printed materials
      </li>

      <li>
        Company name and website link on {appNameShort} website
      </li>

      <li>
        Attendance to Fall Retreat (Nov) and TMEA Roundtable (Feb)

        <ul>
          <li>
            Tables will be placed around the banquet hall/hallway for{' '}
            {appNameShort}{' '}
            members to visit with sponsors during the Fall Retreat.
            Time will be scheduled to visit the vendor tables.
          </li>
        </ul>
      </li>

      <li>
        Options for sponsors to work with {appNameShort}{' '}
        Executive Secretary for additional name recognition:

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
            Keynote Speakers on professional development topics
            for administrators in attendance.
          </li>
        </ul>
      </li>

      <li>
        Two (2) emails sent to membership through the {appNameShort}{' '}
        Executive Secretary from the Gold Medal Sponsor.
      </li>
    </ul>
  );

  const silverMedalPerks = (
    <ul>
      <li>
        Name recognition in all printed programs
      </li>

      <li>
        Company name and website link on {appNameShort} website
      </li>
    </ul>
  );

  const getSponsorLevelPerks = () => {
    switch (sponsorLevel) {
      case 'Class Champion':
        return classChampionPerks;
      case 'Gold Medal':
        return goldMedalPerks;
      case 'Silver Medal':
        return silverMedalPerks;
      default:
        return null;
    }
  };

  // Exemptions
  const goldMedalExemptions = (
    <Typography variant="body2">
      There is no presentation to the menbership with this sponsor level.
    </Typography>
  );

  const silverMedalExemptions = (
    <Typography variant="body2">
      Please note that admission/attendance at the {appNameShort}{' '}
      Fall Retreat and {appNameShort} Roundtable Meeting at TMEA is
      not included in this sponsor level.
    </Typography>
  );

  const getSponsorLevelExemptions = () => {
    switch (sponsorLevel) {
      case 'Class Champion':
        return null;
      case 'Gold Medal':
        return goldMedalExemptions;
      case 'Silver Medal':
        return silverMedalExemptions;
      default:
        return null;
    }
  };

  return (
    <StyledCard variant="outlined">
      <CardContent>
        {getSponsorIcon(sponsorLevel)}

        <Typography
          className="cardTitle"
          component="h3"
        >
          {sponsorLevel}
        </Typography>

        {!isClassChampionCard && (
          <Typography
            className="sponsorLevelCost"
          >
            {getSponsorCost(sponsorLevel)}
          </Typography>
        )}

        <section className="sponsorInfo">
          <div className="sponsorList">
            {sponsorData?.map((sponsor) => (
              <div key={sponsor.userId}>
                <Link to={sponsor.OrganizationWebsiteAddress}>
                  {sponsor.SponsorOrganization}
                </Link>
              </div>
            ))}
          </div>

          {isClassChampionCard && (
            <Card
              className="sponsorPerks"
              variant="outlined"
            >
              <CardContent>
                <Typography
                  className="sponsorLevelDetailsTitle"
                  component="h4"
                >
                  Sponsor a Meal
                </Typography>

                <div className="sponsorLevelDetailsContent">
                  <Typography variant="body2">
                    All costs are paid to <strong>{appNameShort}</strong>.
                  </Typography>

                  <Typography
                    paragraph
                    variant="body2"
                  >
                    <strong>{appNameShort}</strong> is a tax exempt organization.
                  </Typography>

                  <Typography variant="body2">
                    Secure sponsorship by paying for:
                  </Typography>

                  <ul>
                    <li>
                      The cost of lunch at the{' '}
                      <span className="eventName">
                        Fall Retreat
                      </span>
                    </li>

                    <li>
                      The cost of lunch at the{' '}
                      <span className="eventName">
                        TMEA {appNameShort} Roundtable
                      </span>
                      {alreadtSecuredText}
                    </li>

                    <li>
                      The cost of a reception at the{' '}
                      <span className="eventName">
                        Fall Retreat
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          <Card
            className={isClassChampionCard ? 'sponsorPerksClassChampion' : 'sponsorPerks'}
            variant="outlined"
          >
            <CardContent>
              <Typography
                className="sponsorLevelDetailsTitle"
                component="h4"
              >
                Sponsorship perks:
              </Typography>

              <div className="sponsorLevelDetailsContent">
                {getSponsorLevelPerks()}
              </div>
            </CardContent>
          </Card>

          {!isClassChampionCard && (
            <Typography
              className="sponsorLevelExemptions"
            >
              {getSponsorLevelExemptions()}
            </Typography>
          )}
        </section>

        <div className="registerLink">
          <Link to="/sponsors/sponsor-info">
            Register and pay for {sponsorLevel} sponsorship
          </Link>
        </div>
      </CardContent>
    </StyledCard>
  );
};

export default SponsorCard;
