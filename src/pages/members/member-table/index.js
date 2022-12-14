// External Dependencies
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import MemberTableHead from './member-table-head';
import MemberTableRowActionElements from './MemberTableRowActionElements';

// Local Variables
const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

const StyledRoot = styled(Paper)(({ theme }) => ({
  '.cell': {
    '&:first-child': {
      paddingLeft: theme.spacing(3),
    },
  },

  '.empty': {
    padding: theme.spacing(4),
  },

  '.overflowWrapper': {
    overflowX: 'auto',
  },

  '.pagerButton': {
    backgroundColor: theme.palette.grey['300'],
    color: theme.palette.grey['600'],
    marginRight: theme.spacing(1),

    '&:disabled': {
      backgroundColor: theme.palette.action.disabled,
    },
  },

  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'rgba(0, 0, 0, 0,.87)',
    },

    '& td:last-child': {
      paddingRight: theme.spacing(3),
    }
  },

  '.table': {
    marginBottom: 0,
    minWidth: 200,
  },

  marginTop: theme.spacing(3),
  width: '100%',
}));

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

// function stableSort(array, cmp) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = cmp(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });

//   return stabilizedThis.map((el) => el[0]);
// }

function getComparator(
  order,
  orderBy,
) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function uglifyEmail(email) {
  if (!email) {
    return '';
  }
  const index = email.indexOf('@');

  // Remove it & insert -at- back in → Array.prototype.splice()
  const uglyEmailArray = email.split('');

  uglyEmailArray.splice(index, 1, '-at-');

  return uglyEmailArray.join('');
}

// Component Definition
const MemberTable = ({
  data,
  isAdmin,
}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('LastName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  if (!data) {
    return null;
  }

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (_event, property) => {
    let newOrder = 'desc';

    if (orderBy === property && order === 'desc') {
      newOrder = 'asc';
    }

    setOrder(newOrder);
    setOrderBy(property);
  };

  return (
    <StyledRoot variant="outlined">
      <div className="overflowWrapper">
        {data.length > 0 ? (
          <Table className="table">
            <MemberTableHead
              isAdmin={isAdmin}
              onRequestSort={handleRequestSort}
              order={order}
              orderBy={orderBy}
            />

            <TableBody>
              {data.sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow
                    className="row"
                    key={user.userId}
                  >
                    <TableCell
                      className="cell"
                      component="th"
                      key={user.FirstName}
                      padding="none"
                      scope="row"
                    >
                      {user.FirstName}
                    </TableCell>

                    <TableCell
                      className="cell"
                      key={user.LastName}
                    >
                      {user.LastName}
                    </TableCell>

                    <TableCell
                      className="cell"
                      key={user.District}
                    >
                      {user.District}
                    </TableCell>

                    <TableCell
                      className="cell"
                      key={user.Title}
                    >
                      {user.Title}
                    </TableCell>

                    <TableCell
                      className="cell"
                      key={user.Email}
                    >
                      {uglifyEmail(user.Email)}
                    </TableCell>

                    {isAdmin && (
                    <TableCell className="cell">
                      <MemberTableRowActionElements user={user} />
                    </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <div className="empty">
            No members for the current school year
          </div>
        )}
      </div>

      {data && data.length > 5 && (
        <TablePagination
          backIconButtonProps={{
            'aria-label': 'Previous Page',
            disabled: page === 1,
            classes: { root: 'pagerButton' },
            id: 'pager-button-left',
            size: 'small',
          }}
          component="div"
          count={data ? data.length : 0}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
            classes: { root: 'pagerButton' },
            id: 'pager-button-right',
            size: 'small',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      )}
    </StyledRoot>
  );
};

MemberTable.propTypes = propTypes;

export default MemberTable;
