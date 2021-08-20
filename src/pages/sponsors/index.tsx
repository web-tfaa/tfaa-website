// External Dependencies
import {
  Box,
  // Card,
  // CardContent,
  // Divider,
  // List,
  // ListItem,
  // ListItemText,
  Typography,
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/styles';
import React, { FC, useEffect, useState } from 'react';

// Internal Dependencies
import { doGetUsers } from '../../firebase/db';
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import SponsorCard, {
  SPONSORSHIP_LEVELS,
  SPONSORSHIP_PRICE,
} from '../../components/shared/sponsor-card';
import usePrevious from '../../utils/hooks/usePrevious';

// Local Typings
interface Props {
  location: unknown;
}

// Local Variables
const useStyles = makeStyles((theme) => ({
  divider: {
    height: 3,
    margin: theme.spacing(2, 0),
  },
}));

const emptySponsorList = [];

// Component Definition
const Sponsors: FC<Props> = ({ location }) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [sponsorData, setSponsorData] = useState<unknown[] | null>(null);
  const previousSponsorData = usePrevious(sponsorData);

  console.log('isLoading', isLoading);
  console.log('previousSponsorData', previousSponsorData);
  console.log('sponsorData', sponsorData);

  // Fetch sponsor data when component mounts
  useEffect(() => {
    setIsLoading(true);
    doGetUsers('sponsor', emptySponsorList, setSponsorData);
  }, []);

  useEffect(() => {
    if (!previousSponsorData && sponsorData) {
      setIsLoading(false);
    }
  }, [previousSponsorData, sponsorData]);

  // if (!sponsorData) {
  //   return null;
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   const {
  //     initialSponsorData,
  //   } = this.state;

  //   const isSponsorDataLoaded = Object.keys(prevState.initialSponsorData).length
  //     !== Object.keys(initialSponsorData).length;

  //   if (isSponsorDataLoaded) {
  //     this.handleSponsorLevelData();
  //   }
  // }

  // handleUpdateInitialSponsorList = (sponsorList) => {
  //   this.setState({ initialSponsorData: sponsorList });
  // };

  // handleSponsorLevelData = () => {
  //   const {
  //     initialSponsorData,
  //   } = this.state;

  //   Object.values(initialSponsorData).forEach((sponsor) => {
  //     switch (sponsor.SponsorLevel) {
  //       // case 'Class Champion':
  //       //   this.setState((state) => ({
  //       //     championData: [
  //       //       ...state.championData,
  //       //       {
  //       //         SponsorOrganization: sponsor.SponsorOrganization,
  //       //         OrganizationWebsiteAddress: sponsor.OrganizationWebsiteAddress,
  //       //       },
  //       //     ],
  //       //   }));
  //       //   break;
  //       // case 'Gold Medal':
  //       //   this.setState((state) => ({
  //       //     goldData: [
  //       //       ...state.goldData,
  //       //       {
  //       //         SponsorOrganization: sponsor.SponsorOrganization,
  //       //         OrganizationWebsiteAddress: sponsor.OrganizationWebsiteAddress,
  //       //       },
  //       //     ],
  //       //   }));
  //       //   break;
  //       // case 'Silver Medal':
  //       //   this.setState((state) => ({
  //       //     silverData: [
  //       //       ...state.silverData,
  //       //       {
  //       //         SponsorOrganization: sponsor.SponsorOrganization,
  //       //         OrganizationWebsiteAddress: sponsor.OrganizationWebsiteAddress,
  //       //       },
  //       //     ],
  //       //   }));
  //       //   break;
  //       case 'Bronze Medal':
  //         this.setState((state) => ({
  //           bronzeData: [
  //             ...state.bronzeData,
  //             {
  //               SponsorOrganization: sponsor.SponsorOrganization,
  //               OrganizationWebsiteAddress: sponsor.OrganizationWebsiteAddress,
  //             },
  //           ],
  //         }));
  //         break;
  //       default: break;
  //     }
  //   });

  //   return [];
  // };

  return (
    <Layout location={location}>
      <Box textAlign="center">
        <Helmet>
          <title>TMAC | Sponsors</title>
        </Helmet>

        <Container>
          <Typography>Sponsors</Typography>

          <Box
            display="flex"
            flexDirection="column"
          >
            {/* <Card variant="outlined">
              <CardContent>
                <Typography component="h2" variant="h5">
                  Class Champion
                </Typography>

                <Divider className={classes.divider} />

                <Typography variant="body2">
                  Same perks as listed for Level 2 plus...
                  <List>
                    <ListItem>
                      <ListItemText>
                        Pay for the cost of lunch at the Fall Retreat (sponsorship already secured)
                      </ListItemText>
                    </ListItem>
                  </List>
                  <List>
                    <ListItem>
                      <ListItemText>
                        Pay for the cost of lunch at the TMEA TMAC Round Table (this is the lunch sponsor opportunity we have left)
                      </ListItemText>
                    </ListItem>
                  </List>
                  <List>
                    <ListItem>
                      <ListItemText>
                        Pay for the cost of a reception at the Fall Retreat (sponsorship already secured)
                      </ListItemText>
                    </ListItem>
                  </List>
                  <List>
                    <ListItem>
                      <ListItemText>
                        Paid to TMAC.  TMAC is a tax exempt organization now.
                      </ListItemText>
                    </ListItem>
                  </List>
                  <List>
                    <ListItem>
                      <ListItemText>
                        10 min (max) to address the membership at the event in which lunch or reception is sponsored.
                      </ListItemText>
                    </ListItem>
                  </List>
                  <List>
                    <ListItem>
                      <ListItemText />
                    </ListItem>
                  </List>
                </Typography>
              </CardContent>
            </Card> */}
            <SponsorCard
              sponsorData={[]}
              subtitle={SPONSORSHIP_PRICE[SPONSORSHIP_LEVELS.SILVER_MEDAL]}
              title={SPONSORSHIP_LEVELS.SILVER_MEDAL}
            />
            <SponsorCard
              sponsorData={[]}
              subtitle={SPONSORSHIP_PRICE[SPONSORSHIP_LEVELS.GOLD_MEDAL]}
              title={SPONSORSHIP_LEVELS.GOLD_MEDAL}
            />
            <SponsorCard
              sponsorData={[]}
              title={SPONSORSHIP_LEVELS.CLASS_CHAMPION}
            />
            {/* <SponsorCard
              min={1500}
              max={1999}
              sponsorClass="Gold Medal"
              sponsorData={goldData}
            />
            <SponsorCard
              min={1000}
              max={1499}
              sponsorClass="Silver Medal"
              sponsorData={silverData}
            /> */}
            {/* <SponsorCard
              min={500}
              max={999}
              sponsorClass="Bronze Medal"
              sponsorData={bronzeData}
            /> */}
            {/* <SponsorCardAlertOnly /> */}
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Sponsors;
