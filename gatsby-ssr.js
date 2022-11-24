import React from 'react';

import Page from './src/components/Layout';

export function wrapPageElement({ element, props }) {
  return <Page {...props}>{element}</Page>;
}
