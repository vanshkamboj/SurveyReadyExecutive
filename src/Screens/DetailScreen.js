/**
 * Created by Yash Goel on 20 - oct - 2020
 *
 */

import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Share from 'react-native-share';
import { useDispatch } from 'react-redux';
import { setSelection , setComment} from '../Actions';

import {CustomHeader} from '../Components';
import {Colors, Fonts} from '../Constants';

export function DetailScreen({route, navigation}) {
  const [list, setList] = React.useState([]); // Redux Store Member
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);
  // const [btns, setBtns] = useState([]);
  const itemData = route?.params?.item;

  console.warn(itemData);
  React.useEffect(() => {
  });


  const toogleValue = (newValue, toggleIndex) => {
    dispatch(setSelection(itemData.type,itemData.key,toggleIndex,newValue))
    setSelectedId(toggleIndex == selectedId ? null : toggleIndex);
  };

  const onChangeText = (text, index) => {
    dispatch(setComment(itemData.type,itemData.key,index,text))
    setSelectedId(index == selectedId ? null : index);
  };

  //for show multipal buttons
  const setButtons = (item) => {
    let i;
    let btns = [];
    for (i = 0; i < item.btn.length; i++) {
      btns.push(
        <Text
          style={{
            width: wp(20),
            textAlign: 'center',
            paddingVertical: 6,
            fontSize: 12,
            backgroundColor: Colors.primary,
            color: Colors.secondary,
            fontFamily: Fonts.REGULAR,
            margin: 2,
          }}>
          F{item.btn[i]}
        </Text>,
      );
    }
    return btns;
  };

  /**
   *Single Item View Of FlatList
   */
  const renderItem = ({item, index}) => {
    // item.is_title?null
    if (item.is_title) {
      return (
        <View style={styles.titleBox}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      );
    } else
      return (
        <View>
          <TouchableOpacity
            style={[styles.itemContainer]}
            activeOpacity={1}
            onPress={() => toogleValue(!item.selected, index)}>
            <View
              style={{
                width: wp(6),
                height: wp(6),
                padding: wp(1),
                backgroundColor: Colors.primaryDark,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {item.selected && (
                <Image
                  style={{
                    width: wp(5),
                    height: wp(5),
                  }}
                  source={require('../asset/tick.png')}
                />
              )}
            </View>
            <Text
              style={{
                width: wp(62),
                fontSize: 12,
                color: Colors.secondaryDark,
                fontFamily: Fonts.REGULAR,
              }}>
              {item.discription}
            </Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                // console.log(file.filePath);
                let optio = {
                  type: 'application/pdf',
                  url:"file://../asset/Tags.pdf",
                  excludedActivityTypes:[
                    'com.apple.UIKit.activity.PostToFacebook', //IOS
                    'com.apple.UIKit.activity.PostToWhatsapp', //IOS
                    'com.apple.UIKit.activity.PostToTwitter', //IOS
                    'Whatsapp://', //IOS
                    'fb://', //IOS
                    'com.whatsapp', //android
                    'com.twitter.android', //android
                    'com.google.android.gm' //android
                  ],
                  showAppsToView:true
                };
                console.log(optio.url)
                Share.open(optio)
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    err && console.log(err);
                  });
              }}
              style={{flexDirection: 'column'}}>
              {item.is_btn_mutipal ? (
                setButtons(item)
              ) : (
                <Text
                  style={{
                    width: wp(20),
                    textAlign: 'center',
                    paddingVertical: 6,
                    fontSize: 12,
                    backgroundColor: Colors.primary,
                    color: Colors.secondary,
                    fontFamily: Fonts.REGULAR,
                  }}>
                  F{item.btn}
                </Text>
              )}
            </TouchableOpacity>
          </TouchableOpacity>
          {item.selected && (
            <TextInput
              multiline={true}
              style={[
                styles.shadowBox,
                {
                  marginBottom: 16,
                  marginHorizontal: 10,
                  marginTop: 5,
                  textAlign: 'left',
                  textAlignVertical: 'top',
                  height: 120,
                  backgroundColor: Colors.secondary,
                  borderRadius: 5,
                  backgroundColor: Colors.primaryLight,
                  padding: 16,
                  fontSize: 12,
                  color: Colors.secondaryDark,
                  borderWidth: 0,
                  fontFamily: Fonts.REGULAR,
                },
              ]}
              placeholder="Type here to translate!"
              onChangeText={(text) => onChangeText(text, index)}
              defaultValue={item.comment}
            />
          )}
          <View
            style={{
              width: '100%',
              borderRadius: 0.5,
              borderWidth: 0.6,
              borderColor: Colors.primaryDark,
              borderStyle: 'dashed',
            }}
          />
        </View>
      );
  };

  const selectedItems = () => {
    const data = itemData.list.filter((item) => item.selected == true);
    console.log(data, '<--');

    return data;
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      enabled={true}
      behavior={Platform.OS == 'ios' ? 'padding' : ''}>
      <CustomHeader>
        <View style={[styles.root, {paddingHorizontal: 16}]}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 16,
            }}>
            <Text
              style={{
                color: Colors.primaryDark,
                // fontWeight: 'bold',
                fontSize: 18,
                fontFamily: Fonts.BOLD,
              }}>
              NURSING HOME
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SaveDetail', {data: selectedItems()});
              }}>
              <Text
                style={{
                  paddingHorizontal: 30,
                  paddingVertical: 5,
                  backgroundColor: Colors.primaryDark,
                  color: Colors.secondary,
                  fontFamily: Fonts.REGULAR,
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: Colors.secondaryDark,
              height: 1,
              width: '100%',
              marginVertical: 15,
            }}
          />
          <Text
            style={{
              color: Colors.primary,
              // fontWeight: 'bold',
              fontSize: 14,
              paddingBottom: 10,
              fontFamily: Fonts.BOLD,
            }}>
            {itemData.key + ' ' + itemData.type}
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={{flex: 1}}>
            <FlatList
              scrollEnabled={true}
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="interactive"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 10}}
              data={itemData.list}
              extraData={selectedId}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          </ScrollView>
        </View>
      </CustomHeader>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1},
  itemContainer: {
    width: '100%',
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    width: '100%',
    fontFamily: Fonts.REGULAR,
  },
  shadowBox: {
    elevation: 10,
    shadowOffset: {width: 0, height: 1},
    shadowColor: '#A3A3A3',
    shadowOpacity: 4,
    borderColor: '#A3A3A3',
    borderWidth: 0.1,
  },
  titleBox: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    color: Colors.secondary,
    fontFamily: Fonts.MEDIUM,
  },
});
