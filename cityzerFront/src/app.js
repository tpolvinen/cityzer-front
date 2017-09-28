import React, { Component } from 'react';
import {
    Image,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import axios from 'axios';

class App extends Component {

    constructor(props){
        super(props);
        this.state ={
            lat: null,
            lon: null,
            error: null,
            address: null,
            suburb: null,
            rain: null,
            temperature: null,
            json: [],
        }
        this.getWeather = this.getWeather.bind(this);
    }
    state = { address: [] };

    getWeather(i) {
        const rain = this.state.json.precipitation_amount_353_1h
            switch (i) {
                case '1':
                    return this.setState({rain: rain, temperature: this.state.json.air_temperature_4_1h});
                case '2':
                    return this.setState({rain: this.state.json.precipitation_amount_353_2h, temperature: this.state.json.air_temperature_4_2h});
                case '3':
                    return this.setState({rain: this.state.json.precipitation_amount_353_3h, temperature: this.state.json.air_temperature_4_3h});
                default:
                    this.setState({rain: this.state.json.precipitation_amount_353, temperature: this.state.json.air_temperature_4});
            }
    }

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

        const url1 = 'http://128.199.61.201/api/weather.json';
        axios.get(url1)
            .then(response => {
                this.setState({json: response.data, rain: response.data.precipitation_amount_353, temperature: response.data.air_temperature_4});
                console.log(this.state);
            });


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
                     {this.state.address}
                </Text>



                {/*main picture*/}
                <Image
                    style={styles.mainImage}
                    source={require('./img/suncloudsnowrainthree.svg')}
                />

                {/*Flex table*/}
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={styles.infoText}>
                        Kelvin{'\n'}
                        <Text style={styles.info}>
                            {this.state.temperature}°
                        </Text>
                    </Text>



                    <Text style={styles.infoText}>
                        Rain{'\n'}
                        {/*infoRain temporary*/}
                        <Text style={styles.infoRain}>
                            {this.state.rain}mm{'\n'}
                        </Text>
                    </Text>
                </View>

                {/*Timestamp*/}
                <Text style={styles.timestamp}>
                    12:00
                </Text>

                {/*Button for estimates*/}
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <TouchableHighlight key='1' onPress={this.getWeather.bind(this, '1')}>
                        <Text style={styles.heading1}>
                            1H
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.getWeather.bind(this, '2')}>
                    <Text style={styles.heading2}>
                        2H
                    </Text>
                    </TouchableHighlight>
                        <TouchableHighlight onPress={this.getWeather.bind(this, '3')}>
                    <Text style={styles.heading3}>
                        3H
                    </Text>
                    </TouchableHighlight>
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
        fontSize: 15,
        marginLeft: 200,
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
export default App;