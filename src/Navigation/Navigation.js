import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  DetailScreen,
  HomeScreen,
  ManagerScreen,
  SaveDetailScreen,
  SplashScreen,
} from '../Screens';
import * as localStorage from '../AsyncData';

const Stack = createStackNavigator();

export const MyScreens = ({navigation, route}) => {
  return (
    <Stack.Navigator
      initialRouteName="SpleshScreen"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <Stack.Screen name="SpleshScreen" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ManagerScreen" component={ManagerScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="SaveDetail" component={SaveDetailScreen} />
    </Stack.Navigator>
  );
};
