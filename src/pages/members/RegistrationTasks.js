// External Dependencies
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import styled, { useTheme } from 'styled-components';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

// Internal Dependencies
import { currentSchoolYearLong } from '../../utils/helpers';
import Card from '../../components/shared/cards/card';
import CardSubtitle from '../../components/shared/CardSubtitle';
import CtaButton from '../../components/masthead/cta-button';
import FuturaDiv from '../../components/shared/futura-div';
import Invoice from '../../components/register/invoice';
import RegisterButton from '../../components/register/register-button';

// Local Variables
const propTypes = {
  currentMemberData: PropTypes.shape({
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
  currentMemberData: null,
};

const StyledRoot = styled(Card)(({ theme }) => ({
  '.buttonContainer': {
    marginTop: theme.spacing(2),
  },
  '.listItemIcon': {
    height: 20,
    marginLeft: theme.spacing(1),
    transform: 'translateY(4px)',
    width: 20,
  },
  '.hidden': {
    display: 'none',
  },
  '.listItemSecondaryText': {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
    maxWidth: '80%',
  },
  '.listItemText': {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.9rem',
      maxWidth: '70%',
    },
    fontSize: '1rem',
    fontWeight: 500,
  },
  '.paymentListItem': {
    '&:not(:first-child)': {
      marginTop: theme.spacing(1),
    },
    marginBottom: 0,
  },
}));

// Component Definition
const RegistrationTasks = ({
  currentMemberData,
  isRegisteredForCurrentYear,
}) => {
  const theme = useTheme();
  const printReceiptRef = useRef();

  const needsToPay = !currentMemberData?.AmountPaid;

  const successIconElement = (
    <CheckCircleIcon
      className="listItemIcon"
      fontSize="small"
      htmlColor={theme.palette.success.main}
    />
  );

  const warningIconElement = (
    <ErrorIcon
      className="listItemIcon"
      fontSize="small"
      htmlColor={theme.palette.warning.light}
    />
  );

  const receiptInfo = currentMemberData && (
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
          amount={currentMemberData.AmountPaid}
          form={currentMemberData}
          isActive={currentMemberData.MemberType === 'Active'}
          isInvoice={false}
          receiptId={currentMemberData.receiptId}
          ref={printReceiptRef}
        />
      </div>
    </FuturaDiv>
  );

  const isPaypal = currentMemberData?.PaymentOption.toLowerCase() === 'paypal';

  return (
    <StyledRoot>
      <CardSubtitle>
        Registration tasks
      </CardSubtitle>

      <List sx={{ marginTop: 1.5 }}>
        <ListItem className="paymentListItem">
          <ListItemText
            classes={{
              primary: 'listItemText',
              secondary: 'listItemSecondaryText',
            }}
            primary={(
              <>
                Register
                {isRegisteredForCurrentYear && successIconElement}
              </>
            )}
            secondary={
              isRegisteredForCurrentYear
                ? 'You are registered — thanks for being a member!'
                : 'Become a member for the current school year.'
}
          />

          {!isRegisteredForCurrentYear && (
            <ListItemSecondaryAction>
              <CtaButton
                buttonColor="blue"
                to="/members/join"
              >
                Register
              </CtaButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>

        <ListItem className="paymentListItem">
          <ListItemText
            classes={{
              primary: 'listItemText',
              secondary: 'listItemSecondaryText',
            }}
            primary={(
              <>
                Pay Membership Dues
                {isRegisteredForCurrentYear && !needsToPay && successIconElement}
                {isRegisteredForCurrentYear && needsToPay && warningIconElement}
              </>
            )}
            secondary={
              isRegisteredForCurrentYear && !needsToPay
                ? 'You have already paid your dues for the current school year.'
                : 'Pay online using credit card or send payment with invoice.'
}
          />
        </ListItem>

        {isRegisteredForCurrentYear && (
          <ListItem className="paymentListItem">
            <ListItemText
              classes={{
                primary: 'listItemText',
                secondary: 'listItemSecondaryText',
              }}
              primary="Download W-9 Form"
              secondary="If your district requires an IRS W-9 Form for TMAC, download or print a copy."
            />

            <ListItemSecondaryAction>
              <CtaButton
                buttonColor="blue"
                to="https://res.cloudinary.com/tmac/image/upload/v1589767111/W-9__TMAC_Inc.pdf"
              >
                Download
              </CtaButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </List>

      {isPaypal && receiptInfo}
    </StyledRoot>
  );
};

RegistrationTasks.propTypes = propTypes;
RegistrationTasks.defaultProps = defaultProps;

export default RegistrationTasks;
