import React, { Component } from 'react';
import {
    Image,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    AppState,
    Platform,
    ImageBackground
} from 'react-native';
import axios from 'axios';
import I18n from 'react-native-i18n'
import ScaleSheet from 'react-native-scalesheet';


class App extends Component {

    constructor(props){
        super(props);
        this.state ={
            lat: 60.201403,
            lon: 24.933598,
            error: null,
            address: null,
            addressNo: null,
            suburb: null,
            rain: null,
            temperature: null,
            json: [],
            appState: AppState.currentState,
            imgSrc: '',
            bgImg: ''
        };
        this.getWeather = this.getWeather.bind(this);
        this.weatherState = this.weatherState.bind(this);
    }
    state = { address: [] };

    KtoC(kelvin) {
        console.log(typeof kelvin +' '+ kelvin);
        const kelvinToCelsius = require('kelvin-to-celsius');
        let temp = parseFloat(kelvin);
        console.log(temp);
        temp = kelvinToCelsius(temp);
        temp = parseFloat(temp).toFixed(2);
        console.log(temp);
        //let temps = toString(temp);
        return temp.toString();
    };

    weatherState(x) {
        console.log(x);
        let imgSrc = '';
        if (this.state.temperature >= 0) {
            if (x <= 0.3) {
                this.imgSrc = require('./img/sun.png');
                this.bgImg = require('./img/blurbag/blur-backgrounds/blur-backgroundSun.jpg');
//Aurinkoinen sää
            } else if (x >= 0.31 && x <= 0.9) {

                this.imgSrc = require('./img/cloudrain.png');
                this.bgImg = require('./img/blurbag/blue-blurred-background.jpg');
//tihkuaa
            } else if (x >= 0.91 && x <= 4.4) {
                this.imgSrc = require('./img/cloudraintwo.png')
                this.bgImg = require('./img/blurbag/blue-blurred-background.jpg');
//sataa
            } else {
                this.imgSrc = require('./img/cloudrainthree.png')
                this.bgImg = require('./img/blurbag/blur-backgrounds/blur-backgroundDark.jpg');
//Sataa paljon vettä
            }
        }else{
            if (x <= 0.3) {
                this.imgSrc = require('./img/sun.png');
                this.bgImg = require('./img/blurbag/blur-backgrounds/blur-backgroundSun.jpg');
//Aurinkoinen sää
            } else if (x >= 0.31 && x <= 0.9) {

                this.imgSrc = require('./img/cloudsnow.png');
                this.bgImg = require('./img/blurbag/blue-blurred-background.jpg');
//Vähän lunta
            } else if (x >= 0.91 && x <= 4.4) {
                this.imgSrc = require('./img/cloudsnowtwo.png')
                this.bgImg = require('./img/blurbag/blue-blurred-background.jpg');
//Enemmän lunta
            } else {
                this.imgSrc = require('./img/cloudsnowthree.png')
                this.bgImg = require('./img/blurbag/blur-backgrounds/blur-backgroundDark.jpg');
//Vielä enemmän lunta
            }
        }


        console.log(imgSrc);
        return imgSrc;
    }

