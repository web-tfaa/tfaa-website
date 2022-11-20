// External Dependencies
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';

// Local Variables
const propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  active: {
    fontWeight: 700,
  },
});

const rows = [
  { id: 'SponsorOrganization', disablePadding: true, label: 'Organization' },
  { id: 'SponsorLevel', disablePadding: false, label: 'Level' },
  { id: 'OrganizationContactName', disablePadding: true, label: 'Contact Name' },
  { id: 'Title', disablePadding: false, label: 'Title' },
  { id: 'Email', disablePadding: false, label: 'Email' },
];

// Local Components
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.table.header,
    color: theme.palette.common.black,
    fontWeight: 500,
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
const SponsorTableHead = ({
  isAdmin,
  onRequestSort,
  order,
  orderBy,
}) => {
  const classes = useStyles();

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

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
                classes={{ active: classes.active }}
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

SponsorTableHead.propTypes = propTypes;

export default SponsorTableHead;
