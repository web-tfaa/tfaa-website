import { MemberFormValues } from "../components/register/MemberRegisterContent";
import { TfaaMemberData } from "./hooks/useGetAllMembers";

// Local Variables
const ACTIVE_MEMBER_DUES = 75;
const RETIRED_MEMBER_DUES = 30;
const FALL_CONFERENCE_FEE = 75;

// When updating a member's data, we need
//  to make sure the `AmountPaid` is accurate
export const getAmountPaid = (member: MemberFormValues | TfaaMemberData | null) => {
  if (!member) {
    return 0;
  }

  // We can assume that !isActive is 'Retired'
  const isActive = member.MemberType === 'Active';

  const membershipAmountPaid: 75 | 30 = isActive
    ? ACTIVE_MEMBER_DUES
    : RETIRED_MEMBER_DUES;

  return member.IsRegisteredForFallConference
    ? membershipAmountPaid + FALL_CONFERENCE_FEE
    : membershipAmountPaid;
};
