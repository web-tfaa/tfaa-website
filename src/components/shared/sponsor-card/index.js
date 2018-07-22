// External Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

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

    const donationAmount = min
      ? `${min.toLocaleString()}-${max.toLocaleString()}`
      : `${max.toLocaleString()}+`;

    return (
      <div
        css={{
          marginBottom: '1em',
          padding: '2em 3em',
          backgroundColor: 'white',
          borderRadius: 4,
          boxShadow: 'rgba(25, 17, 34, 0.05) 0px 3px 10px',
        }}
      >
        <h3
          css={{
            color: '#32456B',
            fontWeight: 600,
          }}
        >
          {sponsorClass}
        </h3>
        <h5
          css ={{
            color: '#32456B',
            marginTop: '1.25rem',
          }}
        >
          (${donationAmount} donation)
        </h5>
        {this.renderSponsors(sponsorData)}
      </div>
    );
  }
}

SponsorCard.propTypes = propTypes;
SponsorCard.defaultProps = defaultProps;
export default SponsorCard;
