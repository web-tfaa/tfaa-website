// External Dependencies
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import React from 'react';
import styled from 'styled-components';
import { getFullName } from '../../../../utils/getFullName';

// Internal Dependencies
import { TfaaMemberData } from '../../../../utils/hooks/useGetAllMembers';
import Address from '../../../shared/Address';
import MemberInfoCard from '../../../shared/MemberInfoCard';

// Local Typings
interface Props {
  currentMemberData: TfaaMemberData | null;
}

// Local Variables
const StyledMemberInfoCard = styled(MemberInfoCard)(({ theme }) => ({
  '.address': {
    fontWeight: 500,
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
    fontSize: '1rem',
    fontWeight: 500,
  },
  '.memberName': {
    fontSize: 27,
    fontWeight: 600,
  },
  marginBottom: 0,
  width: '100%',
}));

// Component Definition
const MemberContactInfo: React.FC<Props> = ({ currentMemberData }) => {
  if (!currentMemberData) {
    return null;
  }

  return (
    <StyledMemberInfoCard cardTitle="Member Contact Info">
      <List className="infoList">
        <ListItem className="infoListItem">
          <ListItemText
            primary={(
              <>
                <Typography className="memberName">
                  {getFullName(currentMemberData)}
                </Typography>

                <Typography>
                  {currentMemberData.Title}, {currentMemberData.District}
                </Typography>
              </>
            )}
            secondary={(
              <>
                <Address
                  addressOne={currentMemberData.Address1}
                  addressTwo={currentMemberData.Address2}
                  city={currentMemberData.City}
                  className="address"
                  email={currentMemberData.Email}
                  state={currentMemberData.State}
                  zipCode={currentMemberData.ZipCode}
                />

                <div>Cell: {currentMemberData.CellPhone}</div>

                <div>Office: {currentMemberData.OfficePhone}</div>
              </>
            )}
            secondaryTypographyProps={{
              component: 'div',
            }}
          />
        </ListItem>
      </List>
    </StyledMemberInfoCard>
  );
};

export default MemberContactInfo;
