// External Dependencies
import clsx from 'clsx';
import styled from 'styled-components';
import React, { FC } from 'react';

// Local Typings
interface Props {
  red?: boolean;
}

// Local Variables
const StyledHr = styled.hr(({ theme }) => ({
  '.red': {
    background: theme.palette.texasFlag.red,
  },
  height: 3,
  background: 'darkred',
}));

// Component Definition
const FormHr: FC<Props> = ({ red }) => (
  <StyledHr className={clsx(red ? 'red' : '')} />
);

export default FormHr;
