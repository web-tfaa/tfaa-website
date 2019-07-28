// External Dependencies
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Internal Dependencies
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import SponsorCard from '../../components/shared/sponsor-card';
import { doGetUsers } from '../../firebase/db';

// Component Definition
class Sponsors extends Component {
  static propTypes = {
    location: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      initialSponsorData: [],
      championData: [],
      goldData: [],
      silverData: [],
      bronzeData: [],
    };
  }

  componentDidMount() {
    const sponsorList = [];

    doGetUsers('sponsor', sponsorList, this.handleUpdateInitialSponsorList);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      initialSponsorData,
    } = this.state;

    const isSponsorDataLoaded = Object.keys(prevState.initialSponsorData).length
      !== Object.keys(initialSponsorData).length;

    if (isSponsorDataLoaded) {
      this.handleSponsorLevelData();
    }
  }

  handleUpdateInitialSponsorList = (sponsorList) => {
    this.setState({ initialSponsorData: sponsorList });
  };

  handleSponsorLevelData = () => {
    const {
      initialSponsorData,
    } = this.state;

    Object.values(initialSponsorData).forEach((sponsor) => {
      switch (sponsor.SponsorLevel) {
        case 'Class Champion':
          this.setState(state => ({
            championData: [
              ...state.championData,
              {
                SponsorOrganization: sponsor.SponsorOrganization,
                OrganizationWebsiteAddress: sponsor.OrganizationWebsiteAddress,
              },
            ],
          }));
          break;
        case 'Gold Medal':
          this.setState(state => ({
            goldData: [
              ...state.goldData,
              {
                SponsorOrganization: sponsor.SponsorOrganization,
                OrganizationWebsiteAddress: sponsor.OrganizationWebsiteAddress,
              },
            ],
          }));
          break;
        case 'Silver Medal':
          this.setState(state => ({
            silverData: [
              ...state.silverData,
              {
                SponsorOrganization: sponsor.SponsorOrganization,
                OrganizationWebsiteAddress: sponsor.OrganizationWebsiteAddress,
              },
            ],
          }));
          break;
        case 'Bronze Medal':
          this.setState(state => ({
            bronzeData: [
              ...state.bronzeData,
              {
                SponsorOrganization: sponsor.SponsorOrganization,
                OrganizationWebsiteAddress: sponsor.OrganizationWebsiteAddress,
              },
            ],
          }));
          break;
        default: break;
      }
    });

    return [];
  };

  render() {
    const {
      location,
    } = this.props;

    const {
      championData,
      goldData,
      silverData,
      bronzeData,
    } = this.state;

    return (
      <Layout location={location}>
        <section css={{ textAlign: 'center' }}>
          <Helmet>
            <title>TMAC | Sponsors</title>
          </Helmet>
          <Container>
            <h1>Sponsors</h1>
            <div
              css={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <SponsorCard
                max={2000}
                sponsorClass="Class Champion"
                sponsorData={championData}
              />
              <SponsorCard
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
              />
              <SponsorCard
                min={500}
                max={999}
                sponsorClass="Bronze Medal"
                sponsorData={bronzeData}
              />
            </div>
          </Container>
        </section>
      </Layout>
    );
  }
}

export default Sponsors;
