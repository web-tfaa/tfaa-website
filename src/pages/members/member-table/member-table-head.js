// External Dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';

// Material-UI Dependencies
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

// Local Variables
const propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};

const rows = [
  { id: 'FirstName', disablePadding: true, label: 'First Name' },
  { id: 'LastName', disablePadding: false, label: 'Last Name' },
  { id: 'District', disablePadding: false, label: 'District' },
  { id: 'Title', disablePadding: false, label: 'Title' },
  { id: 'Email', disablePadding: false, label: 'Email' },
];

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
    fontSize: 14,
    '&:first-child': {
      paddingLeft: 24,
    },
  },
}))(TableCell);

// Component Definition
class EnhancedTableHead extends Component {
  createSortHandler = property => (event) => {
    const {
      onRequestSort,
    } = this.props;

    onRequestSort(event, property);
  };

  render() {
    const {
      isAdmin,
      order,
      orderBy,
    } = this.props;

    if (isAdmin && rows.length === 5) {
      rows.push(
        { id: 'Actions', disablePadding: false, label: 'Actions' },
      );
    }

    return (
      <TableHead>
        <TableRow>
          {rows.map((row) => {
            return (
              <CustomTableCell
                key={row.id}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  enterDelay={300}
                  placement="bottom-start"
                  title="Sort"
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </CustomTableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = propTypes;

export default EnhancedTableHead;
