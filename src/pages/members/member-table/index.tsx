// External Dependencies
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { FC, useState } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { TfaaMemberData } from '../../../utils/hooks/useGetAllMembers'
import EnhancedAlert from '../../../components/shared/EnhancedAlert';
import MemberTableHead from './member-table-head';
import MemberTableRowActionElements from './MemberTableRowActionElements';

// Local Typings
interface Props {
  data: TfaaMemberData[] | null;
  isAdmin: boolean;
  noAuthUser: boolean;
}

export type Order = 'asc' | 'desc';

// Local Variables
const StyledRoot = styled(Paper)(({ theme }) => ({
  '.MuiToolbar-root': {
    display: 'flex',
    alignItems: 'baseline',
  },

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
    width: '100%',
  },

  '.pagerButton': {
    color: theme.palette.grey['600'],
    marginRight: theme.spacing(1),
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
    width: 1000,
    // overflow: 'scroll',
  },

  margin: theme.spacing(3, 0),
  // width: '100%',
}));

// Local Functions
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof TfaaMemberData>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function uglifyEmail(email: string) {
  if (!email) {
    return '';
  }
  const index = email.indexOf('@');

  // Remove it & insert -at- back in → Array.splice()
  const uglyEmailArray = email.split('');

  uglyEmailArray.splice(index, 1, '-at-');

  return uglyEmailArray.join('');
}

// Component Definition
const MemberTable: FC<Props> = ({
  data,
  isAdmin,
  noAuthUser,
}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('LastName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof TfaaMemberData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  if (noAuthUser && !data) {
    return (
      <EnhancedAlert
        severity="info"
        title="Not Authorized"
      >
        Sign in to the view the current member list
      </EnhancedAlert>
    );
  }

  if (!data) {
    return null;
  }

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
            disabled: page === 0,
            classes: { root: 'pagerButton' },
            id: 'pager-button-left',
          }}
          component="div"
          count={data ? data.length : 0}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
            classes: { root: 'pagerButton' },
            disabled: page - 1 === Math.ceil(data.length / rowsPerPage),
            id: 'pager-button-right',
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      )}
    </StyledRoot>
  );
};

export default MemberTable;
