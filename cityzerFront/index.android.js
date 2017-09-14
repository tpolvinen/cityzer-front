/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class cityzerFront extends Component {
  render() {
    return (

        <View style={{flex: 1}}>
          <View style={{flex: 1, backgroundColor: 'powderblue'}} />
          <View style={{flex: 4, backgroundColor: 'skyblue'}} />
          <View style={{flex: 3, flexDirection: 'row'}}>
            <View style={{flex: 1, backgroundColor: 'powderblue'}} />
            <View style={{flex: 1, backgroundColor: 'skyblue'}} />
            <View style={{flex: 1, backgroundColor: 'steelblue'}} />
          </View>
          <View style={{flex: 1, backgroundColor: 'steelblue'}} />




        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('cityzerFront', () => cityzerFront);
