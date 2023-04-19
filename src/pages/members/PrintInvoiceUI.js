// External Dependencies
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

// Internal Dependencies
import CtaButton from '../../components/shared/CtaButton';
import Invoice from '../../components/register/invoice';

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
  const printInvoiceRef = useRef();

  if (!currentUser) {
    return null;
  }

  return (
    <div>
      <div className="buttonContainer">
        <ReactToPrint
          content={() => printInvoiceRef.current}
          trigger={() => (
            <CtaButton
              colorVariant="about"
              fontWeight={600}
            >
              Print Invoice
            </CtaButton>
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
