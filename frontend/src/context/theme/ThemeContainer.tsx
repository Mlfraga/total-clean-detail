import React from 'react';

import {
  ThemeProvider as ChakraThemeProvider,
  ColorModeProvider,
  CSSReset,
} from '@chakra-ui/core';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';

import customTheme from '../../styles/theme';

const ThemeContainer: React.FC = ({ children }) => (
  <ChakraThemeProvider theme={customTheme}>
    <ColorModeProvider value="light">
      <EmotionThemeProvider theme={{}}>
        <CSSReset />
        {children}
      </EmotionThemeProvider>
    </ColorModeProvider>
  </ChakraThemeProvider>
);

export default ThemeContainer;
