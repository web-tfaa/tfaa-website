// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

// Internal Dependencies
import Card from '../../../components/shared/cards/card';
import CardHeadline from '../../../components/shared/cards/card-headline';
import FuturaDiv from '../../../components/shared/futura-div';

// Local Dependencies
import MemberInfoBlock from '../MemberInfoBlock';

// Local Variables
const propTypes = {
  currentUser: PropTypes.shape({
    Address1: PropTypes.string,
    Address2: PropTypes.string,
    CellPhone: PropTypes.string,
    City: PropTypes.string,
    District: PropTypes.string,
    FirstName: PropTypes.string,
    LastName: PropTypes.string,
    MemberType: PropTypes.string,
    OfficePhone: PropTypes.string,
    State: PropTypes.string,
    Title: PropTypes.string,
    ZipCode: PropTypes.string,
  }).isRequired,
  memberEmail: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  emailContainer: {
    marginLeft: theme.spacing(2),
  },
}));

// Component Definition
const MemberInfo = ({
  currentUser,
  memberEmail,
}) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeadline>{`Info for: ${memberEmail}`}</CardHeadline>
      <div>
        <MemberInfoBlock>
          {currentUser.FirstName} {currentUser.LastName}
        </MemberInfoBlock>
        <MemberInfoBlock>
          {currentUser.Title}, {currentUser.District}
        </MemberInfoBlock>
        <MemberInfoBlock>{currentUser.MemberType || 'Active'} member</MemberInfoBlock>
        <MemberInfoBlock>{currentUser.Address1}</MemberInfoBlock>
        <MemberInfoBlock>{currentUser.Address2}</MemberInfoBlock>
        <MemberInfoBlock>
          {currentUser.City}, {currentUser.State} {currentUser.ZipCode}
        </MemberInfoBlock>
        <MemberInfoBlock>Office Phone: {currentUser.OfficePhone}</MemberInfoBlock>
        <MemberInfoBlock>Cell Phone: {currentUser.CellPhone}</MemberInfoBlock>
      </div>
      <FuturaDiv>
        <h5>Need to update any information?</h5>
        <span className={classes.emailContainer}>
          Email the <a href="mailto:jeff_turner@allenisd.org">TMAC Executive Secretary</a>.
        </span>
      </FuturaDiv>
    </Card>
  );
};

MemberInfo.propTypes = propTypes;

export default MemberInfo;
