/**
 * Created by Vansh Kamboj on 21 - oct - 2020
 *
 */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

/**
 * Button for Home screen
 * @param Text,onClick
 */

export const HomeScreenButton = (props) => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.button, styles.shadowBox]}
        onPress={() => props.onClick()}>
        <Text style={styles.text}>
          {props.text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primaryLight,
    height: wp('25%'),
    width: wp(27),
    borderRadius: 10,
    margin: wp(2),
    paddingHorizontal: wp(1),
    justifyContent: 'center',
  },
  text: {
    fontFamily: Fonts.REGULAR,
    textAlign: 'center',
    color: Colors.secondaryDark,
    fontSize: 12,
  },
  shadowBox: {
    elevation: 10,
    shadowOffset: {width: 0, height: 1},
    shadowColor: '#A3A3A3',
    shadowOpacity: 4,
    borderColor: '#A3A3A3',
  },
});
