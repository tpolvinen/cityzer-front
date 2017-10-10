import React, { Component } from 'react';
import {
    Image,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    AppState
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
            addressNo: null,
            suburb: null,
            rain: null,
            temperature: null,
            json: [],
            appState: AppState.currentState,
            imgSrc: 'http://kirjasto.poytya.fi/kilpailu/joulupukki1.JPG'
        };
        this.getWeather = this.getWeather.bind(this);
    }
    state = { address: [] };

    KtoC(kelvin) {
        console.log(typeof kelvin +' '+ kelvin);
        const kelvinToCelsius = require('kelvin-to-celsius');
        let temp = parseFloat(kelvin);
        console.log(temp);
        temp = kelvinToCelsius(temp);
        console.log(temp);
        //let temps = toString(temp);
        return temp.toString();
    };

    weatherState(x) {
        console.log(x);
        let imgSrc = '';

        if (x <= 0.3) {
            imgSrc = 'http://www.temasajten.se/wp-content/uploads/2016/06/solen-1.jpg';
//Aurinkoinen sää
        } else if (x >= 0.31 && x <= 0.9) {
            imgSrc = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Weather-overcast.svg/1000px-Weather-overcast.svg.png'
//tihkuaa
        } else if (x >= 0.91 && x <= 4.4) {
            imgSrc = 'data:image/jpeg;base64,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'
//sataa
        } else {
            imgSrc = 'http://moziru.com/images/clouds-clipart-sad-13.png'
//Sataa paljon
        }
        console.log(imgSrc);
        return imgSrc;
    }


    getWeather(i) {
        const rain = parseFloat(this.state.json.precipitation_amount_353_1h).toFixed(2);
        const rain2 = parseFloat(this.state.json.precipitation_amount_353_2h).toFixed(2);
        const rain3 = parseFloat(this.state.json.precipitation_amount_353_3h).toFixed(2);
        let temperature = '';
        let imgSrc = '';
            switch (i) {
                case '1':
                    return this.setState({rain: rain, imgSrc: this.weatherState(rain), temperature: this.KtoC(this.state.json.air_temperature_4_1h)});
                case '2':
                    let temperature = this.KtoC(this.state.json.air_temperature_4_2h);
                    console.log(typeof temperature +' '+ temperature);
                    return (this.setState({rain: rain2, imgSrc: this.weatherState(rain2), temperature: temperature}));
                case '3':
                    return this.setState({rain: rain3, imgSrc: this.weatherState(rain3), temperature: this.KtoC(this.state.json.air_temperature_4_3h)});
                default:
                    this.setState({rain: parseFloat(this.state.json.precipitation_amount_353).toFixed(2), temperature: this.KtoC(this.state.json.air_temperature_4), imgSrc: this.weatherState(parseFloat(this.state.json.precipitation_amount_353).toFixed(2))});
            }
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({ lon: position.coords.longitude, lat: position.coords.latitude });
                const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.state.lat+','+this.state.lon+'&key=AIzaSyD-VCDRI-XxI1U-oz-5ujODryCQ1zSJi0U';
                axios.get(url)
                    //.then(response => console.log(response.data)
                    .then(response => this.setState({ address: response.data.results[0].address_components[1].long_name , addressNo: response.data.results[0].address_components[0].long_name , suburb: response.data.results[2].address_components[0].long_name})
                    );

            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );

        const url1 = 'http://128.199.61.201/api/weather.json';
        axios.get(url1)
            .then(response => {
                this.setState({
                    json: response.data,
                    rain: parseFloat(response.data.precipitation_amount_353).toFixed(2),
                    temperature: this.KtoC(response.data.air_temperature_4)});
                console.log(this.state);
            });


    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log(this.state.appState);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({ lon: position.coords.longitude, lat: position.coords.latitude });
                    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.state.lat+','+this.state.lon+'&key=AIzaSyD-VCDRI-XxI1U-oz-5ujODryCQ1zSJi0U';
                    axios.get(url)
                        .then(response => this.setState(
                            { address: response.data.results[0].address_components[1].long_name }));
                },
                (error) => this.setState({ error: error.message }),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            );
        }
        this.setState({appState: nextAppState});
        console.log(this.state.appState + ' ' + this.state.address);
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
                     {this.state.address} {this.state.addressNo}{'\n'}
                     {this.state.suburb}
                </Text>



                {/*main picture*/}
                <Image
                    style={styles.mainImage}

                    source={{uri: this.state.imgSrc}}

                />


                {/*Flex table*/}
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={styles.infoText}>
                        Celcius{'\n'}
                        <Text style={styles.info}>
                            {this.state.temperature}°
                        </Text>
                    </Text>



                    <Text style={styles.infoText}>
                        Rain{'\n'}
                        {/*infoRain temporary*/}
                        <Text style={styles.infoRain}>
                            {this.state.rain}mm/h{'\n'}
                        </Text>
                    </Text>
                </View>

                {/*Timestamp*/}
                <Text style={styles.timestamp}>
                    12:00
                </Text>


                <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.getWeather.bind(this, '_')}>
                    <Text style={styles.heading1}>
                       Weather Now
                    </Text>
                </TouchableOpacity>
                </View>

                {/*Button for estimates*/}
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <TouchableOpacity onPress={this.getWeather.bind(this, '1')}>
                        <Text style={styles.heading1}>
                            1H
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.getWeather.bind(this, '2')}>
                    <Text style={styles.heading2}>
                        2H
                    </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.getWeather.bind(this, '3')}>
                    <Text style={styles.heading3}>
                        3H
                    </Text>
                    </TouchableOpacity>
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
        width: 300,
        height: 300,
        marginTop: -70,
        marginBottom: -40,
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