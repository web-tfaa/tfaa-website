// External Dependencies
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { doUpdateEmail } from '../../firebase/auth';
import { emailRegex } from '../../utils/helpers';
import { options } from '../../utils/typography';
import Card from '../../components/shared/cards/card';
import CardSubtitle from '../../components/shared/CardSubtitle';
import presets from '../../utils/presets';

// Local Variables
const propTypes = {
  memberEmail: PropTypes.string.isRequired,
  setShouldRefetchUserList: PropTypes.func.isRequired,
};

const StyledRoot = styled(Card)(({ theme }) => ({
  '.contentText': {
    marginBottom: theme.spacing(2),
  },
  '.emailButton': {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    boxShadow: 'none',
    color: theme.palette.primary.main,
    fontFamily: options.headerFontFamily.join(','),
    fontWeight: 600,
    letterSpacing: 0.5,
    textDecoration: 'none',
    textTransform: 'capitalize',
  },
  '.innerContainer': {
    paddingBottom: theme.spacing(2),
  },
  '.listItemSecondaryText': {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
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

const StyledDialog = styled(Dialog)({
  '.MuiDialogActions-root': {
    '.MuiButton-root': {
      textTransform: 'capitalize',
    },
  },
});

// Component Definition
const MemberActions = ({
  memberEmail,
  setShouldRefetchUserList,
}) => {
  const [isChangeEmailDialogOpen, setIsChangeEmailDialogOpen] = useState(false);
  const [newEmailValue, setNewEmailValue] = useState('');
  const [newEmailError, setNewEmailError] = useState('');

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
          setShouldRefetchUserList(true);
          setIsChangeEmailDialogOpen(false);
          setNewEmailValue('');
          setNewEmailError('');
        })
        .catch((err) => {
          let errorMessage;

          if (err && err.message === 'EMAIL_EXISTS') {
            errorMessage = 'Email unavailable.';
          } else if (err && err.message.startsWith('This operation is sensitive')) {
            errorMessage = err.message;
          } else errorMessage = 'There was an error updating your email. Please try again.';

          setNewEmailError(errorMessage);
        });
    }
  }, [newEmailError, newEmailValue, setShouldRefetchUserList]);

  return (
    <StyledRoot>
      <CardSubtitle>Member actions</CardSubtitle>

      <List>
        <ListItem className="listItem">
          <ListItemText
            classes={{
              primary: 'listItemText',
            }}
            primary="Update email for TMAC website login"
            secondary={(
              <>
                Current sign-in email:
                <br />
                {memberEmail}
              </>
            )}
          />

          <ListItemSecondaryAction>
            <Button
              className="emailButton"
              color="primary"
              size="small"
              onClick={handleOpenChangeEmailDialog}
              variant="outlined"
            >
              Update
            </Button>
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem className="listItem">
          <ListItemText
            classes={{
              primary: 'listItemText',
            }}
            primary="Need to update any information?"
            secondary={(
              <>
                Email the TMAC Executive Secretary.
              </>
            )}
          />
          <ListItemSecondaryAction>
            <Button
              className="emailButton"
              color="primary"
              href="mailto:petwar1@yahoo.com"
              size="small"
              variant="outlined"
            >
              Email
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      <StyledDialog
        onClose={handleCloseChangeEmailDialog}
        open={isChangeEmailDialogOpen}
        maxWidth="xs"
      >
        <DialogTitle>Change Email Address</DialogTitle>

        <DialogContent>
          <Typography
            className="contentText"
            variant="body2"
          >
            This email is used to sign in to the TMAC website. Make sure you have access to the new
            email address for future use.
          </Typography>

          <TextField
            className="textField"
            error={Boolean(newEmailError)}
            helperText={newEmailError}
            label="New Email"
            onChange={handleUpdateNewEmailValue}
            value={newEmailValue}
            variant="filled"
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleCloseChangeEmailDialog}
            onKeyPress={handleCloseChangeEmailDialog}
          >
            Cancel
          </Button>

          <Button
            color="primary"
            onClick={handleSubmitChangeEmail}
            onKeyPress={handleSubmitChangeEmail}
            variant="contained"
          >
            Change Email
          </Button>
        </DialogActions>
      </StyledDialog>
    </StyledRoot>
  );
};

MemberActions.propTypes = propTypes;

export default MemberActions;
