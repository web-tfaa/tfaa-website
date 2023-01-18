// External Dependencies
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { useMediaQuery } from '@mui/material';
import { useTheme } from 'styled-components';

// Internal Dependencies
import Invoice from '../../components/register/invoice';
import RegisterButton from '../../components/register/register-button';

// Local Variables
const propTypes = {
  currentUser: PropTypes.shape({
    Address1: PropTypes.string,
    Address2: PropTypes.string,
    AmountPaid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    CellPhone: PropTypes.string,
    City: PropTypes.string,
    District: PropTypes.string,
    FirstName: PropTypes.string,
    LastName: PropTypes.string,
    MemberType: PropTypes.string,
    OfficePhone: PropTypes.string,
    PaymentOption: PropTypes.string,
    State: PropTypes.string,
    Title: PropTypes.string,
    ZipCode: PropTypes.string,
    invoiceId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    receiptId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
};

const defaultProps = {
  currentUser: null,
};

// Component Definition
const PrintInvoiceUI = ({ currentUser }) => {
  const theme = useTheme();
  const printInvoiceRef = useRef();

  const isTabletOrSmallerScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (!currentUser) {
    return null;
  }

  const buttonText = `View${!isTabletOrSmallerScreen ? ' Invoice' : ''}`;

  return (
    <div>
      <div className="buttonContainer">
        <ReactToPrint
          content={() => printInvoiceRef.current}
          trigger={() => (
            <RegisterButton green>
              {buttonText}
            </RegisterButton>
          )}
        />
      </div>

      <div style={{ display: 'none' }}>
        <Invoice
          amount={currentUser.AmountPaid}
          form={currentUser}
          invoiceId={currentUser.invoiceId}
          isActive={currentUser.MemberType === 'Active'}
          isInvoice
          ref={printInvoiceRef}
        />
      </div>
    </div>
  );
};

PrintInvoiceUI.propTypes = propTypes;
PrintInvoiceUI.defaultProps = defaultProps;

export default PrintInvoiceUI;
