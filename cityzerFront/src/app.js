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
    ImageBackground,
    TextInput,
    Keyboard,
    Animated
} from 'react-native';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import I18n from 'react-native-i18n';
import ScaleSheet from 'react-native-scalesheet';
import rainStyle from './components/rainStyle';
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
            bgImg: '',
            buttonStyle: require('./components/sunStyle.js') ,
            rainState:  require('./components/rainStyle.js'),
            text: '',
            chill: null,
            fadeAnim: new Animated.Value(0),
            img1: require('./img/blurbag/dark_blue.jpg'),
            img2: require('./img/blurbag/blue.jpg'),
            img3: require('./img/blurbag/light_blue.jpg'),
            actB1: '',
            actB2: '',
            actB3: '',
            actB4: ''
        };
        this.getWeather = this.getWeather.bind(this);
        this.weatherState = this.weatherState.bind(this);
    }


    state = { address: [] };

    KtoC(kelvin) {
        const kelvinToCelsius = require('kelvin-to-celsius');
        let temp = parseFloat(kelvin);
        temp = kelvinToCelsius(temp);
        temp = parseFloat(temp).toFixed(0);
        return temp.toString();
    };

    weatherState(x,y) {

        let imgSrc = '';
        var time = new Date().getHours().toLocaleString();
        time = parseInt(time);

        //y = lämpötila & x = sademäärä
        // yli +2°C, sade tulee vetenä
        if (y > 2) {

            // ei sadetta
            if (x <= 0.3){
                if (time > 21 && time <= 5){
                    this.imgSrc = require('./img/moon.png');}
                else {
                    this.imgSrc = require('./img/sun.png');
                }
                this.bgImg = require('./img/blurbag/light_blue.jpg');
                this.state.buttonStyle = require('./components/sunStyle');

            } else if (x >= 0.31 && x <= 0.9) {
                // tihkuaa
                this.imgSrc = require('./img/cloudrain.png');
                this.bgImg = require('./img/blurbag/light_blue.jpg');
                this.state.buttonStyle = require('./components/rainStyle');

            } else if (x >= 0.91 && x <= 4.4) {
                // sataa
                this.imgSrc = require('./img/cloudraintwo.png');
                this.bgImg = require('./img/blurbag/blue.jpg');
                this.state.buttonStyle = require('./components/rain2Style');

                // sataa paljon
            } else {
                this.imgSrc = require('./img/cloudrainthree.png');
                this.bgImg = require('./img/blurbag/dark_blue.jpg');
                this.state.buttonStyle = require('./components/rain3Style');
            }
        }

        // 0 ja +2°C välissä, loskaa
        else if(y > 0 && y <= 2) {
            if (x <= 0.3) {
                if (time > 21 && time <= 5){
                    this.imgSrc = require('./img/moon.png');}
                else {
                    this.imgSrc = require('./img/sun.png');
                }
                this.bgImg = require('./img/blurbag/light_blue.jpg');
                this.state.buttonStyle = require('./components/sunStyle');

            } else if (x >= 0.31 && x <= 0.9) {

                this.imgSrc = require('./img/cloudsnowrain.png');
                this.bgImg = require('./img/blurbag/light_blue.jpg');
                this.state.buttonStyle = require('./components/rainStyle');

            } else if (x >= 0.91 && x <= 4.4) {
                this.imgSrc = require('./img/cloudsnowraintwo.png');
                this.bgImg = require('./img/blurbag/blue.jpg');
                this.state.buttonStyle = require('./components/rain2Style');

            } else {
                this.imgSrc = require('./img/cloudsnowrainthree.png');
                this.bgImg = require('./img/blurbag/dark_blue.jpg');
                this.state.buttonStyle = require('./components/rain3Style');
            }
        }

        // alle 0, lunta
        else{
            if (x <= 0.3) {
                if (time > 21 && time <= 5){
                    this.imgSrc = require('./img/moon.png');}
                else {
                    this.imgSrc = require('./img/sun.png');
                    this.state.buttonStyle = require('./components/sunStyle');
                }
                this.bgImg = require('./img/blurbag/light_blue.jpg');
//Aurinkoinen sää
            } else if (x >= 0.31 && x <= 0.9) {

                this.imgSrc = require('./img/cloudsnow.png');
                this.bgImg = require('./img/blurbag/light_blue.jpg');
                this.state.buttonStyle = require('./components/rainStyle');
//Vähän lunta
            } else if (x >= 0.91 && x <= 4.4) {
                this.imgSrc = require('./img/cloudsnowtwo.png');
                this.bgImg = require('./img/blurbag/blue.jpg');
                this.state.buttonStyle = require('./components/rain2Style');
//Enemmän lunta
            } else {
                this.imgSrc = require('./img/cloudsnowthree.png');
                this.bgImg = require('./img/blurbag/dark_blue.jpg');
                this.state.buttonStyle = require('./components/rain3Style');
//Vielä enemmän lunta
            }
        }


        return imgSrc;
    }
    getAddress() {
        Keyboard.dismiss();
        Geocoder.setApiKey('AIzaSyD-VCDRI-XxI1U-oz-5ujODryCQ1zSJi0U');
        Geocoder.getFromLocation(this.state.text).then(
            json => {
                var location = json.results[0].geometry.location;
                this.setState({lat: location.lat, lon: location.lng});
                this.urlCall()
                this.setState({address: json.results[0].address_components[1].long_name, addressNo: json.results[0].address_components[0].long_name, suburb: json.results[0].address_components[3].long_name});
            },
            error => {
                console.log(error);
            }
        );
    }

    getWeather(i) {
       // this.urlCall();

        if(this.state.json !== null) {


            console.log('+++++');
            console.log(this.state.json);

            const rain = parseFloat(this.state.json.precipitation_amount_353).toFixed(1);
            const temperature = parseFloat(this.KtoC(this.state.json.air_temperature_4));
            const rain1 = parseFloat(this.state.json.precipitation_amount_353_1h).toFixed(1);
            const temperature1 = parseFloat(this.KtoC(this.state.json.air_temperature_4_1h));
            const rain2 = parseFloat(this.state.json.precipitation_amount_353_2h).toFixed(1);
            const temperature2 = parseFloat(this.KtoC(this.state.json.air_temperature_4_2h));
            const rain3 = parseFloat(this.state.json.precipitation_amount_353_3h).toFixed(1);
            const temperature3 = parseFloat(this.KtoC(this.state.json.air_temperature_4_3h));
            let imgSrc = '';
            this.setState({actB1: '', actB2:'',actB3:'', actB4:''});

            switch (i) {
                case '0':
                    console.log('1')
                    this.setState({actB1: styles.activeBtn})
                    return this.setState({
                        rain: rain,
                        imgSrc: this.weatherState(rain, temperature),
                        temperature: this.KtoC(this.state.json.air_temperature_4),
                        chill: this.KtoC(this.state.json.windchill_air_temp)
                    });
                case '1':
                    console.log('2');
                    this.setState({actB2: styles.activeBtn})
                    return this.setState({
                        rain: rain1,
                        imgSrc: this.weatherState(rain1, temperature1),
                        temperature: this.KtoC(this.state.json.air_temperature_4_1h),
                        chill: this.KtoC(this.state.json.windchill_air_temp_1h)
                    });
                case '2':
                    console.log('3');
                    this.setState({actB3: styles.activeBtn})
                    return (this.setState({
                        rain: rain2,
                        imgSrc: this.weatherState(rain2, temperature2),
                        temperature: this.KtoC(this.state.json.air_temperature_4_2h),
                        chill: this.KtoC(this.state.json.windchill_air_temp_2h)
                    }));
                case '3':
                    console.log('4');
                    this.setState({actB4: styles.activeBtn})
                    return this.setState({
                        rain: rain3,
                        imgSrc: this.weatherState(rain3, temperature3),
                        temperature: this.KtoC(this.state.json.air_temperature_4_3h),
                        chill: this.KtoC(this.state.json.windchill_air_temp_3h)
                    });

                default:
                    console.log('defautlt');
                    this.setState({

                        rain: parseFloat(this.state.json.precipitation_amount_353).toFixed(1),
                        temperature: this.KtoC(this.state.json.air_temperature_4),
                        imgSrc: this.weatherState(parseFloat(this.state.json.precipitation_amount_353).toFixed(1)),
                        chill: this.KtoC(this.state.json.windchill_air_temp)
                    });
            }
        }

   }


    urlCall() {
        //const url = 'http://128.199.61.201:8080/cityzer/api/getWeather?userLat='+this.state.lat+'&userLon='+this.state.lon;
        const url = 'http://ctzr.me:8080/cityzer/api/getWeather?userLat=60.201953770612505&userLon=24.934014050581936';

        axios.get(url)
            .then(response => {
                this.setState({
                        json: response.data,
                        rain: response.data.precipitation_amount_353.toFixed(1),
                        temperature: this.KtoC(response.data.air_temperature_4),
                        chill: this.KtoC(response.data.windchill_air_temp),
                    });



                    this.getWeather()

                this.getWeather()
            })
            .catch(error => {
                console.log(error.response)
            });
    }

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
            },
        ).start();
        this.bgImg = require('./img/blurbag/light_blue.jpg');
        AppState.addEventListener('change', this._handleAppStateChange);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({lon: position.coords.longitude, lat: position.coords.latitude});
                const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.state.lat + ',' + this.state.lon + '&key=AIzaSyD-VCDRI-XxI1U-oz-5ujODryCQ1zSJi0U&language=' + I18n.t('lang') + '&region=' + I18n.t('lang');
                axios.get(url)
                    .then(response => this.setState({
                            address: response.data.results[0].address_components[1].long_name,
                            addressNo: response.data.results[0].address_components[0].long_name,
                            suburb: response.data.results[2].address_components[0].long_name
                        })
                    );
            },
            (error) => this.setState({
                address: I18n.t('fail'),
                lat: "24.940922",
                lon: "60.168630",
                addressNo: null,
                suburb: null
            }),
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
            (error) => this.setState({address: I18n.t('fail'), lat: "24.940922", lon: "60.168630"}),
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
        );
        this.urlCall();
    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({ lon: position.coords.longitude, lat: position.coords.latitude });
                    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.state.lat+','+this.state.lon+'&key=AIzaSyD-VCDRI-XxI1U-oz-5ujODryCQ1zSJi0U&language='+I18n.t('lang')+'&region='+I18n.t('lang');
                    axios.get(url)
                        .then(response => this.setState(
                            { address: response.data.results[0].address_components[1].long_name }));
                },
                (error) => this.setState({ address: I18n.t('fail'), lat:"24.940922", lon:"60.168630", addressNo: null, suburb: null}),
                { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
            );
        }
        this.setState({appState: nextAppState});
    }

    renderTempinfo(){
        if (this.state.temperature !== null){
            return(
                <Text style={styles.infoText}>
                    {I18n.t('temp')}{'\n'}
                    <Text style={styles.info}>
                        {this.state.temperature.replace(".", ",")}°C 
                    </Text>
                    <Text style={styles.info2} >
                        {' '}({this.state.chill.replace(".", ",")}°C)
                    </Text>
                </Text>
            )
        }else{
            return(
                <Text style={styles.infoText}>
                    {I18n.t('temp')}{'\n'}
                    <Text style={styles.info}>
                        °C
                    </Text>
                </Text>
            )
        }
    }

    renderRainInfo() {
        if (this.state.rain !== null) {
            if (this.state.temperature > 2 && this.state.rain > 0.2) {
                return (
                    <Text style={styles.infoText}>
                        {I18n.t('rain')}{'\n'}
                        <Text style={styles.infoRain}>
                            {this.state.rain.replace(".", ",")} mm/h{'\n'}
                        </Text>
                    </Text>
                )
            }
            else if (this.state.temperature  >= 0 && this.state.temperature <= 2 && this.state.rain > 0.2) {
                return (
                    <Text style={styles.infoText}>
                        {I18n.t('sleet')}{'\n'}
                        <Text style={styles.infoRain}>
                            {this.state.rain.replace(".", ",")} mm/h{'\n'}
                        </Text>
                    </Text>
                )
            }else if (this.state.temperature  <0 && this.state.rain > 0.2) {
                return (
                    <Text style={styles.infoText}>
                        {I18n.t('snow')}{'\n'}
                        <Text style={styles.infoRain}>
                            {this.state.rain.replace(".", ",")} cm/h{'\n'}
                        </Text>
                    </Text>)
            }else {
                return (
                    <Text style={styles.infoText}>
                        {I18n.t('dry')}{'\n'}
                        <Text style={styles.infoRain}>
                            {this.state.rain.replace(".", ",")} mm/h{'\n'}
                        </Text>
                    </Text>)
                }
            }else{
            return(
                <Text style={styles.infoText}>
                    {I18n.t('sleet')}{'\n'}
                    <Text style={styles.infoRain}>
                        mm/h{'\n'}
                    </Text>
                </Text>
            )
        }
    }

    renderImg(){
        if (this.state.rain !== null){
            return(

                <Animated.Image
                    style={{opacity: this.state.fadeAnim, width: 200, height: 200,}}
                    source={this.imgSrc}
                />
            )

        }
    }

    renderAddress(){
        if (this.state.address !== null){
            return(
                <Text style={styles.address}>
                    <Image
                        style={styles.location}
                        source={{uri: 'https://i.imgur.com/K67wWwj.gif'}}/>
                    {' ' + this.state.address} {this.state.addressNo} {'\n'}
                    {this.state.suburb} {'\n\n'}
                </Text>
            )
        }else{
            return(
                <Text style={styles.address}>
                    <Image
                        style={styles.location}
                        source={{uri: 'https://i.imgur.com/K67wWwj.gif'}}/>
                    {'\n\n\n\n'}
                </Text>
            )
        }
    }

    renderBtnNow(){
        return(
            <TouchableOpacity style={[this.state.buttonStyle.infoButton, this.state.actB1]}
                              onPress={this.getWeather.bind(this, '0')}>
                <Text style={this.state.buttonStyle.infotext}>
                    {I18n.t('now')}
                </Text>
            </TouchableOpacity>
        )
    }

    renderBtn1(){
        return(
            <TouchableOpacity onPress={this.getWeather.bind(this, '1')}>
                <Text style={[this.state.buttonStyle.heading1, this.state.actB2]}>
                    +1h
                </Text>
            </TouchableOpacity>
        )
    }

    renderBtn2(){
        return(
            <TouchableOpacity onPress={this.getWeather.bind(this, '2')}>
                <Text style={[this.state.buttonStyle.heading2, this.state.actB3]}>
                    +2h
                </Text>
            </TouchableOpacity>
        )
    }
    renderBtn3(){
        return(
            <TouchableOpacity onPress={this.getWeather.bind(this, '3')}>
                <Text style={[this.state.buttonStyle.heading3, this.state.actB4]}>
                    +3h
                </Text>
            </TouchableOpacity>
        )
    }

    renderPred(){
        return(
            <View>
                <Text style={[styles.heading4, stylesScale.heading4,]}>
                    {I18n.t('pre')}
                </Text>
            </View>
        )
    }

    renderSearch(){
        return(
            <View style={{flex: 1, flexDirection: 'row'}}>
                <TextInput
                    style={{height: 40, width:200 }}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    onSubmitEditing={this.getAddress.bind(this)}/>
                <TouchableOpacity onPress={this.getAddress.bind(this)}>
                    <Image source={require('./img/haku.png')} style={{height: 40, width: 40, backgroundColor: 'rgba(0,0,0,0)'}} />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <ImageBackground source={this.bgImg} style={styles.backgroundImage}>
                <View style={[styles.container, {flex: 1, flexDirection: 'column'}]}>
                    <View style={{flex: 1}}>
                        {this.renderAddress()}
                    </View>
                    <View style={{flex: 1}}>
                        {this.renderSearch()}
                    </View>
                    <View style={{flex: 3}}>
                        {this.renderImg()}
                    </View>
                    <View style={{flex: 1, flexDirection:'row'}}>
                        {this.renderTempinfo()}
                        {this.renderRainInfo()}
                    </View>
                    <View style={{flex: 1}}>
                        {this.renderBtnNow()}
                    </View>
                    <View style={{flex: 2, flexDirection:'column', paddingTop: 20}}>
                        {this.renderPred()}
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        {this.renderBtn1()}
                        {this.renderBtn2()}
                        {this.renderBtn3()}
                        </View>
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
        lang: 'FI',
        pre: 'Predictions',
        fail: 'GPS Not found \n Weather in Helsinki',
        snow: 'Snow',
        sleet: 'Sleet',
        dry: 'Dry',
        search: 'Search'
    },
    fi: {
        temp: 'Lämpötila',
        rain: 'Sade',
        now: 'Sää nyt',
        lang: 'FI',
        pre: 'Ennusteet',
        fail: 'Paikannus ei onnistunut \n Sää Helsingissä',
        snow: 'Lunta',
        sleet: 'Räntää',
        dry: 'Poutaa',
        search: 'Etsi'
    },
    sv: {
        temp: 'Temperatur',
        rain: 'Regn',
        now: 'Väder nu',
        lang: 'SV',
        pre: 'Prognoser',
        fail: 'Lokaliseringen mislyckades \n Vädret i Helsingfors',
        snow: 'Snö',
        sleet: 'Slask',
        dry: 'Uppehåll',
        search: 'Söka'
    }
}

