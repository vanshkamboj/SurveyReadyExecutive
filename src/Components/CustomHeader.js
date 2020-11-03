/**
 * Created by Yash Goel on 20 - oct - 2020
 *
 */

import React from 'react';
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
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Fonts} from '../Constants';

export class CustomHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ImageBackground
          style={styles.backgroundImage}
          source={
            this.props.home
              ? require('../asset/HomeScreenBackgraund.png')
              : require('../asset/BackgroundScreen.jpg')
          }>
          <View style={{flex: 1}}>
            <View
              style={{
                width: '100%',
                height: 50,
                backgroundColor: this.props.home ? null : Colors.primary,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 5,
              }}>
            {this.props.title && <Text style={styles.title}>{this.props.title}</Text>}
            {this.props.goBack && <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{marginRight:5}}>
              <Image style={{height:20,width:20}} source={require("../asset/back.png")} />
              </TouchableOpacity>}
            
              <Text style={styles.text}>SR</Text>
              <View style={styles.rightContent}>
                {this.props.enableSecondRightBtn && (
                  <Text
                    style={styles.textStyle}
                    onPress={() => this.props.onSecondRightBtnClick()}>
                    {this.props.secondRightBtnTxt}
                  </Text>
                )}
                {this.props.enableRightBtn && (
                  <Text
                    style={styles.textStyle}
                    onPress={() => this.props.onRightBtnClick()}>
                    {this.props.rightBtnTxt}
                  </Text>
                )}
                {this.props.enableRightIcon && (
                  <TouchableOpacity
                    onPress={() => this.props.onRightBtnClick()}>
                    <Image source={this.props.rightIcon} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={{flex: 1}}>{this.props.children}</View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: 'white',
    fontFamily: Fonts.SEMI_BOLD,
  },
  backgroundImage: {
    flex: 1,
  },
  title:{
    position: 'absolute',
    justifyContent:"center",
    height:"100%",
    left:0,
    right:0,
    textAlign:"center",
    fontSize:20,
    fontFamily: Fonts.BOLD,
    textAlignVertical:"center",
    color:"#000"
  },
  textStyle: {
    color: 'white',
    fontFamily: Fonts.MEDIUM,
    margin: 10,
  },
  rightContent: {
    position: 'absolute',
    right:0,
    justifyContent:"center",
    flexDirection:"row",
    height:"100%"
  },
});
