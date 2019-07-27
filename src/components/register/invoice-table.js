// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';

// Material-UI Dependencies
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

// Internal Dependencies
import { currentSchoolYearLong } from '../../utils/helpers';

// Local Variables
const styles = theme => ({
  root: {
    width: '80%',
    marginLeft: 32,
    marginRight: 32,
    marginTop: theme.spacing.unit(3),
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
});

// Local Components
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#EDF2F8',
    color: theme.palette.common.black,
    fontWeight: 600,
    '&:first-child': {
      paddingLeft: 24,
    },
  },
  body: {
    fontSize: 14,
    '&:first-child': {
      paddingLeft: 24,
    },
  },
}))(TableCell);

// Component Definition
const InvoiceTable = (props) => {
  const {
    amount,
    classes,
    form,
    isActive,
    isInvoice,
    sponsorLevel,
  } = props;

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
  classes: PropTypes.shape({}).isRequired,
  form: PropTypes.shape({}).isRequired,
  isInvoice: PropTypes.bool.isRequired,
  isActive: PropTypes.bool,
  sponsorLevel: PropTypes.string,
};
InvoiceTable.defaultProps = {
  isActive: false,
  sponsorLevel: '',
};

export default withStyles(styles)(InvoiceTable);
