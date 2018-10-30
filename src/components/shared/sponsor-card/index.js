// External Dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'gatsby';
import { css } from 'glamor';

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
    <div
      key={sponsor.name}
      css={{ fontSize: 19, marginBottom: 6 }}
    >
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

    // Let's add some animation to the titles of the sponsor levels!
    const textShadowDropBottom = css.keyframes({
      '0%': { textShadow: '0 0 0 rgba(0, 0, 0, 0)' },
      '100%': { textShadow: '0 3px 3px rgba(0, 0, 0, 0.2)' },
    });

    return (
      <div
        css={{
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 4,
          boxShadow: 'rgba(25, 17, 34, 0.05) 0px 3px 10px',
          marginBottom: '1em',
          padding: '2em 3em',
        }}
      >
        <h2
          css={css({
            animation: `${textShadowDropBottom} 2s both`,
          })}
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

        <hr css={{ color: 'blue', height: 3, marginTop: 32 }} />

        <div css={sponsorInfoStyles}>
          <h4 css={{ color: '#32456B', marginTop: 12 }}>Sponsorship receives:</h4>
          <ul css={{ maxWidth: '60%', textAlign: 'justify' }}>
            {sponsorClass === 'Class Champion' && <li>Up to 20 min presentation to TMAC membership at either November Conference or TMEA Meeting</li>}
            <li>Company Logo in Programs for TMAC November Conference and TMEA Meeting</li>
            <li>Company Logo on TMAC website</li>
          </ul>
          <div css={{ maxWidth: '75%', marginBottom: 16 }}>
            Deadline for recogntion at{' '}
            <span css={{ fontWeight: 600 }}>Fall Conference</span> is Wednesday, November 7th.
          </div>
          <div css={{ maxWidth: '75%' }}>{' '}
            Sponsors registering after November 7th will be recogized at the{' '}
            <span css={{ fontWeight: 600 }}>TMEA Round Table</span>.
          </div>
          <Link
            css={{
              fontSize: 20,
              fontWeight: '600',
              margin: '24px 0',
            }}
            to="/sponsors/sponsor-info"
            state={{ level: sponsorClass }}
          >
            Click here to register and pay
          </Link>
        </div>
      </div>
    );
  }
}

export default SponsorCard;
