import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/business_logic/navigation/stack';

function App(): JSX.Element {

  return <NavigationContainer>
    <MyStack/>
  </NavigationContainer>
}

export default App; 