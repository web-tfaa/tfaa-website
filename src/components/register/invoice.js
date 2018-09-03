// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';

// Internal Dependencies
import FormHr from '../shared/form-hr';
// import { colors } from '../../utils/presets';
import InvoiceTable from './invoice-table';

// Component Definition
const Invoice = (props) => {
  const {
    amount,
    isInvoice,
  } = props;

  return (
    <section
      css={{
        border: '2px solid #2D456F',
        boxShadow: '3px 0 5px #2D456F',
        boxSizing: 'border-box',
        height: '100%',
        width: '100%',
        margin: 24,
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
        <h2 css={{ margin: 0, textAlign: 'right' }}>
          {isInvoice ? 'INVOICE' : "RECEIPT"}
        </h2>
      </header>
      <FormHr red />

      <div css={{ margin: '0 32px' }}>
        <h3>Texas Music Administrators Conference</h3>
        <p css={{ fontSize: 14 }}><em>&quot;...promoting and supporting music education&quot;</em></p>
      </div>

      <div css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <InvoiceTable amount={amount} />

        <div css={{ marginTop: 32, textAlign: 'center' }}>
          Make all checks payable to: <strong>Texas Music Administrators Conference (TMAC)</strong>
        </div>
      </div>

      <footer css={{ fontSize: 12, textAlign: 'center', margin: '12px 48px' }}>
        The Texas Music Administrators Conference is a registered 501(c)(3) orgaization supporting
        music educators, music administrators, and Texas schools in the quest to deliver music
        and arts education to all students.
      </footer>
    </section>
  );
}

Invoice.propTypes = {
  amount: PropTypes.number.isRequired,
  isInvoice: PropTypes.bool.isRequired,
};

export default Invoice;
