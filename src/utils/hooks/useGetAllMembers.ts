// External Dependencies
import React, { useCallback, useEffect } from 'react';

// Internal Dependencies
import { doGetUsers } from '../../firebase/db';
import usePrevious from './usePrevious';

// Local Typings
interface UseSponsorDataQueryArguments {
  useTestData?: boolean;
}

export interface TfaaMemberData {
  Address1: string;
  Address2: string;
  AmountPaid: number;
  CellPhone: string;
  City: string;
  District: string;
  Email: string;
  FirstName: string;
  LastName: string;
  MemberType: 'Active' | 'Retired';
  NewToTMAC: 'Yes' | 'No';
  OfficePhone: string;
  PaymentOption: string;
  PaypalPaymentID: string;
  State: string;
  Title: string;
  ZipCode: number;
  userId: string;
  invoiceDate: string;
  invoiceId: string;
  receiptDate: string;
  receiptId: string;
}

// Local Variables
const memberTestData: TfaaMemberData[] = [
  {
    Address1: '123 Main St.',
    Address2: '',
    AmountPaid: 0,
    CellPhone: '2145551919',
    City: 'Garland',
    District: 'Richardson ISD',
    Email: 'breff.jadford@risd.org',
    FirstName: 'Breff',
    LastName: 'Jadford',
    MemberType: 'Active',
    NewToTMAC: 'No',
    OfficePhone: '2145551919',
    PaymentOption: 'Invoiced',
    PaypalPaymentID: '',
    State: 'TX',
    Title: 'Director of Fine Arts',
    ZipCode: 75081,
    userId: 'tSOu3c33c1Yl5y29HFoHejw88HD3',
    invoiceDate: '01/26/2023',
    invoiceId: '29',
    receiptDate: '',
    receiptId: '0',
  },
  {
    Address1: '123 Main St.',
    Address2: '',
    AmountPaid: 0,
    CellPhone: '2145551919',
    City: 'Garland',
    District: 'Plano ISD',
    Email: 'DFA@planoisd.org',
    FirstName: 'Plano',
    LastName: 'Administrator',
    MemberType: 'Active',
    NewToTMAC: 'No',
    OfficePhone: '2145551919',
    PaymentOption: 'Invoiced',
    PaypalPaymentID: '',
    State: 'TX',
    Title: 'Director of Fine Arts',
    ZipCode: 75081,
    userId: '6NNV339SwqO2UEVxedPu2HGsTzL5',
    invoiceDate: '01/03/2023',
    invoiceId: '24',
    receiptDate: '',
    receiptId: '0',
  },
  {
    Address1: '123 Main St.',
    Address2: '',
    AmountPaid: 0,
    CellPhone: '2145551919',
    City: 'Dallas',
    District: 'Dallas ISD',
    Email: 'DFA@dallasisd.org',
    FirstName: 'Head of',
    LastName: 'Fine Arts',
    MemberType: 'Active',
    NewToTMAC: 'No',
    OfficePhone: '2145551919',
    PaymentOption: 'Invoiced',
    PaypalPaymentID: '',
    State: 'TX',
    Title: 'Director of Fine Arts',
    ZipCode: 75081,
    userId: '6NNV339SwqO2UEVxedPu2HGsTzL6',
    invoiceDate: '01/31/2023',
    invoiceId: '31',
    receiptDate: '',
    receiptId: '0',
  },
  {
    Address1: '123 Main St.',
    Address2: '',
    AmountPaid: 0,
    CellPhone: '2145551919',
    City: 'Garland',
    District: 'Garland ISD',
    Email: 'DFA@dallasisd.org',
    FirstName: 'Director of ',
    LastName: 'Fine Arts Education',
    MemberType: 'Active',
    NewToTMAC: 'No',
    OfficePhone: '2145551919',
    PaymentOption: 'Invoiced',
    PaypalPaymentID: '',
    State: 'TX',
    Title: 'Director of Fine Arts Education',
    ZipCode: 75081,
    userId: '6NNV339SwqO2UEVxedPu2HGsTzL7',
    invoiceDate: '02/02/2023',
    invoiceId: '33',
    receiptDate: '',
    receiptId: '0',
  },
];

// Hook Definition
export const useGetAllMembers = ({
  useTestData = false,
}: UseSponsorDataQueryArguments) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [shouldRefetchUserList, setShouldRefetchUserList] = React.useState(false);
  const [memberData, setMemberData] = React.useState<TfaaMemberData[] | null>(null);
  const previousMemberData = usePrevious(memberData);

  // console.log('isLoading', isLoading);
  // console.log('shouldRefetchUserList', shouldRefetchUserList);
  // console.log('previousMemberData', Boolean(previousMemberData));
  // console.log('memberData', Boolean(memberData));

  const handleUpdateMemberData = useCallback((newMemberData: TfaaMemberData[] | null) => {
    setMemberData(newMemberData);
    setIsLoading(false);
  }, [setIsLoading, setMemberData]);

  const handleUpdateShouldRefetchUserList = useCallback((newShouldRefetchUserList: boolean) => {
    setShouldRefetchUserList(newShouldRefetchUserList);
  }, [setShouldRefetchUserList]);

  // Fetch member data when component mounts
  useEffect(() => {
    if (!useTestData || shouldRefetchUserList) {
      const emptyMemberList: TfaaMemberData[] = [];

      setIsLoading(true);
      doGetUsers('registration', emptyMemberList, handleUpdateMemberData);

      if (shouldRefetchUserList) {
        handleUpdateShouldRefetchUserList(false);
        setIsLoading(false);
      }
    }
    // We do not want to re-run this effect when other values change
  }, [
    useTestData,
  ]);

  useEffect(() => {
    if (!useTestData && !previousMemberData && memberData && !shouldRefetchUserList) {
      handleUpdateShouldRefetchUserList(false);
      setIsLoading(false);
    }
  }, [
    memberData,
    previousMemberData,
    setIsLoading,
    shouldRefetchUserList,
    useTestData,
  ]);

  if (useTestData) {
    return {
      allMembersData: memberTestData,
      handleUpdateShouldRefetchUserList: null,
      isLoading: false,
    };
  }

  return {
    allMembersData: memberData,
    handleUpdateShouldRefetchUserList: handleUpdateShouldRefetchUserList,
    isLoading,
  };
};
