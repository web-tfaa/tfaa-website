// External Dependencies
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

// Internal Dependencies
import Card from '../../../components/shared/cards/card';
import CardHeadline from '../../../components/shared/cards/card-headline';
import FuturaDiv from '../../../components/shared/futura-div';
import { doUpdateEmail } from '../../../firebase/auth';
import {
  emailRegex,
} from '../../../utils/helpers';


// Local Dependencies
import MemberInfoBlock from '../member-info-block';

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
  contentText: {
    marginBottom: theme.spacing(2),
  },
  emailContainer: {
    marginLeft: theme.spacing(2),
  },
  textField: {
    width: '75%',
  },
}));

// Component Definition
const MemberInfo = ({
  currentUser,
  memberEmail,
}) => {
  const classes = useStyles();

  const [isChangeEmailDialogOpen, setIsChangeEmailDialogOpen] = useState(false);
  const [newEmailValue, setNewEmailValue] = useState('');
  const [newEmailError, setNewEmailError] = useState('');

  const handleOpenChangeEmailDialog = () => {
    setIsChangeEmailDialogOpen(true);
  };

  const handleCloseChangeEmailDialog = () => {
    setIsChangeEmailDialogOpen(false);
    setNewEmailValue('');
    setNewEmailError('');
  };

  const handleUpdateNewEmailValue = (event) => {
    const { value } = event.target;

    if (!value) {
      setNewEmailError('Email is required');
    } else if (value && emailRegex.test(value)) {
      setNewEmailError('');
    } else if (value && !emailRegex.test(value)) {
      setNewEmailError('Use a valid email');
    }

    setNewEmailValue(value);
  };

  function handleSubmitChangeEmail() {
    if (!newEmailError) {
      doUpdateEmail(newEmailValue)
        .then(() => {
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
  }

  return (
    <>
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
        <FuturaDiv>
          <h5>Change email for TMAC website login</h5>
          <Button
            color="primary"
            size="small"
            onClick={handleOpenChangeEmailDialog}
            onKeyPress={handleOpenChangeEmailDialog}
            variant="outlined"
          >
            Update email
          </Button>
        </FuturaDiv>
      </Card>
      <Dialog onClose={handleCloseChangeEmailDialog} open={isChangeEmailDialogOpen}>
        <DialogTitle>Change Email Address</DialogTitle>
        <DialogContent>
          <Typography className={classes.contentText} variant="body2">
            This email is used to sign in to the TMAC website. Make sure you have access to the new
            email address for future use.
          </Typography>
          <TextField
            className={classes.textField}
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
      </Dialog>
    </>
  );
};

MemberInfo.propTypes = propTypes;

export default MemberInfo;
