// External Dependencies
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';
import Layout from '../../components/layout';
import MemberListTable from './member-table';
import presets from '../../utils/presets';
import Status from './status';
import { doGetUsers } from '../../firebase/db';

// Component Definition
class MemberListContent extends Component {
  static propTypes = {
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
      'jeff_turner@allenisd.org',
      'm2mathew@me.com',
      'mike@drumsensei.com',
    ].includes(userEmail);

    return (
      <div
        css={{
          paddingLeft: 0,
          width: '0 auto',
          [presets.Tablet]: {
            paddingLeft: 0,
          },
        }}
      >
        <Status />
        <Helmet>
          <title>TMAC | Member List</title>
        </Helmet>
        <div css={{ paddingLeft: 24 }}>
          <h2>Member list</h2>
          <MemberListTable
            data={Object.values(userData)}
            isAdmin={isAdmin}
          />
          {isAdmin && (
            <div
              css={{
                background: '#EDF2F8',
                marginTop: 24,
              }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h6">Admin View</Typography>
                  <Typography>
                    You can print any member&apos;s invoice or receipt from each row.
                  </Typography>
                </CardContent>
              </Card>
            </div>
          )}
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

export default MemberList;
