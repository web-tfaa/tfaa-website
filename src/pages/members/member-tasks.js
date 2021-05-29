// External Dependencies
import AnnouncementIcon from '@material-ui/icons/Announcement';
import CheckIcon from '@material-ui/icons/Check';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { green, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';

// Internal Dependencies
import Card from '../../components/shared/cards/card';
import CtaButton from '../../components/masthead/cta-button';
import FuturaAnchor from '../../components/shared/FuturaAnchor';
import FuturaDiv from '../../components/shared/futura-div';
import Invoice from '../../components/register/invoice';
import RegisterButton from '../../components/register/register-button';
import { currentSchoolYearLong } from '../../utils/helpers';
import CardSubtitle from '../../components/shared/CardSubtitle';

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
    receiptId: PropTypes.number,
  }),
  isRegisteredForCurrentYear: PropTypes.bool.isRequired,
};

const defaultProps = {
  currentUser: null,
};

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    marginTop: theme.spacing(2),
  },
  hidden: {
    display: 'none',
  },
}));

// Component Definition
const MemberTasks = ({
  currentUser,
  isRegisteredForCurrentYear,
}) => {
  const classes = useStyles();

  const printInvoiceRef = useRef();
  const printReceiptRef = useRef();

  const registeredIcon = isRegisteredForCurrentYear ? (
    <CheckIcon htmlColor={green[700]} />
  ) : (
    <AnnouncementIcon htmlColor={red[500]} />
  );

  const invoiceInfo = currentUser && (
    <FuturaDiv>
      <h5>Need a copy of your invoice?</h5>
      If you need to pay via invoice please send payment to the TMAC Treasurer as indicated on your
      invoice.
      <div className={classes.buttonContainer}>
        <ReactToPrint
          content={() => printInvoiceRef.current}
          trigger={() => <RegisterButton isRed>Print Invoice</RegisterButton>}
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
    </FuturaDiv>
  );

  const receiptInfo = currentUser && (
    <FuturaDiv>
      <p>
        Thank you for joining TMAC for the {currentSchoolYearLong} school year!
      </p>

      <h5>Need a copy of your receipt?</h5>

      <div className={classes.buttonContainer}>
        <ReactToPrint
          content={() => printReceiptRef.current}
          trigger={() => (
            <RegisterButton>
              Print Receipt
            </RegisterButton>
          )}
        />
      </div>

      <div className={classes.hidden}>
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

  const isInvoiced = currentUser && currentUser.PaymentOption.toLowerCase() === 'invoiced';

  const isPaypal = currentUser && currentUser.PaymentOption.toLowerCase() === 'paypal';

  return (
    <Card>
      <CardSubtitle>
        Tasks for {currentSchoolYearLong} school year
      </CardSubtitle>

      <FuturaDiv
        render={() => (
          <div>
            {registeredIcon}
            Register for {currentSchoolYearLong} school year
          </div>
        )}
      />

      {!isRegisteredForCurrentYear && (
        <CtaButton
          buttonColor="blue"
          to="/members/join"
        >
          Join TMAC
        </CtaButton>
      )}

      {isInvoiced && invoiceInfo}

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
    </Card>
  );
};

MemberTasks.propTypes = propTypes;
MemberTasks.defaultProps = defaultProps;

export default MemberTasks;
