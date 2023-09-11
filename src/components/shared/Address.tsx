// External Dependencies
import React from 'react';
import styled from 'styled-components';

// Local Typings
interface Props {
  addressOne?: string | null;
  addressTwo?: string | null;
  city?: string | null;
  className?: string;
  email?: string | null;
  // phoneNumber?: string | null;
  state?: string | null;
  zipCode?: string | number | null;
}

// Local Variables
const StyledAddress = styled.address({
  fontStyle: 'normal',
});

// TODO: If we add phone number here, add formatting for it

// Component Definition
const Address: React.FC<Props> = ({
  addressOne,
  addressTwo,
  city = null,
  email,
  // phoneNumber,
  state = null,
  zipCode = null,
  ...otherProps
}) => (
  <StyledAddress {...otherProps}>
    {email && <div>{email}</div>}
    {addressOne && <div>{addressOne}</div>}
    {addressTwo && <div>{addressTwo}</div>}
    <div>{city}, {state} {zipCode}</div>
  </StyledAddress>
);

export default Address;
