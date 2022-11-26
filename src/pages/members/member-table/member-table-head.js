// External Dependencies
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import styled from 'styled-components';

// Local Variables
const propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '.active': {
    fontWeight: 700,
  },

  '&:first-child': {
    paddingLeft: 24,
  },

  backgroundColor: theme.palette.table.header,
  color: theme.palette.common.black,
  fontWeight: 500,
}));

const rows = [
  { id: 'FirstName', disablePadding: true, label: 'First Name' },
  { id: 'LastName', disablePadding: false, label: 'Last Name' },
  { id: 'District', disablePadding: false, label: 'District' },
  { id: 'Title', disablePadding: false, label: 'Title' },
  { id: 'Email', disablePadding: false, label: 'Email' },
];

// Component Definition
const MemberTableHead = ({
  isAdmin,
  onRequestSort,
  order,
  orderBy,
}) => {
  const createSortHandler = useCallback((property) => (event) => {
    onRequestSort(event, property);
  }, [onRequestSort]);

  if (isAdmin && rows.length === 5) {
    rows.push(
      { id: 'Actions', disablePadding: false, label: 'Actions' },
    );
  }

  return (
    <TableHead>
      <TableRow key="table-head">
        {rows.map((row) => (
          <StyledTableCell
            key={`${row.id}=${row.label}`}
            padding={row.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <Tooltip
              enterDelay={300}
              placement="bottom-start"
              title="Sort"
            >
              <TableSortLabel
                active={orderBy === row.id}
                classes={{ active: 'active' }}
                direction={order}
                disabled={row.id === 'Actions'}
                onClick={createSortHandler(row.id)}
              >
                {row.label}
              </TableSortLabel>
            </Tooltip>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

MemberTableHead.propTypes = propTypes;

export default MemberTableHead;
