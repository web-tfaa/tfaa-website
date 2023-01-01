// External Dependencies
import React, { FC } from 'react';

// Internal Dependencies
import Address from '../shared/Address';
import { mailingAddress } from '../../utils/app-constants';

// Component Definition
const FooterContactUs: FC = () => {
  return (
    <div className="contactUs">
      CONTACT US
      <hr />
      Mailing Address
      <Address
        addressOne={mailingAddress.addressOne}
        city={mailingAddress.city}
        state={mailingAddress.state}
        zipCode={mailingAddress.zip}
      />
    </div>
  );
};

export default FooterContactUs;
