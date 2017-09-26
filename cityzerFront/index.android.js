/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Image,
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import axios from 'axios';

export default class cityzerFront extends Component {

    constructor(props){
        super(props);
        this.state ={
            lat: null,
            lon: null,
            error: null,
            address: null,
            suburb: null,
        }
    }
    state = { address: [] };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude+'&key=AIzaSyD-VCDRI-XxI1U-oz-5ujODryCQ1zSJi0U';
                axios.get(url)
                    .then(response => this.setState({ address: response.data.results[0].address_components[1].long_name })
                        //console.log(response.data.results[0].address_components[1,2])
            );

            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    render() {
        return (
            <View style={styles.container}>



                {/*Address and get location button*/}
              <Text style={styles.welcome}>
                <Image
                    style={styles.location}
                    source={{uri:'https://i.imgur.com/K67wWwj.gif'}}
                />
                  Latitude: {this.state.lat}
                  Longitude: {this.state.lon}
                  Address: {this.state.address}
              </Text>

                {/*Timestamp*/}
              <Text style={styles.timestamp}>
                12:00
              </Text>

                {/*main picture*/}
              <Image
                  style={styles.mainImage}
                  source={{uri:'https://i.imgur.com/DmEIa4L.gif'}}
              />

                {/*Flex table*/}
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={styles.infoText}>
                  Celcius{'\n'}
                  <Text style={styles.info}>
                    23°
                  </Text>
                </Text>

                  {/*infoTex2 because it would automatically add margintop: 10 after implementing image*/}
                <Text style={styles.infoText2}>
                  Wind{'\n'}
                  <Image
                      style={styles.infoImage}
                      source={{uri:'https://i.imgur.com/A14dO55.gif'}}
                  />
                </Text>

                <Text style={styles.infoText}>
                  Rain{'\n'}
                    {/*infoRain temporary*/}
                  <Text style={styles.infoRain}>
                    0,0{'\n'}
                    mm{'\n'}
                    (1h)
                  </Text>
                </Text>
              </View>


                {/*Button for estimates*/}
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={styles.heading1}>
                  1H
                </Text>
                <Text style={styles.heading2}>
                  2H
                </Text>
                <Text style={styles.heading3}>
                  3H
                </Text>
              </View>

            </View>

        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DAECF8',
    },
    location: {
        width: 40,
        height: 40,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    timestamp: {
        fontSize: 100,
        marginTop: -20,
        color: '#FFFFFF',
        textShadowColor:'#333333',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 4,
    },
    mainImage: {
        width: 225,
        height: 225,
    },
    infoText: {
        fontSize: 25,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: -15,
        padding: 5,
        textAlign: 'center',
    },
    infoText2: {
        fontSize: 25,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: -15,
        padding: 5,
        textAlign: 'center',
    },
    info: {
        fontSize: 35,
        color: '#ff002f',
        width: 50,
        height: 50,
    },
    infoRain: {
        fontSize: 20,
        color: '#FFFFFF',
        textShadowColor:'#333333',
        textShadowOffset: {width: 1, height: 1},
    },
    infoImage: {
        width: 50,
        height: 50,
    },
    heading1: {
        fontSize: 50,
        marginTop: 30,
        borderWidth: 4,
        borderRadius: 10,
        marginLeft: 2,
        marginRight: 2,
        paddingTop: 10,
        paddingLeft: 1,
        paddingRight: 1,
        overflow: 'hidden',
        textAlign: 'center',
        borderColor:'#ffffff',
        backgroundColor:'#b0e0e6',
    },
    heading2: {
        fontSize: 50,
        marginTop: 30,
        borderWidth: 4,
        borderRadius: 10,
        marginLeft: 2,
        marginRight: 2,
        paddingTop: 10,
        paddingLeft: 1,
        paddingRight: 1,
        overflow: 'hidden',
        textAlign: 'center',
        borderColor:'#ffffff',
        backgroundColor:'#87ceeb',
    },
    heading3: {
        fontSize: 50,
        marginTop: 30,
        borderWidth: 4,
        borderRadius: 10,
        marginLeft: 2,
        marginRight: 2,
        paddingTop: 10,
        paddingLeft: 1,
        paddingRight: 1,
        overflow: 'hidden',
        textAlign: 'center',
        borderColor:'#ffffff',
        backgroundColor:'#4682b4',
    },
});

AppRegistry.registerComponent('cityzerFront', () => cityzerFront);
