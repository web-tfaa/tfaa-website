// External Dependencies
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import React, { FC, useCallback } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import { Order } from '.';
import { Sponsor } from '../../../../utils/hooks/useGetSponsorData';

// Local Typings
interface Props {
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
  { id: 'LogoUrl', disablePadding: false, label: 'Logo URL' },
];

// Component Definition
const SponsorTableHead: FC<Props> = ({
  onRequestSort,
  order,
  orderBy,
}) => {
  const createSortHandler = useCallback((property) => (event) => {
    onRequestSort(event, property);
  }, [onRequestSort]);

  return (
    <TableHead sx={{ width: '100%' }}>
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
