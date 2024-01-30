// External Dependencies
import React, { useMemo } from 'react';
import { GridColDef } from '@mui/x-data-grid';

// Local Dependencies
import { TfaaMemberData } from '../../../utils/hooks/useGetAllMembers'

export const useColumns = (extraActions: GridColDef<TfaaMemberData> | undefined) => {
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
      ...extraActions ? [extraActions] : [],
    ];

    return columns;
  }, [
    extraActions,
  ]);
};
