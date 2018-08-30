// External Dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'gatsby';

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

const emptySponsorStyles = { maxWidth: '75%' };

// Component Definition
class SponsorCard extends Component {
  renderSponsors = sponsorData => {
    const { sponsorClass } = this.props;

    const sponsorList = sponsorData.map(sponsor => {
      return (
        <div key={sponsor.name}>
          <a href={sponsor.link}>{sponsor.name}</a>
        </div>
      );
    });

    if (sponsorList.length < 1) {
      return (
        <div css={emptySponsorStyles}>
          Please <Link to="/about/officers">contact any TMAC officer</Link>{' '}
          about becoming a{' '}
          <span css={{ fontWeight: '600' }}>{sponsorClass}</span> sponsor.
        </div>
      );
    }
    return sponsorList;
  };

  render() {
    const { max, min, sponsorClass, sponsorData } = this.props;

    const donationAmount = min
      ? `${min.toLocaleString()}-${max.toLocaleString()}`
      : `${max.toLocaleString()}+`;

    return (
      <div
        css={{
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 4,
          boxShadow: 'rgba(25, 17, 34, 0.05) 0px 3px 10px',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '1em',
          padding: '2em 3em',
        }}>
        <h3
          css={{
            color: '#32456B',
            fontWeight: 600,
          }}>
          {sponsorClass}
        </h3>
        <h5
          css={{
            color: '#32456B',
            marginTop: '1.25rem',
          }}>
          ($
          {donationAmount} donation)
        </h5>
        {this.renderSponsors(sponsorData)}
      </div>
    );
  }
}

SponsorCard.propTypes = propTypes;
SponsorCard.defaultProps = defaultProps;
export default SponsorCard;
