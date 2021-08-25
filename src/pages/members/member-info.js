// External Dependencies
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

// Internal Dependencies
import Card from '../../components/shared/cards/card';
import CardSubtitle from '../../components/shared/CardSubtitle';
import presets from '../../utils/presets';
import { doUpdateEmail } from '../../firebase/auth';
import { emailRegex, currentSchoolYearLong } from '../../utils/helpers';

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
  }),
  setShouldRefetchUserList: PropTypes.func.isRequired,
};

const defaultProps = {
  currentUser: null,
};

const useStyles = makeStyles((theme) => ({
  address: {
    fontStyle: 'normal',
  },
  contentText: {
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
  emailContainer: {
    marginLeft: theme.spacing(2),
  },
  listItemText: {
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
  },
  subheader: {
    marginTop: theme.spacing(3),
  },
  subtitle: {
    fontWeight: 600,
  },
  textField: {
    width: '75%',
  },
}));

// Component Definition
const MemberInfo = ({
  currentUser,
  setShouldRefetchUserList,
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
  }

  return (
    <>
      <Card>
        <section>
          {currentUser && (
            <>
              <CardSubtitle>Member Info</CardSubtitle>

              <List>
                <ListItem>
                  <ListItemText
                    primary={(
                      <>
                        <div>{currentUser.FirstName} {currentUser.LastName}</div>
                        <div>{currentUser.Title}, {currentUser.District}</div>
                      </>
                    )}
                    secondary={(
                      <>
                        <address className={classes.address}>
                          <div>{currentUser.Address1}</div>
                          <div>{currentUser.Address2}</div>
                          <div>
                            {currentUser.City}, {currentUser.State} {currentUser.ZipCode}
                          </div>
                          <div>Office: {currentUser.OfficePhone}</div>
                          <div>Cell: {currentUser.CellPhone}</div>
                          <div>{currentUser.Email}</div>
                        </address>
                      </>
                    )}
                    secondaryTypographyProps={{
                      component: 'div',
                    }}
                  />
                </ListItem>
              </List>

              <Divider className={classes.divider} />
            </>
          )}
        </section>

        <section>
          <CardSubtitle>Membership status</CardSubtitle>

          <List>
            <ListItem className={classes.listItem}>
              <ListItemText
                classes={{
                  primary: classes.listItemText,
                }}
                primary={(
                  <>
                    {!currentUser ? 'Inactive' : currentUser?.MemberType || 'Active'} member
                  </>
                )}
                secondary={`for the ${currentSchoolYearLong} school year`}
              />
            </ListItem>
          </List>

          <Divider className={classes.divider} />
        </section>

        <section>
          <CardSubtitle>Member actions</CardSubtitle>

          <List>
            <ListItem className={classes.listItem}>
              <ListItemText
                classes={{
                  primary: classes.listItemText,
                }}
                primary="Update email for TMAC website login"
              />

              <ListItemSecondaryAction>
                <Button
                  color="primary"
                  size="small"
                  onClick={handleOpenChangeEmailDialog}
                  variant="outlined"
                >
                  Update
                </Button>
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemText
                classes={{
                  primary: classes.listItemText,
                }}
                primary="Need to update any information?"
                secondary={(
                  <>
                    Email the <a href="mailto:jeffrey.turner@allenisd.org">TMAC Executive Secretary</a>.
                  </>
                )}
              />
            </ListItem>
          </List>
        </section>
      </Card>

      <Dialog
        onClose={handleCloseChangeEmailDialog}
        open={isChangeEmailDialogOpen}
      >
        <DialogTitle>Change Email Address</DialogTitle>

        <DialogContent>
          <Typography
            className={classes.contentText}
            variant="body2"
          >
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
MemberInfo.defaultProps = defaultProps;

export default MemberInfo;
