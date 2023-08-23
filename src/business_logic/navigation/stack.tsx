import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../../presentation/screens/welcome';
import MyTabs from './tabs';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectUserLoggedIn, selectUserLoading} from '../redux/user/user';
import { initializeUser } from '../redux/user/thunk/initialize_user';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';

const Stack = createStackNavigator();

function MyStack() {
  const dispatch = useAppDispatch()
  const userIsLoading = useAppSelector(selectUserLoading);
  const userIsLoggedIn = useAppSelector(selectUserLoggedIn);


  const LoginStack =()=> {
   return <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={WelcomeScreen}/>
    </Stack.Navigator>
  }
  const AppStack =()=> {
   return <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="WeatherApp" component={MyTabs}/>
    </Stack.Navigator>
  }

  const init = async () => {
   await dispatch(initializeUser());
  }

  useEffect( ()=>{
   init()
  },[]);

  if (userIsLoading) {
    return <View/>;
  }
  return <NavigationContainer>
    {userIsLoggedIn ? <AppStack/> : <LoginStack/> }
  </NavigationContainer>;
}

export default MyStack;

