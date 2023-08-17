import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../../presentation/screens/welcome';
import MyTabs from './tabs';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectUser, selectUserLoading} from '../redux/user/user';
import { initializeUser } from '../redux/user/thunk/initialize_user';

const Stack = createStackNavigator();

function MyStack() {
  const dispatch = useAppDispatch()
  const userIsLoading = useAppSelector(selectUserLoading);
  const selectedUser = useAppSelector(selectUser);

  useEffect( ()=>{
   dispatch(initializeUser())
   
  },[]);

  if (userIsLoading) {
    return <View/>;
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={selectedUser === undefined ?  'Welcome' : 'WeatherApp' }>
    <Stack.Screen name="WeatherApp" component={MyTabs} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

export default MyStack;