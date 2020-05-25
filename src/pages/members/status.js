// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'gatsby';
import { makeStyles } from '@material-ui/styles';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';
import { colors } from '../../utils/presets';
import { auth } from '../../firebase';

// Local Variables
const propTypes = {
  authUser: PropTypes.shape({
    email: PropTypes.string,
    uid: PropTypes.string,
  }),
};

const defaultProps = {
  authUser: null,
};

const useStyles = makeStyles((theme) => ({
  anchor: {
    marginLeft: theme.spacing(1.5),
  },
  root: {
    background: colors.status,
    display: 'flex',
    fontSize: '87.5%',
    height: theme.spacing(6),
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
  },
  text: {
    fontSize: '0.9rem',
  },
}));

// Component Definition
const Status = ({ authUser }) => {
  const classes = useStyles();

  const isAuthenticated = Boolean(authUser);

  const details = !isAuthenticated ? (
    <Typography className={classes.text}>
      To access the Members area, please
      <Link to="/members/login">
        log in
      </Link>.
    </Typography>
  ) : (
    <Typography className={classes.text}>
      Logged in as {authUser.email}
      <a className={classes.anchor} href="/members" onClick={auth.doSignOut}>
        Sign out
      </a>
    </Typography>
  );

  return <section className={classes.root}>{details}</section>;
};
Status.propTypes = propTypes;
Status.defaultProps = defaultProps;

const StatusWithContext = (props) => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <Status
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        authUser={authUser}
      />
    )}
  </AuthUserContext.Consumer>
);

export default StatusWithContext;
