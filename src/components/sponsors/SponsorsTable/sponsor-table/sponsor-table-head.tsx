// External Dependencies
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@mui/material';
import React, { FC, useCallback } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { Order } from '.';
import { Sponsor } from '../../../../utils/hooks/useGetSponsorData';

// Local Typings
interface Props {
  isAdmin: boolean;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Sponsor) => void;
  order: Order;
  orderBy: string;
}

// Local Variables
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
  fontFeatureSettings: 'inherit',
}));

const rows = [
  { id: 'SponsorOrganization', disablePadding: true, label: 'Organization' },
  { id: 'SponsorLevel', disablePadding: false, label: 'Level' },
  { id: 'OrganizationWebsiteAddress', disablePadding: false, label: 'Website' },
  { id: 'OrganizationContactName', disablePadding: true, label: 'Contact Name' },
  { id: 'Title', disablePadding: false, label: 'Title' },
  { id: 'Email', disablePadding: false, label: 'Email' },
];

// Component Definition
const SponsorTableHead: FC<Props> = ({
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

export default SponsorTableHead;
