// External Dependencies
import React, { useEffect } from 'react';

// Internal Dependencies
import { doGetUsers } from '../../firebase/db';
import usePrevious from './usePrevious';

// Local Typings
interface UseSponsorDataQueryArguments {
  useTestData?: boolean;
}

export interface Sponsor {
  AmountDonated: number;
  City: string;
  ContactAddress1: string;
  ContactAddress2: string;
  ContactPhone: string;
  Email: string;
  OrganizationContactName: string;
  OrganizationWebsiteAddress: string;
  PaymentOption?: 'Invoiced' | 'Paypal';
  PaypalPayerID?: string;
  PaypalPaymentID?: string;
  SponsorLevel: string;
  SponsorOrganization: string;
  State: string;
  Title: string;
  ZipCode: string;
  honeypot?: string;
  invoiceDate: string;
  invoiceId: number;
  receiptDate: string;
  receiptId: number;
  userId?: string;
}

// Local Variables
const sponsorTestData: Sponsor[] = [
  {
    AmountDonated: 5000,
    City: 'Dallas',
    ContactAddress1: '123 Main St.',
    ContactAddress2: '',
    ContactPhone: '(214) 280-3214',
    Email: 'mike@presto-assistant.com',
    OrganizationContactName: 'Jimmy Smith',
    OrganizationWebsiteAddress: 'https://presto.cool',
    PaymentOption: 'Invoiced',
    PaypalPayerID: '',
    PaypalPaymentID: '',
    SponsorLevel: 'Class Champion',
    SponsorOrganization: 'Yamaha Pianos',
    State: 'Texas',
    Title: 'Director of Education',
    ZipCode: '75044',
    invoiceDate: '01/26/2023',
    invoiceId: 29,
    receiptDate: '',
    receiptId: 0,
    userId: '6NNV339SwqO2UEVxedPu2HGsTzL3',
  },
  {
    AmountDonated: 2000,
    City: 'Austin',
    ContactAddress1: '123 Main St.',
    ContactAddress2: '',
    ContactPhone: '(214) 280-3214',
    Email: 'mike@presto-assistant.com',
    OrganizationContactName: 'Sammy Salas',
    OrganizationWebsiteAddress: 'https://presto.cool',
    PaymentOption: 'Invoiced',
    PaypalPayerID: '',
    PaypalPaymentID: '',
    SponsorLevel: 'Gold Medal',
    SponsorOrganization: 'Excellent Pianos',
    State: 'Texas',
    Title: 'Director of Education',
    ZipCode: '75044',
    invoiceDate: '01/26/2023',
    invoiceId: 29,
    receiptDate: '',
    receiptId: 0,
    userId: '6NNV339SwqO2UEVxedPu2HGsTzL4',
  },
  {
    AmountDonated: 2000,
    City: 'San Antonio',
    ContactAddress1: '123 Main St.',
    ContactAddress2: '',
    ContactPhone: '(214) 280-3214',
    Email: 'mike@presto-assistant.com',
    OrganizationContactName: 'Fred Smith',
    OrganizationWebsiteAddress: 'https://presto.cool',
    PaymentOption: 'Invoiced',
    PaypalPayerID: '',
    PaypalPaymentID: '',
    SponsorLevel: 'Gold Medal',
    SponsorOrganization: 'Percussion Rentals, Inc.',
    State: 'Texas',
    Title: 'Director of Education',
    ZipCode: '75044',
    invoiceDate: '01/26/2023',
    invoiceId: 29,
    receiptDate: '',
    receiptId: 0,
    userId: '6NNV339SwqO2UEVxedPu2HGsTzL4',
  },
  {
    AmountDonated: 1000,
    City: 'Austin',
    ContactAddress1: '123 Main St.',
    ContactAddress2: '',
    ContactPhone: '(214) 280-3214',
    Email: 'mike@presto-assistant.com',
    OrganizationContactName: 'Mike Mathew',
    OrganizationWebsiteAddress: 'https://presto.cool',
    PaymentOption: 'Invoiced',
    PaypalPayerID: '',
    PaypalPaymentID: '',
    SponsorLevel: 'Silver Medal',
    SponsorOrganization: 'Presto Assistant',
    State: 'Texas',
    Title: 'Director of Education',
    ZipCode: '75044',
    invoiceDate: '01/26/2023',
    invoiceId: 29,
    receiptDate: '',
    receiptId: 0,
    userId: '6NNV339SwqO2UEVxedPu2HGsTzL5',
  },
];

// Hook Definition
export const useGetSponsorData = ({
  useTestData = false,
}: UseSponsorDataQueryArguments) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [sponsorData, setSponsorData] = React.useState<Sponsor[] | null>(null);
  const previousSponsorData = usePrevious(sponsorData);

  const handleUpdateSponsorData = (newSponsorData: Sponsor[] | null) => {
    setSponsorData(newSponsorData);
  };

  // Fetch sponsor data when component mounts
  useEffect(() => {
    if (!useTestData) {
      const emptySponsorList: Sponsor[] = [];

      setIsLoading(true);
      doGetUsers('sponsor', emptySponsorList, handleUpdateSponsorData);
    }
  }, [useTestData]);

  useEffect(() => {
    if (!useTestData && !previousSponsorData && sponsorData) {
      setIsLoading(false);
    }
  }, [previousSponsorData, sponsorData, useTestData]);

  if (useTestData) {
    return {
      isLoading: false,
      sponsorData: sponsorTestData,
    };
  }

  return {
    isLoading,
    sponsorData,
  };
};
