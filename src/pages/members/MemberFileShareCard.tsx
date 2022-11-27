// External Dependencies
import PropTypes from 'prop-types';
import React, { FC } from 'react';
import {
  format,
  parseISO,
} from 'date-fns';
import styled from 'styled-components';

// Internal Dependencies
import Card from '../../components/shared/cards/card';
import CardHeadline from '../../components/shared/cards/card-headline';
import FuturaAnchor from '../../components/shared/FuturaAnchor';
import FuturaDiv from '../../components/shared/futura-div';

// Local Typings
interface Props {
  description: string;
  node: {
    title: string;
    date: string;
    link: string;
  };
}

// Local Variables
const propTypes = {
  description: PropTypes.string.isRequired,
  node: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
};

const StyledCard = styled(Card)(({ theme }) => ({
  '.cardTitle': {
    marginTop: theme.spacing(2),
  },
}));

// Component Definition
const MemberFileShareCard: FC<Props> = ({ node, description }) => {
  if (!node) {
    return null;
  }

  return (
    <StyledCard>
      <CardHeadline>{node.title}</CardHeadline>

      <h5 className="cardTitle">
        {format(parseISO(node.date), ['MMMM d, yyyy'])}
      </h5>

      <FuturaDiv>{description}</FuturaDiv>
      <FuturaAnchor
        download
        href={node.link}
      >
        Download
      </FuturaAnchor>
    </StyledCard>
  );
};

MemberFileShareCard.propTypes = propTypes;

export default MemberFileShareCard;
