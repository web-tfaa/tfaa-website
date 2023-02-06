// External Dependencies
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../../../utils/app-constants';
import { doUpdateEmail } from '../../../../firebase/auth';
import { emailRegex } from '../../../../utils/helpers';
import MemberInfoCard from '../../../shared/MemberInfoCard';
import CtaButton from '../../../shared/CtaButton';
import DialogUpdateAuthUserEmail from './DialogUpdateAuthUserEmail';

// Local Typings
interface Props {
  authUserEmail: string | undefined;
  onUpdateShouldRefetchUserList: ((shouldRefetchUserList: boolean) => void) | null;
}

// Local Variables
const StyledMemberInfoCard = styled(MemberInfoCard)(({ theme }) => ({
  '.actionContainer': {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
    },
    display: 'flex',
    justifyContent: 'flex-end',
  },
  '.contentText': {
    marginBottom: theme.spacing(2),
  },
  '.innerContainer': {
    paddingBottom: theme.spacing(2),
  },
  '.listItemSecondaryText': {
    [theme.breakpoints.down('mobile')]: {
      maxWidth: '70%',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
      maxWidth: '60%',
    },
    maxWidth: '80%',
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
const MemberActions: React.FC<Props> = ({
  authUserEmail,
  onUpdateShouldRefetchUserList,
}) => {
  const [isChangeEmailDialogOpen, setIsChangeEmailDialogOpen] = useState(false);
  const [newEmailValue, setNewEmailValue] = useState('');
  const [newEmailError, setNewEmailError] = useState('');

  useEffect(() => {
    if (authUserEmail === newEmailValue) {
      setNewEmailError('This is your current email used for signing in');
    }
  }, [newEmailError, newEmailValue]);

  const handleOpenChangeEmailDialog = useCallback(() => {
    setIsChangeEmailDialogOpen(true);
  }, []);

  const handleCloseChangeEmailDialog = useCallback(() => {
    setIsChangeEmailDialogOpen(false);
    setNewEmailValue('');
    setNewEmailError('');
  }, []);

  const handleUpdateNewEmailValue = useCallback((event) => {
    const { value } = event.target;

    if (!value) {
      setNewEmailError('Email is required');
    } else if (value && emailRegex.test(value)) {
      setNewEmailError('');
    } else if (value && !emailRegex.test(value)) {
      setNewEmailError('Use a valid email');
    }

    setNewEmailValue(value);
  }, []);

  const handleSubmitChangeEmail = useCallback(() => {
    if (!newEmailError) {
      doUpdateEmail(newEmailValue)
        .then(() => {
          // It's easiest to refresh their page once they update the sign in email
          if (typeof window !== 'undefined') {
            window.location.reload();
          }
        })
        .catch((err: any) => {
          let errorMessage;

          if (err && err.message === 'EMAIL_EXISTS') {
            errorMessage = 'Email unavailable.';
          } else if (err && err.message.startsWith('This operation is sensitive')) {
            errorMessage = err.message;
          } else errorMessage = 'There was an error updating your email. Please try again.';

          setNewEmailError(errorMessage);
        });
    }
  }, [newEmailError, newEmailValue, onUpdateShouldRefetchUserList]);

  return (
    <StyledMemberInfoCard cardTitle="Member actions">
      <List>
        <ListItem className="listItem">
          <ListItemText
            classes={{
              primary: 'listItemText',
              secondary: 'listItemSecondaryText',
            }}
            primary={`Update email for ${appNameShort} website login`}
            secondary={(
              <>
                Current sign-in email:
                <br />
                {authUserEmail}
              </>
            )}
          />
        </ListItem>

        <ListItem className="actionContainer">
          <ListItemSecondaryAction>
            <CtaButton
              colorVariant="resources"
              fontWeight={500}
              onClick={handleOpenChangeEmailDialog}
              width={144}
            >
              Update email
            </CtaButton>
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem className="listItem">
          <ListItemText
            classes={{
              primary: 'listItemText',
              secondary: 'listItemSecondaryText',
            }}
            primary="Need to update any information?"
            secondary={(
              <>
                Email the {appNameShort} Executive Secretary.
              </>
            )}
          />
        </ListItem>

        <ListItem className="actionContainer">
          <ListItemSecondaryAction>
            <CtaButton
              colorVariant="resources"
              fontWeight={500}
              href="mailto:jeffrey.turner@allenisd.org"
              width={144}
            >
              Email {appNameShort}
            </CtaButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      <DialogUpdateAuthUserEmail
        authUserEmail={authUserEmail}
        emailError={newEmailError}
        emailValue={newEmailValue}
        isOpen={isChangeEmailDialogOpen}
        onClose={handleCloseChangeEmailDialog}
        onSubmitChangeEmailUpdatedEmail={handleSubmitChangeEmail}
        onUpdateEmailValue={handleUpdateNewEmailValue}
      />
    </StyledMemberInfoCard>
  );
};

export default MemberActions;