const stylesScale = ScaleSheet.create({
    container: {
        width: 100 + 'vw',
        height: 100 + 'vh',
    },
    location: {
        width: 7 + 'vw',
        height: 5 + 'vh',
    },
    mainImage: {
        width: 25 + 'vw',
        height: 25 + 'vh',
    },
    timestamp: {
        width: 1 + 'vw',
        height: 1 + 'vh',
    },
    buttons: {
        marginBottom: 7 +'vh'
    },
    infoButton: {
        width: 80 + 'vw',
    },
    heading1: {
    },
    heading2: {
        width: 30 + 'vw',
    },
    heading3: {
        width: 30 + 'vw',
    },
});

const styles = StyleSheet.create({
    activeBtn: {
        borderWidth: 7
    },
    backgroundImage: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 20 : 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addressRow: {
        marginTop: 20,
    },
    location: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    addressInput: {
        height: 40,
        width:200,

        justifyContent: 'center',
        alignItems: 'center'
    },
    searchButton: {
        height: 40,
        width: 40,
        backgroundColor: 'rgba(0,0,0,0)',
        marginLeft: 10,
    },
    address: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        backgroundColor:'transparent',
        color: '#FFFFFF',
    },
    mainImage: {
        width: 200,
        height: 200,
        resizeMode: 'cover'
    },
    infoText: {
        color: '#FFFFFF',
        textShadowColor:'black',
        textShadowRadius: 5,
        textShadowOffset: {width: 1, height: 1},
        fontSize: 30,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: -50,
        textAlign: 'center',
        backgroundColor:'transparent'
    },
    info: {
        fontSize: 30,
        color: '#ffffff',
        width: 50,
        height: 50,
    },
    info2: {
        fontSize: 20,
        color: '#b7e6ff',
        width: 50,
        height: 50,
    },
    infoRain: {
        fontSize: 30,
        color: '#ffffff',
        width: 50,
        height: 50,
    },
    infoButton: {
        fontSize: 15,
        marginTop: 30,
        marginBottom: 10,
        borderWidth: 4,
        borderRadius: 10,
        marginLeft: 2,
        marginRight: 2,
        overflow: 'hidden',
        textAlign: 'center',
        borderColor:'#ffffff',
        backgroundColor:'#faf658',
    },
    heading1: {
        fontSize: 25,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 4,
        borderRadius: 10,
        marginLeft: 2,
        marginRight: 2,
        overflow: 'hidden',
        textAlign: 'center',
        borderColor:'#ffffff',
        backgroundColor:'#e6e255',
    },
    heading2: {
        fontSize: 25,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 4,
        borderRadius: 10,
        marginLeft: 2,
        marginRight: 2,
        overflow: 'hidden',
        textAlign: 'center',
        borderColor:'#ffffff',
        backgroundColor:'#bab643',
    },
    heading3: {
        fontSize: 25,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 4,
        borderRadius: 10,
        marginLeft: 2,
        marginRight: 2,
        overflow: 'hidden',
        textAlign: 'center',
        borderColor:'#ffffff',
        backgroundColor:'#aeaa42',
    },
    heading4: {
        color: "#FFFFFF",
        backgroundColor:'rgba(0,0,0,0)',
        textShadowColor:'black',
        textShadowOffset: {width: 1, height: 1},
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 2,
        marginRight: 2,
        overflow: 'hidden',
        textAlign: 'center',
        textAlignVertical:'center'
    },
});
export default App;