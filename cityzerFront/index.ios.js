/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/*
* Commenting inside container requires curly brackets {}
*/

import React, { Component } from 'react';

import {Button} from "./Button";


import {
  Image,
  AppRegistry,
    StyleSheet,
  Text,
  View,
    TouchableOpacity,
    Alert,
} from 'react-native';


/*requiring style.js file and defining styles to var s*/
var s = require('cityzerFront/style.js');
/*timestamp*/
var time = new Date().toLocaleString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit' });
var date = new Date().toLocaleString('en-US', { weekday: 'long' });


export default class cityzerFront extends Component {

/*Button events*/

    _onPressButton() {
        Alert.alert('Hey', 'You handsome bastard!', [{text: 'Hey'}]);
    }


    handleOnPress(){
        Alert.alert('+1H', 'Sun for a minute', [{text: 'moro'}]);
    }

    handleOnPress2(){
        Alert.alert('+2H', 'Its raining', [{text: 'moro'}]);
    }

    handleOnPress3(){
        Alert.alert('+3H', 'Black hole', [{text: 'moro'}]);
    }

  render() {
    return (
      <View style={s.container}>




          {/*Button for location update*/}
          <Button
              onPress={this._onPressButton}
              title="Press Me"
          >
              <Image
                  style={s.location}
                  source={{uri:'https://i.imgur.com/K67wWwj.gif'}}
              />
          </Button>

          {/*Address and get location button*/}
          <Text style={s.welcome}>
             Ratapihantie 13, 00520, 00520 Helsinki
          </Text>

          {/*Time- and datestamp*/}
          <Text style={s.datestamp}>{date}</Text>

          <Text style={s.timestamp}>{time}</Text>

          {/*main picture*/}
        <Image
            style={s.mainImage}
            source={{uri:'https://i.imgur.com/DmEIa4L.gif'}}
        />

          {/*Flex table*/}
          <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={s.infoText}>
                  Celcius{'\n'}
                  <Text style={s.info}>
                      23°
                  </Text>
              </Text>

              {/*infoTex2 because it would automatically add margintop: 10 after implementing image*/}
              <Text style={s.infoText2}>
                  Wind{'\n'}
                  <Image
                      style={s.infoImage}
                      source={{uri:'https://i.imgur.com/A14dO55.gif'}}
                  />
              </Text>

              <Text style={s.infoText}>
                  Rain{'\n'}
                  {/*infoRain temporary*/}
                  <Text style={s.infoRain}>
                      0,0{'\n'}
                      mm{'\n'}
                      (1h)
                  </Text>
              </Text>
          </View>


          {/*Button for estimates*/}
          <View style={s.forecastFlex}>
              <TouchableOpacity onPress={this.handleOnPress}>
                  <Text style={s.heading1}>
                      1H
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleOnPress2}>
                  <Text style={s.heading2}>
                      2H
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleOnPress3}>
                  <Text style={s.heading3}>
                      3H
                  </Text>
              </TouchableOpacity>
          </View>

      </View>

    );
  }
}





AppRegistry.registerComponent('cityzerFront', () => cityzerFront);
