// External Dependencies
import Box from '@mui/material/Box';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { appName, appNameShort } from '../../utils/app-constants';
import {
  currentSchoolYearLong,
} from '../../utils/helpers';
import FormDivider from '../shared/FormDivider';
import InvoiceTable from './invoice-table';

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.bodyMessage': {
    margin: theme.spacing(8, 4, 6),
    textAlign: 'center',
  },

  '.invoiceContentWrapper': {
    display: 'flex',
    fontSize: 14,
    justifyContent: 'space-around',
    margin: theme.spacing(0, 3),
  },

  '.tableContainer': {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(4, 2, 0),
  },

  footer: {
    fontSize: 12,
    margin: theme.spacing(1.5, 6),
    textAlign: 'center',
  },

  header: {
    background: theme.palette.table.background,
    height: 96,
    padding: theme.spacing(1),
  },

  border: `1px solid ${theme.palette.ui.borderBlue}`,
  height: 980,
  margin: 24,
  width: 776,
}));

const propTypes = {
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  form: PropTypes.shape({
    District: PropTypes.string,
    invoiceDate: PropTypes.string,
    receiptDate: PropTypes.string,
  }).isRequired,
  invoiceId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isActive: PropTypes.bool,
  isOnlyForFallConference: PropTypes.bool,
  isInvoice: PropTypes.bool.isRequired,
  receiptId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sponsorLevel: PropTypes.string,
  sponsorOrganizationName: PropTypes.string,
};

const defaultProps = {
  invoiceId: 1,
  isActive: true,
  isOnlyForFallConference: false,
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
      isOnlyForFallConference,
      receiptId,
      sponsorLevel,
      sponsorOrganizationName,
      ...otherProps
    } = this.props;

    const dateToShow = typeof form.invoiceDate !== 'object' && isInvoice
      ? form.invoiceDate
      : typeof form.receiptDate !== 'object' && !isInvoice
        ? form.receiptDate
        : currentDate;

    return (
      <StyledRoot
        id="invoice-container"
        {...otherProps}
      >
        <header>
          <img
            alt={`${appNameShort} logo`}
            height="60px"
            src="https://res.cloudinary.com/tmac/image/upload/v1670094162/tfaa-logo.png"
            style={{ position: 'absolute', top: 40 }}
          />
          <Box
            component="h2"
            sx={{ margin: 0, textAlign: 'right' }}
          >
            {isInvoice ? 'INVOICE' : 'RECEIPT'}
          </Box>
        </header>

        <FormDivider />

        <Box sx={{ fontSize: 16, margin: '0 32px' }}>
          <h3>{appName}</h3>

          <Box
            marginBottom={1.5}
            sx={{ fontSize: 14 }}
          >
            <em>&quot;...equipping leaders to advance high-quality fine arts education for all.&quot;</em>
          </Box>

          <div>
            <strong>{isInvoice ? 'Invoice' : 'Receipt'}#:</strong> {currentSchoolYearLong}_
            {isInvoice ? invoiceId : receiptId}
          </div>

          <div>
            <strong>Date:</strong>{' '}
            {dateToShow}
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
        </Box>

        {isInvoice && (
          <div className="invoiceContentWrapper">
            <div>
              <h4>FROM</h4>

              <Box
                component="p"
                marginBottom={1.5}
              >
                Upon receipt of this invoice,
                <br />
                please kindly remit payment to:
              </Box>

              <div>
                <strong>{appName}</strong>
              </div>

              <div>c/o Peter Warshaw</div>
              <div>{appNameShort} Executive Secretary</div>
              <div>4107 Natural Bridge Court</div>
              <div>Round Rock, TX. 78681</div>
            </div>

            <div>
              <h4>TO</h4>
              <div>{form.District || sponsorOrganizationName}</div>
              <div>Accounts Payable</div>
            </div>
          </div>
        )}

        <div className="tableContainer">
          <InvoiceTable
            amount={amount}
            form={form}
            isActive={isActive}
            isInvoice={isInvoice}
            isOnlyForFallConference={isOnlyForFallConference}
            sponsorLevel={sponsorLevel}
          />

          <div className="bodyMessage">
            {isInvoice ? (
              <span>
                Make all checks payable to:
                <br />
                <strong>{appName} ({appNameShort})</strong>
              </span>
            ) : (
              <strong>
                Thank you for {sponsorLevel ? 'sponsoring' : 'joining'} {appNameShort} for the{' '}
                {currentSchoolYearLong} school year!
              </strong>
            )}
          </div>
        </div>

        <footer>
          The {appName} is an organization supporting music educators,
          music administrators, and Texas schools in the quest to deliver music and arts education
          to all students.
        </footer>
      </StyledRoot>
    );
  }
}

Invoice.propTypes = propTypes;
Invoice.defaultProps = defaultProps;

export default Invoice;
