// External Dependencies
import React, { useMemo } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

// Local Dependencies
import { TfaaMemberData } from '../../../utils/hooks/useGetAllMembers'
import MemberTableRowActionElements from './MemberTableRowActionElements';

export const useColumns = (isAdmin: boolean) => {
  return useMemo(() => {
    const columns: GridColDef<TfaaMemberData>[] = [
      {
        field: 'FirstName',
        headerName: 'First Name',
        width: 160,
      },
      {
        field: 'LastName',
        headerName: 'Last Name',
        width: 160,
      },
      {
        field: 'District',
        headerName: 'District',
        width: 200,
      },
      {
        field: 'Title',
        headerName: 'Title',
        width: 380,
      },
      {
        field: 'Email',
        headerName: 'Email',
        width: 360,
      },
    ];

    if (isAdmin) {
      columns.push({
        field: 'Actions',
          headerName: 'Actions',
          renderCell: (params: GridRenderCellParams) => {
            return (
              <div>
                <MemberTableRowActionElements user={params.row} />
              </div>
            );
          },
          width: 360,
      });
    }

    return columns;
  }, [
    isAdmin,
  ]);
};
