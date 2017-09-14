/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, Text } from 'react-native';


export default class cityzerFront extends Component {


    _onPressButton() {
        Alert.alert('You tapped the button!')
    }

  render() {
    return (

        <View style={{flex: 1}}>
          <View style={{flex: 1, backgroundColor: 'powderblue'}}>
            <Button
                onPress={this._onPressButton}
                title="Press Me"
            />
          </View>
          <View style={{flex: 4, backgroundColor: 'skyblue'}} />
          <View style={styles.testi}>
            <View style={{flex: 1, backgroundColor: 'powderblue'}}>
            <Text style={styles.welcome}>Sademäärä +1h!</Text>
            </View>
            <View style={{flex: 1, backgroundColor: 'skyblue'}}>
              <Text>Sademäärä +2h!</Text>
            </View>
            <View style={{flex: 1, backgroundColor: 'steelblue'}} >
              <Text>Sademäärä +3h!</Text>
            </View>
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
    testi:{
    flex: 3,
    flexDirection: 'row',

  },
});

AppRegistry.registerComponent('cityzerFront', () => cityzerFront);
