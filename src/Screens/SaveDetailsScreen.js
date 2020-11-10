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
import {CustomHeader} from '../Components';
import CheckBox from '@react-native-community/checkbox';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {Colors, Fonts} from '../Constants';
import Share from 'react-native-share';
import {useNavigation} from '@react-navigation/native';
import {resetAll} from '../Actions';
import {useDispatch, useSelector} from 'react-redux';
import { TagPdf } from '../asset/tags';

export function SaveDetailScreen(props) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.DataReducer.printList);

  const navigation = useNavigation();

  const html = `<style>
  table, th, td {
    padding: 8px;
    border: 1px solid black;
    border-collapse: collapse;
  }
  td {
    text-align: center; 
    vertical-align: middle;
  }
  </style><table>
  <tr>
    <th>S.No</th>
    <th>Reference</th>
    <th>Description</th>
    <th>Comments</th>
  </tr>`;

  function createRows() {
    let htmlnew = html;

    Object.values(data).map((item, index) => {
      if (item.selected) {
        htmlnew += `<tr>
     <td >${index + 1}</td>
     <td>F${item.btn ? item.btn : ''}</td>
     <td>${item.discription}</td>
     <td>${item.comment}</td>
    </tr>`;
      }
    });
    console.log(Object.values(data).length, 'html---->' + htmlnew);
    createPDF(htmlnew + '</table>');
  }

  const createPDF = async (htmlnew) => {
    try {
      let options = {
        html: htmlnew,
        fileName: 'SurveyReady',
      };

      let file = await RNHTMLtoPDF.convert(options);
      // console.log(file.filePath);
      let optio = {
        type: 'application/pdf',
        url:
          Platform.OS === 'android' ? 'file://' + file.filePath : file.filePath,
      };
      await Share.open(optio)
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          // err && console.log(err);
        });
    } catch (e) {
      alert(JSON.stringify(e));
    }
  };
  //for show multipal buttons
  const setButtons = (item) => {
    let i;
    let btns = [];
    for (i = 0; i < item.btn.length; i++) {
      btns.push(
        <Text
          key={i.toString()}
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
    return (
      <View>
        <View style={[styles.itemContainer]}>
          <TouchableOpacity
           onPress={() =>navigation.navigate("PDFView")}
           >
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
          <Text
            style={{
              width: wp(68),
              fontSize: 12,
              color: Colors.secondaryDark,
              fontFamily: Fonts.REGULAR,
              marginLeft: 20,
            }}>
            {item.discription}
          </Text>
        </View>
        <Text style={styles.comment}>Comment : {item.comment}</Text>
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
  const resetSaveItems = () => {
    dispatch(resetAll());
    navigation.navigate('Home');
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      enabled={true}
      behavior={Platform.OS == 'ios' ? 'padding' : ''}>
      <CustomHeader
        goBack={true}
        navigation={navigation}
        enableRightBtn={true}
        enableSecondRightBtn={true}
        rightBtnTxt="SEND"
        secondRightBtnTxt="RESET"
        onSecondRightBtnClick={() => resetSaveItems()}
        onRightBtnClick={() => createRows()}>
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
                fontFamily: Fonts.SEMI_BOLD,
              }}>
              Final Report
            </Text>
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
              //   fontWeight: 'bold',
              fontSize: 14,
              paddingBottom: 10,
              fontFamily: Fonts.SEMI_BOLD,
            }}>
            Rehabilitation Survey
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
              data={Object.values(data)}
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
    marginVertical: 10,
    flexDirection: 'row',
    // justifyContent: 'space-between',
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
  comment: {
    fontFamily: Fonts.REGULAR,
    marginBottom: 10,
  },
});
