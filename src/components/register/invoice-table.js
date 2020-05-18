// External Dependencies
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/styles';

// Internal Dependencies
import CustomTableCell from '../shared/CustomTableCell';
import { currentSchoolYearLong } from '../../utils/helpers';

// Local Variables
const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    marginLeft: 32,
    marginRight: 32,
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    marginBottom: 0,
    minWidth: 200,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}));

// Component Definition
const InvoiceTable = ({
  amount,
  form,
  isActive,
  isInvoice,
  sponsorLevel,
}) => {
  const classes = useStyles();

  // Work out the correct amount
  const isString = typeof amount === 'string';
  const updatedAmount = amount === 0 ? 50 : amount;

  const sponsorInfo = (
    <span>
      TMAC {sponsorLevel} Sponsor donation amount{' '}
      <br />for <strong>{form.SponsorOrganization}</strong>
    </span>
  );

  const memberInfo = (
    <span>
      TMAC {isActive || !form.MemberType ? 'Active' : 'Retired'} registration fee{' '}
      <br />for <strong>{form.FirstName} {form.LastName}</strong>
    </span>
  );

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Description</CustomTableCell>
            <CustomTableCell align="right">Total{!isInvoice && ' Paid'}</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={classes.row}>
            <CustomTableCell component="th" scope="row">
              {sponsorLevel ? sponsorInfo : memberInfo}
              <br />
              for the {currentSchoolYearLong} school year.
            </CustomTableCell>
            <CustomTableCell align="right">
              {isString ? updatedAmount : `$${updatedAmount.toFixed(2).toLocaleString()}`}
            </CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

InvoiceTable.propTypes = {
  amount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  form: PropTypes.shape({}).isRequired,
  isInvoice: PropTypes.bool.isRequired,
  isActive: PropTypes.bool,
  sponsorLevel: PropTypes.string,
};
InvoiceTable.defaultProps = {
  isActive: false,
  sponsorLevel: '',
};

export default InvoiceTable;