    getWeather(i) {
        this.urlCall()
        const rain = parseFloat(this.state.json.precipitation_amount_353).toFixed(2);
        const rain1 = parseFloat(this.state.json.precipitation_amount_353_1h).toFixed(2);
        const rain2 = parseFloat(this.state.json.precipitation_amount_353_2h).toFixed(2);
        const rain3 = parseFloat(this.state.json.precipitation_amount_353_3h).toFixed(2);
        let temperature = '';
        let imgSrc = '';
            switch (i) {
                case '0':
                    return this.setState({rain: rain, imgSrc: this.weatherState(rain), temperature: this.KtoC(this.state.json.air_temperature_4)});
                case '1':
                    return this.setState({rain: rain1, imgSrc: this.weatherState(rain1), temperature: this.KtoC(this.state.json.air_temperature_4_1h)});
                case '2':
                    return (this.setState({rain: rain2, imgSrc: this.weatherState(rain2), temperature: this.KtoC(this.state.json.air_temperature_4_2h)}));
                case '3':
                    return this.setState({rain: rain3, imgSrc: this.weatherState(rain3), temperature: this.KtoC(this.state.json.air_temperature_4_3h)});

                default:
                    this.setState({rain: parseFloat(this.state.json.precipitation_amount_353).toFixed(2), temperature: this.KtoC(this.state.json.air_temperature_4), imgSrc: this.weatherState(parseFloat(this.state.json.precipitation_amount_353).toFixed(2))});
            }
    }
    urlCall() {
        const url = 'http://128.199.61.201/api/weather.json';
        axios.get(url)
            .then(response => {
                if (this.state.rain == null) {
                    this.setState({
                        json: response.data,
                        rain: response.data.precipitation_amount_353,
                        temperature: this.KtoC(response.data.air_temperature_4)
                    });
                    console.log(this.state);
                }
            });
    }

    componentDidMount() {
        this.imgSrc = require('./img/sun.png');
        AppState.addEventListener('change', this._handleAppStateChange);
        navigator.geolocation.getCurrentPosition(
            (position) => {
               // this.setState({ lon: position.coords.longitude, lat: position.coords.latitude });
               const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.state.lat+','+this.state.lon+'&key=AIzaSyD-VCDRI-XxI1U-oz-5ujODryCQ1zSJi0U&language='+I18n.t('lang')+'&region='+I18n.t('lang');
               // const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.state.lat+','+this.state.lon+'&key=AIzaSyD-VCDRI-XxI1U-oz-5ujODryCQ1zSJi0U&language=FI&region=FI';
                axios.get(url)
                    //.then(response => console.log(response.data)
                    .then(response => this.setState({ address: response.data.results[0].address_components[1].long_name , addressNo: response.data.results[0].address_components[0].long_name , suburb: response.data.results[2].address_components[0].long_name})
                    );

            },
            (error) => this.setState({ address: "Paikannus ei onnistunut\nsää Helsingissä", lat:"24.940922", lon:"60.168630"}),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );

        this.urlCall();


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
                (error) => this.setState({ address: "Paikannus ei onnistunut \nSää Helsingissä" }),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            );
        }
        this.setState({appState: nextAppState});
        console.log(this.state.appState + ' ' + this.state.address);
    }

    render() {

        return (
            <ImageBackground source={this.bgImg} style={styles.backgroundImage} >
                    <View style={[styles.container, {flex:1}, stylesScale.container]}>

                {/*Address and get location button*/}
                <Text style={styles.welcome}>
                    <Image
                        style={[styles.location, stylesScale.location]}
                        source={{uri:'https://i.imgur.com/K67wWwj.gif'}}
                    />
                     {' '+this.state.address} {this.state.addressNo} {'\n'}
                     {this.state.suburb} {'\n\n'}
                </Text>

                {/*main picture*/}
                <Image
                    style={styles.mainImage}
                    source={this.imgSrc}

                />

                {/*Flex table*/}

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={[styles.infoText, stylesScale.infoText]}>
                        {I18n.t('temp')}{'\n'}
                        <Text style={styles.info}>
                            {this.state.temperature}°C
                        </Text>
                    </Text>

                    <Text style={[styles.infoText, stylesScale.infoText]}>
                        {I18n.t('rain')}{'\n'}
                        {/*infoRain temporary*/}
                        <Text style={styles.infoRain}>
                            {this.state.rain} mm/h{'\n'}
                        </Text>
                    </Text>
                </View>





                <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.getWeather.bind(this, '0')}>
                    <Text style={[styles.infoImage, stylesScale.infoImage]}>
                        {I18n.t('now')}
                    </Text>
                </TouchableOpacity>
                </View>

                {/*Button for estimates*/}
                <View style={[{flex: 1, flexDirection: 'row'}, stylesScale.buttons]}>
                    <TouchableOpacity onPress={this.getWeather.bind(this, '1')}>
                        <Text style={[styles.heading1, stylesScale.heading1]}>
                            1h
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.getWeather.bind(this, '2')}>
                    <Text style={[styles.heading2, stylesScale.heading2]}>
                        2h
                    </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.getWeather.bind(this, '3')}>
                    <Text style={[styles.heading3, stylesScale.heading3]}>
                        3h
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
    </ImageBackground>
        );
    }
}

