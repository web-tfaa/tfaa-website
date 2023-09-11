// External Dependencies
import React from 'react';
import ThemeTopLayout from 'gatsby-theme-material-ui-top-layout/src/components/top-layout';
import {
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';

export default function TopLayout({ children, theme }) {
  return (
    <ThemeTopLayout theme={theme}>
      <StyledComponentsThemeProvider theme={theme}>
        {children}
      </StyledComponentsThemeProvider>
    </ThemeTopLayout>
  );
}
