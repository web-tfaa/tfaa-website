// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import format from 'date-fns/format';
import { makeStyles } from '@material-ui/styles';

// Internal Dependencies
import Card from '../../components/shared/cards/card';
import CardHeadline from '../../components/shared/cards/card-headline';
import FuturaAnchor from '../../components/shared/FuturaAnchor';
import FuturaDiv from '../../components/shared/futura-div';

// Local Variables
const propTypes = {
  description: PropTypes.string.isRequired,
  node: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
};

const useStyles = makeStyles((theme) => ({
  cardTitle: {
    marginTop: theme.spacing(2),
  },
}));

// Component Definition
const MemberFileShareCard = ({ node, description }) => {
  const classes = useStyles();

  if (!node) {
    return null;
  }
  return (
    <Card>
      <CardHeadline>{node.title}</CardHeadline>
      <h5 className={classes.cardTitle}>{format(node.date, ['MMMM dd yyyy'])}</h5>
      <FuturaDiv>{description}</FuturaDiv>
      <FuturaAnchor download href={node.link}>
        Download
      </FuturaAnchor>
    </Card>
  );
};

MemberFileShareCard.propTypes = propTypes;

export default MemberFileShareCard;
