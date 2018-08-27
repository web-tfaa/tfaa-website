// External Dependencies
// import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Internal Dependencies
import FormHr from '../shared/form-hr';
// import Card from '../../components/shared/cards/card';
// import CardHeadline from '../../components/shared/cards/card-headline';
// import Cards from '../../components/shared/cards';
// import Container from '../../components/shared/container';
// import Layout from '../../components/layout';
// import Status from './status';
// import presets from '../../utils/presets';
// import { options } from '../../utils/typography';
// import { firebase } from '../../firebase';
// import CtaButton from '../../components/masthead/cta-button';

// Local Variables

// Component Definition
class RegisterEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    // firebase.auth.onAuthStateChanged(authUser =>
    //   authUser
    //     ? this.setState(() => ({ authUser }))
    //     : this.setState(() => ({ authUser: null }))
    // );
  }

  render() {
    const {
      authUser,
    } = this.state;

    const isAuthenticated = Boolean(authUser);

    return (
      <section>
        <h2>3. Pay TMAC Dues</h2>
        <FormHr />
        Register Payment
      </section>
    );
  }
}

export default RegisterEmail;
