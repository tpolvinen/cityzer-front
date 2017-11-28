'use strict';
var React = require('react-native');
var{
    StyleSheet,
} = React;
module.exports = StyleSheet.create({
    infoButton: {
        marginTop: 30,
        marginBottom: 20,
        borderWidth: 2,
        borderRadius: 10,
        marginLeft: 2,
        marginRight: 2,
        borderColor:'#ffffff',
        backgroundColor:'#faf658',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infotext: {
        width: 308,
        height: 75,
        color: 'black',
        textShadowColor:'white',
        textShadowRadius: 10,
        textShadowOffset: {width: 1, height: 1},
        fontSize: 30,
        textAlign: 'center',
        textAlignVertical:'center'
        },

    heading1: {
        width: 100,
        height: 75,
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderRadius: 10,
        marginLeft: 2,
        marginRight: 2,
        /*paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,*/
        overflow: 'hidden',
        textAlign: 'center',
        textAlignVertical:'center',
        borderColor:'#ffffff',
        backgroundColor:'#e6e255',
    },
    heading2: {
        width: 100,
        height: 75,
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderRadius: 10,
        marginLeft: 2,
        marginRight: 2,
        /*paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,*/
        overflow: 'hidden',
        textAlign: 'center',
        textAlignVertical:'center',
        borderColor:'#ffffff',
        backgroundColor:'#e6e255',
    },
    heading3: {
        width: 100,
        height: 75,
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderRadius: 10,
        marginLeft: 2,
        marginRight: 2,
        /*paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,*/
        overflow: 'hidden',
        textAlign: 'center',
        textAlignVertical:'center',
        borderColor: '#ffffff',
        backgroundColor: '#e6e255',
    }
});