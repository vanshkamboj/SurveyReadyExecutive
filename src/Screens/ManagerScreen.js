import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

import {CustomHeader, HomeScreenButton} from '../Components';
import {Colors, Fonts} from '../Constants';

/**
 * Home Screen from show all deshboard Options
 * create by vansh at 20/10/20
 */
export function ManagerScreen({navigation}) {
  const data = useSelector((state) => state.DataReducer.surveyPreparedness);

  return (
    <CustomHeader
      home={true}
      goBack={true}
      navigation={navigation}
      title={'Manager'}>
      <View style={styles.mainView}>
        <Text
          style={{
            fontSize: 20,
            paddingTop: 16,
            // fontWeight: '500',
            color: '#000',
            fontFamily: Fonts.BOLD,
          }}>
          Nursing Home
        </Text>
        <Text style={{fontSize: 14, color: '#000', fontFamily: Fonts.REGULAR}}>
          Welcome to Survey Ready for Inspection Control and Safety Surveilance.
          Please select from the following options and lets get started.
        </Text>
        <View style={{width: '100%', alignItems: 'center', marginTop: hp(10)}}>
          <FlatList
            style={{width: '100%'}}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: hp(10)}}
            data={data}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <HomeScreenButton
                  text={item.key}
                  onClick={() => navigation.navigate('Detail', {item: item})}
                />
              );
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            paddingTop: 16,
            // fontWeight: '500',
            color: '#000',
            fontFamily: Fonts.SEMI_BOLD,
          }}>
          THINK PREPAREDNESS!
        </Text>
        <Text style={{fontSize: 14, color: '#000', fontFamily: Fonts.REGULAR}}>
          Identify your 4-month window for Annual Survey - Every nursing home is
          required to have at least an annual survey in the range of every 9 -
          12 months. Of course, if you have complaints or are a focus facility,
          your survey will have a shortened span.
        </Text>
      </View>
    </CustomHeader>
  );
}

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    paddingHorizontal: 16,
    flex: 1,
  },
  text: {
    color: Colors.secondary,
  },
  flatListStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
