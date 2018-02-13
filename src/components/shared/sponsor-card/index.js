// External Dependencies
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import styled from 'styled-components';
// import Img from "gatsby-image"

// Internal Dependencies
// import typography, { rhythm, scale } from '../utils/typography'
// import presets, { colors } from '../utils/presets'

// Local Variables
const propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  sponsorClass: PropTypes.string.isRequired,
  sponsorData: PropTypes.array.isRequired,
};

const defaultProps = {
  max: null,
  min: null,
};

const SponsorCardWrapper = styled.div`
  margin-bottom: 1rem;
  padding: 2rem 3rem;
  background-color: white;
  border-radius: 4px;
  box-shadow: rgba(25, 17, 34, 0.05) 0px 3px 10px;
`;

const SponsorCardTitle = styled.div`
  color: royalblue;
  font-weight: 600;
  margin-bottom: 1rem;
`;

// Component Definition
class SponsorCard extends Component {
  renderSponsors = (sponsorData) => {
    const {
      sponsorClass,
    } = this.props;

    const sponsorList = sponsorData.map(sponsor => {
      return (
        <div key={sponsor.name}>
          <a href={sponsor.link}>{sponsor.name}</a>
        </div>
      );
    });

    if (sponsorList.length < 1) {
      return (
        <div>
          Please contact any TMAC officer about becoming a {sponsorClass} sponsor.
        </div>
      );
    }
    return sponsorList;
  }

  render() {
    const {
      max,
      min,
      sponsorClass,
      sponsorData,
    } = this.props;

    console.log('yo', sponsorData);

    const donationAmount = min
      ? `${min.toLocaleString()}-${max.toLocaleString()}`
      : `${max.toLocaleString()}+`;

    return (
      <SponsorCardWrapper>
        <SponsorCardTitle>
          {sponsorClass} Sponsor (${donationAmount} donation)
        </SponsorCardTitle>
        {this.renderSponsors(sponsorData)}
      </SponsorCardWrapper>
    );
  }
}

SponsorCard.propTypes = propTypes;
SponsorCard.defaultProps = defaultProps;
export default SponsorCard;
