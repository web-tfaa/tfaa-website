// External Dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Material-UI Dependencies
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

// Internal Dependencies
import EnhancedTableHead from './member-table-head';

// Local Variables
const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  table: {
    marginBottom: 0,
    minWidth: 200,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

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
    classes: PropTypes.shape({}).isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleRequestSort = (event, property) => {
    const {
      orderBy,
      order,
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

  render() {
    const {
      classes,
      data,
    } = this.props;

    const {
      order,
      orderBy,
      page,
      rowsPerPage,
    } = this.state;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
            />
            <TableBody>
              {data && data.length > 0 && stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => (
                  <TableRow
                    className={classes.row}
                    // eslint-disable-next-line
                    key={`${user.FirstName}-${index}`}
                  >
                    <CustomTableCell component="th" scope="row" padding="none">{user.FirstName}</CustomTableCell>
                    <CustomTableCell>{user.LastName}</CustomTableCell>
                    <CustomTableCell>{user.District}</CustomTableCell>
                    <CustomTableCell>{user.Title}</CustomTableCell>
                    <CustomTableCell>{uglifyEmail(user.Email)}</CustomTableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data ? data.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
       />
      </Paper>
    );
  }
}

export default withStyles(styles)(MemberListTable);
