import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../../presentation/screens/welcome';
import MyTabs from './tabs';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { getUsername } from '../../data/local storage/user';

const Stack = createStackNavigator();

function MyStack() {
  const [isLoggedIn, useIsLoggedIn] = useState<boolean>(false)
  const [isLoading, useIsLoading] = useState<boolean>(true)

  useEffect( ()=>{
   const initialize = async()=> {
   var result = await getUsername()
   if(result === null){
    useIsLoading(false)
    useIsLoggedIn(false)
   } else{
    useIsLoading(false)
    useIsLoggedIn(true)
   }
   };
   initialize();
  },[]);

  if (isLoading) {
    return <View/>;
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
   { isLoggedIn ? (
      <><Stack.Screen name="WeatherApp" component={MyTabs} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      </>)
      : (
      <> <Stack.Screen name="Welcome" component={WelcomeScreen}/>
      <Stack.Screen name="WeatherApp" component={MyTabs} />
      </>)
      }   
    </Stack.Navigator>
  );
}

export default MyStack;