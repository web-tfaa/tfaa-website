// External Dependencies
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import React, { FC, useCallback, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import styled from 'styled-components';
import { navigate } from 'gatsby';

// Internal Dependencies
import { Sponsor } from '../../../../utils/hooks/useGetSponsorData';;
import SponsorTableHead from './sponsor-table-head';

// Local Typings
interface Props {
  data: Sponsor[] | null;
}
export type Order = 'asc' | 'desc';

// Local Variables
const StyledRoot = styled(Paper)(({ theme }) => ({
  '.MuiToolbar-root': {
    display: 'flex',
    alignItems: 'center',
  },

  '.cell': {
    '&:first-child': {
      paddingLeft: theme.spacing(3),
    },
    fontFeatureSettings: 'inherit',
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
  width: '100%',
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

  const handlePressAddSponsor = useCallback(() => {
    navigate('/sponsors/new');
  }, []);

  if (!data) {
    return null;
  }

  return (
    <StyledRoot variant="outlined">
      <div className="overflowWrapper">
        <Toolbar>
          <Button
            onClick={handlePressAddSponsor}
            startIcon={<AddIcon />}
            size="small"
            variant="outlined"
          >
            Add Sponsor
          </Button>
        </Toolbar>

        {data.length > 0 ? (
          <Table className="table">
            <SponsorTableHead
              onRequestSort={handleRequestSort}
              order={order}
              orderBy={orderBy}
            />

            <TableBody>
              {data.sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((sponsor) => (
                  <TableRow
                    className="row"
                    key={sponsor.userId}
                  >
                    <TableCell
                      className="cell"
                      component="th"
                      key={sponsor.SponsorOrganization}
                      padding="none"
                      scope="row"
                    >
                      {sponsor.SponsorOrganization}
                    </TableCell>

                    <TableCell
                      className="cell"
                      key={sponsor.SponsorLevel}
                    >
                      {sponsor.SponsorLevel}
                    </TableCell>

                    <TableCell
                      className="cell"
                      key={sponsor.OrganizationWebsiteAddress}
                    >
                      {sponsor.OrganizationWebsiteAddress}
                    </TableCell>

                    <TableCell
                      className="cell"
                      key={sponsor.LogoUrl}
                    >
                      <a
                        href={sponsor.LogoUrl}
                        rel="noreferrer noopener"
                        style={{ fontWeight: 500 }}
                        target="_blank"
                      >
                        link to image
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <div className="empty">
            No sponsors for the current year
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
