/**
 * Created by Yash Goel on 08 - sept - 2020
 *
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import splashScreen from 'react-native-splash-screen';

import {store, persistor} from './Reducres';
import { MyScreens } from './Navigation';

export default function App() {

  React.useEffect(() => {
    setTimeout(() => {
      splashScreen.hide();
    }, 2000);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MyScreens />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({});
