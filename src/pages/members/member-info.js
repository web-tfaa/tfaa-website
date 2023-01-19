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
    [presets.Tablet]: {
      maxWidth: '80%',
    },
    fontSize: '1rem',
    fontWeight: 500,
  },
  marginBottom: 0,
  width: '100%',
}));

// Component Definition
const MemberInfo = ({ currentUser }) => {
  return (
    <StyledRoot>
      <CardSubtitle>Member Info</CardSubtitle>

      <List className="infoList">
        <ListItem className="infoListItem">
          <ListItemText
            primary={(
              <>
                <div>{currentUser.FirstName} {currentUser.LastName}</div>
                <div>{currentUser.Title}, {currentUser.District}</div>
              </>
            )}
            secondary={(
              <address className="address">
                <div>{currentUser.Address1}</div>
                <div>{currentUser.Address2}</div>
                <div>
                  {currentUser.City}, {currentUser.State} {currentUser.ZipCode}
                </div>
                <div>Office: {currentUser.OfficePhone}</div>
                <div>Cell: {currentUser.CellPhone}</div>
                <div>{currentUser.Email}</div>
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
