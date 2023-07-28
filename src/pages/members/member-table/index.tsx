// External Dependencies
import Box from '@mui/material/Box';
import React, { FC } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import styled from 'styled-components';

// Internal Dependencies
import { TfaaMemberData } from '../../../utils/hooks/useGetAllMembers'

// Local Dependencies
import { useColumns } from './hooks';
import EnhancedAlert from '../../../components/shared/EnhancedAlert';

// Local Typings
interface Props {
  data: TfaaMemberData[] | null;
  isAdmin: boolean;
  noAuthUser: boolean;
}

// Local Variables
const StyledBox = styled(Box)({
  '.MuiTablePagination-toolbar': {
    alignItems: 'baseline',
  }
});

// Component Definition
const MemberTable: FC<Props> = ({
  data,
  isAdmin,
  noAuthUser,
}) => {
  const columns = useColumns(isAdmin);

  if (noAuthUser && !data) {
    return (
      <EnhancedAlert
        severity="info"
        title="Not Signed In"
      >
        Sign in to the view the current member list
      </EnhancedAlert>
    );
  }

  if (!data) {
    return null;
  }

  const dataWithId = data.map((item) => ({
    ...item,
    id: item.userId,
  }));

  return (
    <StyledBox marginTop={3}>
      <DataGrid
        autoHeight
        columns={columns}
        disableRowSelectionOnClick
        hideFooter
        rows={dataWithId}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 300 },
          },
        }}
        slots={{ toolbar: GridToolbar }}
      />
    </StyledBox>
  );
};

export default MemberTable;
