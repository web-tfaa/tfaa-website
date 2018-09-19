// External Dependencies
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';
import Container from '../../components/shared/container';
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
  };

  constructor(props) {
    super(props);

    this.state = {
      userData: [],
    };
  }

  componentDidMount() {
    const userList = [];

    doGetUsers(userList, this.handleUpdateUserList);
  }

  handleUpdateUserList = (userList) => {
    this.setState({ userData: userList });
  };

  render() {
    const {
      isAuthenticated,
    } = this.props;

    const {
      userData,
    } = this.state;

    if (!isAuthenticated) {
      return null;
    }

    return (
      <div
        css={{
          paddingLeft: 0,
          width: `0 auto`,
          [presets.Tablet]: {
            paddingLeft: '1.5rem',
          },
        }}>
        <Status />
        <Container>
          <Helmet>
            <title>TMAC | Member List</title>
          </Helmet>
          <h2>Member list</h2>
          <MemberListTable data={Object.values(userData)} />
        </Container>
      </div>
    );
  }
}

const MemberList = (props) => (
  // eslint-disable-next-line
  <Layout location={props.location}>
    <MemberListWithContext {...props} />
  </Layout>
);

const MemberListWithContext = (props) => (
  <AuthUserContext.Consumer>
    {authUser => <MemberListContent {...props} isAuthenticated={!!authUser} />}
  </AuthUserContext.Consumer>
);

export default MemberList;
