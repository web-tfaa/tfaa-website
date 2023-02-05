// External Dependencies
import { lighten } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { ChangeEventHandler } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { appNameShort } from '../../../../utils/app-constants';

// Local Typings
interface Props {
  authUserEmail: string | undefined;
  emailError: string;
  emailValue: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmitChangeEmailUpdatedEmail: () => void;
  onUpdateEmailValue: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

// Local Variables
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '.MuiDialogActions-root': {
    '.MuiButton-root': {
      textTransform: 'capitalize',
    },
  },
  '.currentEmail': {
    backgroundColor: lighten(theme.palette.tfaa.resources, 0.9),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2),
  },
  '.dialogContent': {
    '& > .MuiTypography-root': {
      fontWeight: 500,
    },
  },
  '.dialogTitle': {
    fontWeight: 700,
  },
  '.textField': {
    marginTop: theme.spacing(3),
    width: '100%',
  },
  '.textFieldInput': {
    fontWeight: 500,
  },
}));

// Component Definition
const DialogUpdateAuthUserEmail: React.FC<Props> = ({
  authUserEmail,
  emailError,
  emailValue,
  isOpen,
  onClose,
  onSubmitChangeEmailUpdatedEmail,
  onUpdateEmailValue,
}) => {
  return (
    <StyledDialog
      onClose={onClose}
      open={isOpen}
      maxWidth="xs"
    >
      <DialogTitle className="dialogTitle">
        Change Email Address?
      </DialogTitle>

      <DialogContent className="dialogContent">
        <Typography
          className="contentText"
          gutterBottom
          variant="body2"
        >
          This email is used to sign in to the {appNameShort} website.
          Your {appNameShort} registration information for this year
          will not be updated.
        </Typography>

        <div className="currentEmail">
          <Typography>
            Current email address: <strong>{authUserEmail}</strong>
          </Typography>
        </div>

        <Typography
          className="contentText"
          variant="body2"
        >
          Make sure you have access to the new
          email address for future use.
        </Typography>

        <TextField
          className="textField"
          inputProps={{
            className: 'textFieldInput'
          }}
          error={Boolean(emailError)}
          helperText={emailError}
          label="New Email"
          onChange={onUpdateEmailValue}
          value={emailValue}
          variant="filled"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          disabled={Boolean(emailError || !emailValue)}
          onClick={onSubmitChangeEmailUpdatedEmail}
          variant="contained"
        >
          Yes, Change Email
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default DialogUpdateAuthUserEmail;
