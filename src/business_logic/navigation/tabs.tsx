import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import FavouritesScreen from '../../presentation/screens/favourites';
import HomeScreen from '../../presentation/screens/home';
import AccountScreen from '../../presentation/screens/account';
import React from 'react';
import Colors from '../../presentation/styling/colors';

const Tab = createBottomTabNavigator();


function MyTabs(){
    return (
      <Tab.Navigator
       screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName:string ='';

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'Favourites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } 
          else if(route.name === 'Accounts'){
            iconName = focused ? 'person':'person-outline';
          }
          return <Icon name={iconName} color={color} size = {size}/>;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.grey2,
        headerShown : false
      })}>
    
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Favourites" component={FavouritesScreen} />
        <Tab.Screen name="Accounts" component={AccountScreen} />

      </Tab.Navigator>
    );
  }

  export default MyTabs;