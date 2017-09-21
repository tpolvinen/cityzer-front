'use strict';

var React = require('react-native');

var myStyles = React.StyleSheet.create({
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
        marginTop: 10,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 20,
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
        height: 70,
        width: 70,
        fontSize: 50,
        marginTop: 26,
        borderWidth: 4,
        borderRadius: 10,
        overflow: 'hidden',
        textAlign: 'center',
        borderColor:'#ffffff',
        backgroundColor:'#b0e0e6',
    },
    heading2: {
        height: 70,
        width: 70,
        fontSize: 50,
        marginTop: 26,
        borderWidth: 4,
        borderRadius: 10,
        overflow: 'hidden',
        textAlign: 'center',
        borderColor:'#ffffff',
        backgroundColor:'#87ceeb',
    },
    heading3: {
        height: 70,
        width: 70,
        fontSize: 50,
        marginTop: 26,
        borderWidth: 4,
        borderRadius: 10,
        overflow: 'hidden',
        textAlign: 'center',
        borderColor:'#ffffff',
        backgroundColor:'#4682b4',
    },
    button: {
        width: 20,
        height: 20,
        fontSize: 20,
    },
});

module.exports = myStyles;