I18n.fallbacks = true

I18n.translations = {
    en: {
        temp: 'Temperature',
        rain: 'Rain',
        now: 'Weather now',
        lang: 'FI'
    },
    fi: {
        temp: 'Lämpötila',
        rain: 'Sade',
        now: 'Sää nyt',
        lang: 'FI'
    },
    sv: {
        temp: 'Temperatur',
        rain: 'Regn',
        now: 'Väder nu',
        lang: 'SV'
    }
}

const stylesScale = ScaleSheet.create({
    container: {
        // 82.5% of the devices width, can also be written as '82.5vw'
        width: 100 + 'vw',

        // 57% of the devices height, can also be written as 57vh
        height: 100 + 'vh',


    },
    location: {
        // 82.5% of the devices width, can also be written as '82.5vw'
        width: 7 + 'vw',

        // 57% of the devices height, can also be written as 57vh
        height: 5 + 'vh',
    },
    mainImage: {
        // 82.5% of the devices width, can also be written as '82.5vw'
        width: 25 + 'vw',

        // 57% of the devices height, can also be written as 57vh
        height: 25 + 'vh',
    },


    timestamp: {
        // 82.5% of the devices width, can also be written as '82.5vw'
        width: 1 + 'vw',

        // 57% of the devices height, can also be written as 57vh
        height: 1 + 'vh',
    },
    buttons: {
        marginBottom: 3 +'vh'
    },
    infoImage: {
        // 82.5% of the devices width, can also be written as '82.5vw'
        width: 80 + 'vw',

        // 57% of the devices height, can also be written as 57vh

    },
    heading1: {
        // 82.5% of the devices width, can also be written as '82.5vw'
        width: 30 + 'vw',

        // 57% of the devices height, can also be written as 57vh



    },
    heading2: {
        // 82.5% of the devices width, can also be written as '82.5vw'
        width: 30 + 'vw',

        // 57% of the devices height, can also be written as 57vh



    },
    heading3: {
        // 82.5% of the devices width, can also be written as '82.5vw'
        width: 30 + 'vw',

        // 57% of the devices height, can also be written as 57vh




    }
});

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },

    container: {
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 20 : 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    location: {
        width: 40,
        height: 40,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        backgroundColor:'transparent'
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
        marginBottom: -30,
    },
    infoText: {
        fontSize: 25,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: -15,
        padding: 5,
        textAlign: 'center',
        backgroundColor:'transparent'
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
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 4,
        borderRadius: 10,
        marginLeft: 2,
        marginRight: 2,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        overflow: 'hidden',
        textAlign: 'center',
        borderColor:'#ffffff',
        backgroundColor:'#faf658',
    },
    heading1: {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 4,
        borderRadius: 10,
        marginLeft: 2,
        marginRight: 2,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        overflow: 'hidden',
        textAlign: 'center',
        borderColor:'#ffffff',
        backgroundColor:'#e6e255',
    },
    heading2: {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 4,
        borderRadius: 10,
        marginLeft: 2,
        marginRight: 2,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        overflow: 'hidden',
        textAlign: 'center',
        borderColor:'#ffffff',
        backgroundColor:'#bab643',
    },
    heading3: {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 4,
        borderRadius: 10,
        marginLeft: 2,
        marginRight: 2,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        overflow: 'hidden',
        textAlign: 'center',
        borderColor:'#ffffff',
        backgroundColor:'#aeaa42',
    },
});

export default App;