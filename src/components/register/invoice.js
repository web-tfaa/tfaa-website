// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';

// Internal Dependencies
import FormHr from '../shared/form-hr';
// import Card from '../../components/shared/cards/card';
// import CardHeadline from '../../components/shared/cards/card-headline';
// import Cards from '../../components/shared/cards';
// import Container from '../../components/shared/container';
// import Layout from '../../components/layout';
// import Status from './status';
import { colors } from '../../utils/presets';
// import { options } from '../../utils/typography';
// import { firebase } from '../../firebase';
// import CtaButton from '../../components/masthead/cta-button';

// Component Definition
const Invoice = (props) => {
  const {
    amount,
  } = props;

  return (
    <section
      css={{
        border: '2px solid #2D456F',
        boxShadow: '3px 0 5px #2D456F',
        boxSizing: 'border-box',
        height: '100%',
        width: '100%',
      }}
      id="invoice-container"
    >
      <header
        css={{
          background: `linear-gradient(180deg, #B8CCE3, #EDF2F8)`,
          height: 100,
          padding: 16,
        }}
      >
        <h2 css={{ margin: 0, textAlign: 'right' }}>INVOICE</h2>
      </header>
      <FormHr />
      <h3>Texas Music Administrators Conference</h3>
      <p><em>&quot;...promoting and supporting music education&quot;</em></p>
      {amount}
    </section>
  );
}

Invoice.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default Invoice;
