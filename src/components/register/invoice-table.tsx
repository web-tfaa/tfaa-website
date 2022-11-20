// External Dependencies
import { FC, useMemo } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import styled from '@emotion/styled';

// Internal Dependencies
import { currentSchoolYearLong } from '../../utils/helpers';

// Local Typings
interface Props {
  amount: number | string;
  form: {
    FirstName: string;
    LastName: string;
    MemberType: string;
    SponsorOrganization: string;
  };
  isActive?: boolean;
  isInvoice: boolean;
  sponsorLevel?: string,
}

// Local Variables
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  '.body-cell': {
    fontSize: 14,
    '&:first-child': {
      paddingLeft: theme.spacing(2),
    },
    '&:nth-child(2)': {
      paddingRight: theme.spacing(2),
    },
  },
  '.header-cell': {
    backgroundColor: theme.palette.table.header,
    color: theme.palette.common.black,
    fontWeight: 600,
    '&:first-child': {
      paddingLeft: theme.spacing(2),
    },
    '&:nth-child(2)': {
      paddingRight: theme.spacing(2),
    },
  },
  '.invoice-table': {
    border: `2px solid ${theme.palette.grey[600]}`,
    marginBottom: 0,
    minWidth: 200,
    paddingRight: theme.spacing(1),
  },
  '.invoice-row': {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    paddingRight: theme.spacing(1),
  },

  marginLeft: 32,
  marginRight: 32,
  marginTop: theme.spacing(2),
  width: '75%',
}));

// Component Definition
const InvoiceTable: FC<Props> = ({
  amount,
  form,
  isActive,
  isInvoice,
  sponsorLevel,
}) => {
  // Work out the correct amount
  const isString = typeof amount === 'string';
  const updatedAmount = amount === 0 ? 50 : amount;
  const formattedAmount = isString ? updatedAmount : `$${Number(updatedAmount)?.toFixed(2).toLocaleString()}`;

  const sponsorInfo = useMemo(() => (
    <span>
      TMAC {sponsorLevel} Sponsor donation amount{' '}
      <br />for <strong>{form.SponsorOrganization}</strong>
    </span>
  ), [form.SponsorOrganization, sponsorLevel]);

  const memberInfo = useMemo(() => (
    <span>
      TMAC {isActive || !form.MemberType ? 'Active' : 'Retired'} membership fee{' '}
      <br />for <strong>{form.FirstName} {form.LastName}</strong>
    </span>
  ), [form.FirstName, form.LastName, form.MemberType, isActive]);

  return (
    <StyledTableContainer component={Paper}>
      <Table className="invoice-table">
        <TableHead>
          <TableRow>
            <TableCell className="header-cell">Description</TableCell>

            <TableCell
              align="right"
              className="header-cell"
            >
              Total{!isInvoice && ' Paid'}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow className="invoice-row">
            <TableCell
              className="body-cell"
              component="th"
              scope="row"
            >
              {sponsorLevel ? sponsorInfo : memberInfo}
              <br />
              for the {currentSchoolYearLong} school year.
            </TableCell>

            <TableCell
              align="right"
              className="body-cell"
            >
              {formattedAmount}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default InvoiceTable;
