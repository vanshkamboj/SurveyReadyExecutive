import React, {useEffect, useState} from 'react';
import {Platform, View} from 'react-native';
import splashScreen from 'react-native-splash-screen';
export const SplashScreen = ({navigation}) => {
  /**
   * Hide splash screen and reset stack
   */
  useEffect(() => {
    setTimeout(() => {
      splashScreen.hide();
      navigation.navigate('Home');
    }, 2000);
  }, []);
  return <View />;
};
