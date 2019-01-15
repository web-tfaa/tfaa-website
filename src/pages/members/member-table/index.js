// External Dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Material-UI Dependencies
import Receipt from '@material-ui/icons/Receipt';
import Print from '@material-ui/icons/Print';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

// Internal Dependencies
import MemberTableHead from './member-table-head';

// Local Functions
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function uglifyEmail(email) {
  const index = email.indexOf('@');

  // Remove it & insert -at- back in → Array.prototype.splice()
  const uglyEmailArray = email.split('');

  uglyEmailArray.splice(index, 1, '-at-');

  return uglyEmailArray.join('');
}

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
    '&:first-child': {
      paddingLeft: 24,
    },
  },
}))(TableCell);


// Component Definition
class MemberListTable extends Component {
  static propTypes = {
    // classes: PropTypes.shape({}).isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    isAdmin: PropTypes.bool.isRequired,
  };

  state = {
    order: 'asc',
    orderBy: 'LastName',
    page: 0,
    rowsPerPage: 5,
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleRequestSort = (event, property) => {
    const {
      order,
      orderBy,
    } = this.state;

    let newOrder = 'desc';

    if (orderBy === property && order === 'desc') {
      newOrder = 'asc';
    }

    this.setState({
      order: newOrder,
      orderBy: property,
    });
  };

  getActionElements = (paymentOption) => {
    const actionElements = [];

    const receiptElement = (
      <Tooltip
        key="print-receipt"
        title="Print Receipt"
      >
        <IconButton
          onClick={() => console.log('clicked print receipt')}
          style={{
            height: 32,
            width: 32,
          }}
        >
          <Receipt />
        </IconButton>
      </Tooltip>
    );

    const invoiceElement = (
      <Tooltip
        key="print-invoice"
        title="Print Invoice"
      >
        <IconButton
          onClick={() => console.log('clicked print invoice')}
          style={{
            height: 32,
            width: 32,
          }}
        >
          <Print />
        </IconButton>
      </Tooltip>
    );

    if (paymentOption.toLowerCase() === 'paypal') {
      actionElements.push(receiptElement);
    } else {
      actionElements.push(invoiceElement);
    }

    return actionElements;
  };

  render() {
    const {
      // classes,
      data,
      isAdmin,
    } = this.props;

    const {
      order,
      orderBy,
      page,
      rowsPerPage,
    } = this.state;

    return (
      <Paper
        css={{
          marginTop: 24,
          width: '100%',
        }}
      >
        <div
          css={{
            overflowX: 'auto',
          }}
        >
          {data && data.length > 0
            ? (
              <Table
                css={{
                  marginBottom: 0,
                  minWidth: 200,
                }}
              >
                <MemberTableHead
                  isAdmin={isAdmin}
                  onRequestSort={this.handleRequestSort}
                  order={order}
                  orderBy={orderBy}
                />
                <TableBody>
                  {data && data.length > 0 && stableSort(data, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => (
                      <TableRow
                        css={{
                          '&:nth-of-type(odd)': {
                            backgroundColor: 'rgba(0, 0, 0, 0,.87)',
                          },
                        }}
                        // eslint-disable-next-line
                        key={`${user.FirstName}-${index}`}
                      >
                        <CustomTableCell component="th" scope="row" padding="none">{user.FirstName}</CustomTableCell>
                        <CustomTableCell>{user.LastName}</CustomTableCell>
                        <CustomTableCell>{user.District}</CustomTableCell>
                        <CustomTableCell>{user.Title}</CustomTableCell>
                        <CustomTableCell>{uglifyEmail(user.Email)}</CustomTableCell>
                        <CustomTableCell>{this.getActionElements(user && user.PaymentOption)}</CustomTableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            ) : <div css={{ padding: 32 }}>No members for the current school year</div>}
        </div>
        {data && data.length > 5 && (
          <TablePagination
            backIconButtonProps={{
              'aria-label': 'Previous Page',
              disabled: page === 0,
            }}
            component="div"
            count={data ? data.length : 0}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        )}
      </Paper>
    );
  }
}

export default MemberListTable;
