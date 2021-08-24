// External Dependencies
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Internal Dependencies
import FormHr from '../shared/form-hr';
import InvoiceTable from './invoice-table';
import {
  currentSchoolYearLong,
} from '../../utils/helpers';

// Local Variables
const propTypes = {
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  form: PropTypes.shape({
    District: PropTypes.string,
    invoiceDate: PropTypes.string,
    receiptDate: PropTypes.string,
  }).isRequired,
  invoiceId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isActive: PropTypes.bool,
  isInvoice: PropTypes.bool.isRequired,
  // paymentDetails: PropTypes.shape({
  //   payerId: PropTypes.string,
  //   paymentId: PropTypes.string,
  // }),
  receiptId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sponsorLevel: PropTypes.string,
  sponsorOrganizationName: PropTypes.string,
};

const defaultProps = {
  invoiceId: 1,
  isActive: true,
  // paymentDetails: {},
  receiptId: 1,
  sponsorLevel: '',
  sponsorOrganizationName: '',
};

const currentDate = format(new Date(), 'M/d/yyyy');

// Component Definition
// eslint-disable-next-line
class Invoice extends Component {
  render() {
    const {
      amount,
      form,
      invoiceId,
      isActive,
      isInvoice,
      // paymentDetails,
      receiptId,
      sponsorLevel,
      sponsorOrganizationName,
      ...otherProps
    } = this.props;

    return (
      <section
        css={{
          border: '1px solid #2D456F',
          height: 980,
          margin: 24,
          width: 750,
        }}
        id="invoice-container"
        {...otherProps}
      >
        <header
          css={{
            background: 'linear-gradient(180deg, #B8CCE3, #EDF2F8)',
            height: 110,
            padding: 16,
          }}
        >
          <img
            alt="TMAC logo"
            height="80px"
            src="https://res.cloudinary.com/tmac/image/upload/v1523131020/tmac-logo.jpg"
            style={{ position: 'absolute' }}
          />
          <h2 css={{ margin: 0, textAlign: 'right' }}>{isInvoice ? 'INVOICE' : 'RECEIPT'}</h2>
        </header>
        <FormHr red />

        <div css={{ fontSize: 14, margin: '0 32px' }}>
          <h3>Texas Music Administrators Conference</h3>
          <p css={{ fontSize: 14 }}>
            <em>&quot;...promoting and supporting music education&quot;</em>
          </p>
          <div>
            <strong>{isInvoice ? 'Invoice' : 'Receipt'}#:</strong> {currentSchoolYearLong}_
            {isInvoice ? invoiceId : receiptId}
          </div>
          <div>
            <strong>Date:</strong>{' '}
            {(isInvoice ? form.invoiceDate : form.receiptDate) || currentDate}
          </div>

          {!isInvoice && form.PaypalPayerID && (
            <>
              {form.PaypalPayerID && (
                <div>
                  <strong>PayPal PayerID:</strong> {form.PaypalPayerID}
                </div>
              )}
              {form.PaypalPaymentID && (
                <div>
                  <strong>PayPal PaymentID:</strong> {form.PaypalPaymentID}
                </div>
              )}
            </>
          )}
        </div>

        {isInvoice && (
          <div
            css={{
              display: 'flex',
              fontSize: 14,
              justifyContent: 'space-around',
              margin: '0 32px',
            }}
          >
            <div>
              <h4>FROM</h4>
              <div css={{ marginBottom: 12 }}>
                Upon receipt of this invoice,
                <br />
                please kindly remit payment to:
              </div>
              <div>
                <strong>Texas Music Administrators Conference</strong>
              </div>
              <div>c/o Jeff Turner</div>
              <div>Allen ISD</div>
              <div>Fine Arts Dept.</div>
              <div>300 Rivercrest Blvd. </div>
              <div>Allen, TX 75002</div>
            </div>

            <div>
              <h4>TO</h4>
              <div>{form.District || sponsorOrganizationName}</div>
              <div>Accounts Payable</div>
            </div>
          </div>
        )}

        <div
          css={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 32,
          }}
        >
          <InvoiceTable
            amount={amount}
            form={form}
            isActive={isActive}
            isInvoice={isInvoice}
            sponsorLevel={sponsorLevel}
          />

          <div
            css={{
              margin: '64px 32px',
              textAlign: 'center',
            }}
          >
            {isInvoice ? (
              <span>
                Make all checks payable to:
                <br />
                <strong>Texas Music Administrators Conference (TMAC)</strong>
              </span>
            ) : (
              <strong>
                Thank you for {sponsorLevel ? 'sponsoring' : 'joining'} TMAC for the{' '}
                {currentSchoolYearLong} school year!
              </strong>
            )}
          </div>
        </div>

        <footer
          css={{
            fontSize: 12,
            margin: '12px 48px',
            textAlign: 'center',
          }}
        >
          The Texas Music Administrators Conference is an organization supporting music educators,
          music administrators, and Texas schools in the quest to deliver music and arts education
          to all students.
        </footer>
      </section>
    );
  }
}

Invoice.propTypes = propTypes;
Invoice.defaultProps = defaultProps;

export default Invoice;
