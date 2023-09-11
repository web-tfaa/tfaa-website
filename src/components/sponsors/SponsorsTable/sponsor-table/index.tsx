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
import { Sponsor } from '../../../../utils/hooks/useGetSponsorData';;
import SponsorTableHead from './sponsor-table-head';
import SponsorTableRowActionElements from './SponsorTableRowActionElements';

// Local Typings
interface Props {
  data: Sponsor[] | null;
  isAdmin: boolean;
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
    minWidth: 200,
  },

  marginTop: theme.spacing(3),
  width: '98%',
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

function getComparator<Key extends keyof Sponsor>(
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

// Component Definition
const SponsorTable: FC<Props> = ({
  data,
  isAdmin,
}) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Sponsor>('SponsorOrganization');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Sponsor,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  if (!data) {
    return null;
  }

  return (
    <StyledRoot variant="outlined">
      <div className="overflowWrapper">
        {data.length > 0 ? (
          <Table className="table">
            <SponsorTableHead
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
                      key={user.SponsorOrganization}
                      padding="none"
                      scope="row"
                    >
                      {user.SponsorOrganization}
                    </TableCell>

                    <TableCell
                      className="cell"
                      key={user.SponsorLevel}
                    >
                      {user.SponsorLevel}
                    </TableCell>

                    <TableCell
                      className="cell"
                      key={user.OrganizationContactName}
                    >
                      {user.OrganizationContactName}
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
                      {user.Email}
                    </TableCell>

                    {isAdmin && (
                      <TableCell className="cell">
                        <SponsorTableRowActionElements user={user} />
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <div className="empty">
            No sponsors for the current school year
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

export default SponsorTable;
