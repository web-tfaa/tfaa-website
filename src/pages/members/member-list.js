// External Dependencies
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';
import Layout from '../../components/layout';
import MemberListTable from './member-table';
import presets from '../../utils/presets';
import Status from './status';
import { doGetUsers } from '../../firebase/db';

// Local Variables
const styles = theme => ({
  adminCard: {
    borderLeft: `4px solid ${theme.palette.primary.dark}`,
    maxWidth: '60%',
  },
  paddingContainer: {
    paddingLeft: 24,
  },
  root: {
    paddingLeft: 0,
    width: '0 auto',
    [presets.Tablet]: {
      paddingLeft: 0,
    },
  },
});

// Component Definition
class MemberListContent extends Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.shape({}).isRequired,
    userEmail: PropTypes.string,
  };

  static defaultProps = {
    userEmail: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      userData: [],
    };
  }

  componentDidMount() {
    const userList = [];

    doGetUsers('registration', userList, this.handleUpdateUserList);
  }

  handleUpdateUserList = (userList) => {
    this.setState({ userData: userList });
  };

  render() {
    const {
      classes,
      isAuthenticated,
      userEmail,
    } = this.props;

    const {
      userData,
    } = this.state;

    if (!isAuthenticated) {
      return null;
    }

    const isAdmin = userEmail && [
      'patricia.h.moreno@austinisd.org',
      'jon.lester@abileneisd.org',
      'jeffrey.turner@allenisd.org',
      'jim.egger@mcallenisd.net',
      'johnjanda@tomballisd.net',
      'm2mathew@me.com',
      'mike@drumsensei.com',
    ].includes(userEmail);

    return (
      <div className={classes.root}>
        <Status />
        <Helmet>
          <title>TMAC | Member List</title>
        </Helmet>
        <div className={classes.paddingContainer}>
          <h2>Member list</h2>
          {isAdmin && (
            <Card className={classes.adminCard}>
              <CardContent>
                <Typography variant="h6" component="h6">Admin View</Typography>
                <Typography variant="body2">
                  You can print any member&apos;s invoice or receipt from each row.
                </Typography>
              </CardContent>
            </Card>
          )}
          <MemberListTable
            data={Object.values(userData)}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    );
  }
}

const MemberList = props => (
  // eslint-disable-next-line
  <Layout location={props.location}>
    <MemberListWithContext {...props} />
  </Layout>
);

const MemberListWithContext = props => (
  <AuthUserContext.Consumer>
    {authUser => (
      <MemberListContent
        {...props}
        userEmail={authUser ? authUser.email : ''}
        isAuthenticated={!!authUser}
      />
    )}
  </AuthUserContext.Consumer>
);

export default withStyles(styles)(MemberList);
