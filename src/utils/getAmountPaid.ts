import { MemberFormValues } from "../components/register/MemberRegisterContent";
import { TfaaMemberData } from "./hooks/useGetAllMembers";

// Local Variables
const ACTIVE_MEMBER_DUES = 75;
const RETIRED_MEMBER_DUES = 30;
const FALL_CONFERENCE_FEE = 75;

// When updating a member's data after a successful online Paypal payment,
//  we make sure the `AmountPaid` is accurate based on the data
//  for the `MemberType` and `IsRegisteredForFallConference` fields.
export const getAmountPaid = (member: MemberFormValues | TfaaMemberData | null) => {
  if (!member) {
    return 0;
  }

  // The member previously paid for only their membership, not the Fall Conference fee
  const hasPaidForMembershipOnly = Boolean(member.AmountPaid > 0 && member.AmountPaid < 100);

  // The member has indicated that they will attend the Fall Conference,
  //  but they haven't paid for it yet
  const needsToPayForFallConference = member.IsRegisteredForFallConference
    && (member.AmountPaid + member.AmountPaid_2) < 100;

  // We can assume that !isActive is 'Retired'
  const isActive = member.MemberType === 'Active';

  // Return early if we are only needing the Fall Conference fee
  if (hasPaidForMembershipOnly && needsToPayForFallConference) {
    return FALL_CONFERENCE_FEE;
  }

  const membershipAmountPaid: 75 | 30 = isActive
    ? ACTIVE_MEMBER_DUES
    : RETIRED_MEMBER_DUES;

  return member.IsRegisteredForFallConference
    ? membershipAmountPaid + FALL_CONFERENCE_FEE
    : membershipAmountPaid;
};
