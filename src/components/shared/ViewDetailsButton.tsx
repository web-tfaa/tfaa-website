// External Dependencies
import React, { FC } from 'react';

// Internal Dependencies
import CtaButton from '../shared/CtaButton';

// Local Typings
interface Props {
  context: string;
  to: string;
  width?: number;
}

// Component Definition
const ViewDetailsButton: FC<Props> = ({
  context,
  to,
  width = 160,
}) => {
  return (
    <CtaButton
      fontWeight={400}
      rightArrow
      to={to}
      width={width}
    >
      View {context} details
    </CtaButton>
  );
};

export default ViewDetailsButton;
