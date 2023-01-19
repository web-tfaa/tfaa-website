// External Dependencies
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

// Internal Dependencies
import { currentSchoolYearLong } from '../../utils/helpers';
import Card from '../../components/shared/cards/card';
import CardSubtitle from '../../components/shared/CardSubtitle';
import CtaButton from '../../components/masthead/cta-button';
import FuturaAnchor from '../../components/shared/FuturaAnchor';
import FuturaDiv from '../../components/shared/futura-div';
import Invoice from '../../components/register/invoice';
import PrintInvoiceUI from './PrintInvoiceUI';
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
  isRegisteredForCurrentYear: PropTypes.bool.isRequired,
};

const defaultProps = {
  currentUser: null,
};

const StyledCard = styled(Card)(({ theme }) => ({
  '.buttonContainer': {
    marginTop: theme.spacing(2),
  },
  '.hidden': {
    display: 'none',
  },
}));

// Component Definition
const MemberTasks = ({
  currentUser,
  isRegisteredForCurrentYear,
}) => {
  const printReceiptRef = useRef();

  const receiptInfo = currentUser && (
    <FuturaDiv>
      <p>
        Thank you for joining TMAC for the {currentSchoolYearLong} school year!
      </p>

      <h5>Need a copy of your receipt?</h5>

      <div className="buttonContainer">
        <ReactToPrint
          content={() => printReceiptRef.current}
          trigger={() => (
            <RegisterButton green>
              Print Receipt
            </RegisterButton>
          )}
        />
      </div>

      <div className="hidden">
        <Invoice
          amount={currentUser.AmountPaid}
          form={currentUser}
          isActive={currentUser.MemberType === 'Active'}
          isInvoice={false}
          receiptId={currentUser.receiptId}
          ref={printReceiptRef}
        />
      </div>
    </FuturaDiv>
  );

  const isInvoiced = currentUser?.PaymentOption.toLowerCase() === 'invoiced';

  const isPaypal = currentUser?.PaymentOption.toLowerCase() === 'paypal';

  return (
    <StyledCard>
      <CardSubtitle>
        Tasks for {currentSchoolYearLong} school year
      </CardSubtitle>

      {!isRegisteredForCurrentYear && !isInvoiced && (
        <Box marginTop={4}>
          <CtaButton
            buttonColor="blue"
            to="/members/join"
          >
            Join TMAC
          </CtaButton>
        </Box>
      )}

      {isInvoiced && (
        <>
          <Typography variant="body2">
            If you need to pay via invoice, please send payment
            to the TMAC Treasurer as indicated on your
            invoice.
          </Typography>
          <PrintInvoiceUI currentUser={currentUser} />
        </>
      )}

      {isPaypal && receiptInfo}

      {isRegisteredForCurrentYear && (
        <>
          <FuturaDiv>
            If your district requires the IRS W-9 Form for TMAC, download or print a copy below.
          </FuturaDiv>

          <FuturaAnchor
            download
            href="https://res.cloudinary.com/tmac/image/upload/v1589767111/W-9__TMAC_Inc.pdf"
          >
            Download W-9
          </FuturaAnchor>
        </>
      )}
    </StyledCard>
  );
};

MemberTasks.propTypes = propTypes;
MemberTasks.defaultProps = defaultProps;

export default MemberTasks;
