// External Dependencies
import React from 'react'
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

const SponsorCardTitle = styled.span`
  color: royalblue;
  font-weight: 600;
`;

// Component Definition
const SponsorCard = (props) => {
  const {
    max,
    min,
    sponsorClass,
  } = props;

  const donationAmount = min
    ? `${min.toLocaleString()}-${max.toLocaleString()}`
    : `${max.toLocaleString()}+`;

  return (
    <SponsorCardWrapper>
      <SponsorCardTitle>
        {sponsorClass} Sponsor (${donationAmount} donation)
      </SponsorCardTitle>
    </SponsorCardWrapper>
  );
};

SponsorCard.propTypes = propTypes;
SponsorCard.defaultProps = defaultProps;
export default SponsorCard;
