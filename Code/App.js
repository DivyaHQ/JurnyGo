import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { StatusBar } from 'react-native'
import { ToastProvider } from 'react-native-toast-notifications'
import { NavigatorProvider } from './src/components/context/navigatorProvider'
import { NavigationContainer } from '@react-navigation/native'
import ScreenRoutes from './src/components/navigations/screenRoutes'
import 'react-native-gesture-handler';

const App = () => {
  return (
    <ToastProvider>
      <NavigatorProvider>
        <NavigationContainer>
          <ScreenRoutes />
        </NavigationContainer>
      </NavigatorProvider>
    </ToastProvider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
