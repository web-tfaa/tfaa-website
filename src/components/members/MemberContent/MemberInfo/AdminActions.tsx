// External Dependencies
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import styled from 'styled-components';

// Internal Dependencies
import CtaButton from '../../../shared/CtaButton';
import MemberInfoCard from '../../../shared/MemberInfoCard';

// Local Variables
const StyledMemberInfoCard = styled(MemberInfoCard)(({ theme }) => ({
  '.actionContainer': {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
    },
    display: 'flex',
    justifyContent: 'flex-end',
  },
  '.listItem': {
    marginBottom: 0,
    paddingBottom: 0,
  },
  '.listItemText': {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.9rem',
      maxWidth: '70%',
    },
    fontSize: '1rem',
    fontWeight: 500,
  },
  marginBottom: 0,
  width: '100%',
}));

// Component Definition
const AdminActions: React.FC = () => {
  return (
    <StyledMemberInfoCard
      cardTitle="Admin actions"
      isAdmin
    >
      <List>
        <ListItem className="paymentListItem">
          <ListItemText
            classes={{
              primary: 'listItemText',
            }}
            primary="View the Sponsors for this year."
          />
        </ListItem>

        <ListItem className="actionContainer">
          <ListItemSecondaryAction>
            <CtaButton
              colorVariant="resources"
              fontWeight={600}
              to="/sponsors/sponsors-table"
            >
              View Sponsors
            </CtaButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </StyledMemberInfoCard>
  );
};

export default AdminActions;
