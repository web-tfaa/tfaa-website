// External Dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import { Link } from 'gatsby';

// Local Variables
const sponsorInfoStyles = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
};

// Component Definition
class SponsorCard extends Component {
  static propTypes = {
    max: PropTypes.number,
    min: PropTypes.number,
    sponsorClass: PropTypes.string.isRequired,
    sponsorData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  static defaultProps = {
    max: null,
    min: null,
  };

  renderSponsors = sponsorData => sponsorData.map(sponsor => (
    <div key={sponsor.name}>
      <a
        href={sponsor.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {sponsor.name}
      </a>
    </div>
  ));

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
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 4,
          boxShadow: 'rgba(25, 17, 34, 0.05) 0px 3px 10px',
          // display: 'flex',
          // flexDirection: 'column',
          marginBottom: '1em',
          padding: '2em 3em',
        }}
      >
        <h2
          css={{
            color: '#32456B',
            fontWeight: 600,
          }}
        >
          {sponsorClass}
        </h2>
        <h4
          css={{
            color: '#32456B',
            marginTop: '1.25rem',
          }}
        >
          (${donationAmount} donation)
        </h4>

        {this.renderSponsors(sponsorData)}

        <hr css={{ color: 'blue', height: 3 }} />

        <div css={sponsorInfoStyles}>
          <h4 css={{ color: '#32456B' }}>Sponsorship receives:</h4>
          <ul css={{ maxWidth: '60%', textAlign: 'justify' }}>
            {sponsorClass === 'Class Champion' && <li>Up to 20 min presentation to TMAC membership at either Nov Conference or TMEA Meeting</li>}
            <li>Company Logo in TMAC November Conference and February Meeting Program</li>
            <li>Company Logo on TMAC website</li>
          </ul>
            Deadline to register and pay is Nov 1
          <div css={{ fontWeight: '600', margin: '12px 0' }}>Registration Coming Soon!</div>
        </div>
      </div>
    );
  }
}

export default SponsorCard;
