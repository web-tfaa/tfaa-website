import { TfaaMemberData } from './hooks/useGetAllMembers';

export const getFullName = (tfaaMemberData: TfaaMemberData | null): string => {
  if (!tfaaMemberData) {
    return '';
  }

  return `${tfaaMemberData.FirstName} ${tfaaMemberData.LastName}`;
};
