// External Dependencies
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

// Internal Dependencies
import Card from '../../components/shared/cards/card';
import CardSubtitle from '../../components/shared/CardSubtitle';
import presets from '../../utils/presets';

// Local Variables
const propTypes = {
  currentMemberData: PropTypes.shape({
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
};

const StyledRoot = styled(Card)(({ theme }) => ({
  '.address': {
    fontStyle: 'normal',
  },
  '.contentText': {
    marginBottom: theme.spacing(2),
  },
  '.emailContainer': {
    marginLeft: theme.spacing(2),
  },
  '.infoList, .infoListItem': {
    paddingBottom: 0,
  },
  '.innerContainer': {
    paddingBottom: theme.spacing(2),
  },
  '.listItemText': {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.9rem',
      maxWidth: '70%',
    },
    [presets.Mobile]: {
      maxWidth: '60%',
    },
    [presets.Phablet]: {
      maxWidth: '70%',
    },
    [theme.breakpoints.up('mobile')]: {
      maxWidth: '80%',
    },
    fontSize: '1rem',
    fontWeight: 500,
  },
  marginBottom: 0,
  width: '100%',
}));

// Component Definition
const MemberInfo = ({ currentMemberData }) => {
  if (!currentMemberData) {
    return null;
  }

  return (
    <StyledRoot>
      <CardSubtitle>Member Info</CardSubtitle>

      <List className="infoList">
        <ListItem className="infoListItem">
          <ListItemText
            primary={(
              <>
                <div>{currentMemberData.FirstName} {currentMemberData.LastName}</div>
                <div>{currentMemberData.Title}, {currentMemberData.District}</div>
              </>
            )}
            secondary={(
              <address className="address">
                <div>{currentMemberData.Address1}</div>
                <div>{currentMemberData.Address2}</div>
                <div>
                  {currentMemberData.City}, {currentMemberData.State} {currentMemberData.ZipCode}
                </div>
                <div>Office: {currentMemberData.OfficePhone}</div>
                <div>Cell: {currentMemberData.CellPhone}</div>
                <div>{currentMemberData.Email}</div>
              </address>
            )}
            secondaryTypographyProps={{
              component: 'div',
            }}
          />
        </ListItem>
      </List>
    </StyledRoot>
  );
};

MemberInfo.propTypes = propTypes;

export default MemberInfo;
