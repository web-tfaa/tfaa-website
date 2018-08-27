// External Dependencies
import PropTypes from 'prop-types';
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
const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

// Component Definition
class RegisterEmail extends Component {
  render() {
    const {
      isAuthenticated,
    } = this.props;

    return (
      <section>
        <h2>1. Sign up for TMAC website login</h2>
        <FormHr />
        Register Email
      </section>
    );
  }
}

RegisterEmail.propTypes = propTypes;
export default RegisterEmail;
