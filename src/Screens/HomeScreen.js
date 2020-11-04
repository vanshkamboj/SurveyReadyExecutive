import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

import {CustomHeader, HomeScreenButton} from '../Components';
import {Colors, Fonts} from '../Constants';

const dailogArray = [
  'Select any department to start survey.',
  'Select any inspection and add comments.',
  'Press back button to survey for other department.',
  'Press save button to generate final report.',
  'Email your final report and app will be reset to start new survey.',
];

/**
 * Home Screen from show all deshboard Options
 * create by vansh at 20/10/20
 */
export function HomeScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const data = useSelector((state) => state.DataReducer.surveyReady);

  const dailogView = () => {
    return (
      <View style={styles.centeredView}>
        <Modal animationType="none" transparent={true} visible={modalVisible}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
            style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Instructions</Text>
              <View
                style={{
                  backgroundColor: '#2196F3',
                  height: 1,
                  width: '100%',
                  marginVertical: 10,
                }}
              />
              {dailogArray.map((item, index) => {
                return (
                  <View
                    key={index.toString()}
                    style={{
                      flexDirection: 'row',
                      width: '95%',
                      marginVertical: 4,
                    }}>
                    <Text style={{color: 'black', fontSize: 16}}>
                      {index + 1}
                      {'. '}
                    </Text>
                    <Text style={{color: 'black', fontSize: 16}}>{item}</Text>
                  </View>
                );
              })}
              <TouchableOpacity
                style={{
                  ...styles.openButton,
                  backgroundColor: '#2196F3',
                  marginVertical: 10,
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>OK</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  };

  return (
    <CustomHeader home={true} title={'Manager App'}>
      <View style={styles.mainView}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              color: '#000',
              paddingTop: 16,
              // fontWeight: '500',
              fontFamily: Fonts.BOLD,
            }}>
            Nursing Home
          </Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              style={{
                width: 25,
                height: 25,
                backgroundColor: 'black',
                borderRadius: 15,
              }}
              source={require('../asset/help.png')}
            />
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 14, color: '#000', fontFamily: Fonts.REGULAR}}>
          Welcome to Survey Ready for nursing homes. Please select from the
          following department from below that you want to inspect.
        </Text>
        <View style={{width: '100%', alignItems: 'center', marginTop: hp(15)}}>
          <FlatList
            style={{width: '100%'}}
            // extraData={data}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: hp(15)}}
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
          {dailogView()}
        </View>
      </View>
    </CustomHeader>
  );
}
const styles = StyleSheet.create({
  mainView: {
    // height: '100%',
    paddingHorizontal: 16,
    flex: 1,
  },
  btnView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnStyle: {
    backgroundColor: Colors.primary,
    width: wp('40%'),
    height: hp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  text: {
    color: Colors.secondary,
    fontFamily: Fonts.MEDIUM,
  },
  flatListStyle: {
    flex: 1,
  },
  shadowBox: {
    elevation: 10,
    shadowOffset: {width: 0, height: 1},
    shadowColor: '#A3A3A3',
    shadowOpacity: 4,
    borderColor: '#A3A3A3',
    borderWidth: 0.1,
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modalView: {
    width: '90%',
    margin: 35,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    paddingHorizontal: 40,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
