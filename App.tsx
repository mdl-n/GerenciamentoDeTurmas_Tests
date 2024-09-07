import React from 'react';
import { extendTheme, NativeBaseProvider } from "native-base";
import AppNavigator from './telas/AppNavigator';
import { LogBox } from 'react-native';

const theme = extendTheme({
    config: {
      initialColorMode: 'light',
    },
  });
  
  export default function App() {
      LogBox.ignoreAllLogs();
      return (
          <NativeBaseProvider theme={theme}>
              <AppNavigator />
          </NativeBaseProvider>
      );
  }