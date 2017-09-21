import React from 'react';
import { View,
    TouchableHighlight,
    TouchableNativeFeedback,
    Text,
    Platform,
    Alert,
    Image,
    TouchableOpacity
} from 'react-native';

var s = require('cityzerFront/style.js');


export const Button = ({ text, onPress }) => {
        return (
            <TouchableOpacity
                onPress={ () => Alert.alert('Hey!', 'You handsome bastard.', [{text: 'Ok'}]) }
            >
                <Image
                    style={s.location}
                    source={{uri:'https://i.imgur.com/K67wWwj.gif'}}
                />
            </TouchableOpacity>
        );

};