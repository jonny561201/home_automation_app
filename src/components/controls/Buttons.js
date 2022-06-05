import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './Buttons.styles';


export function GreenButton(props) {
    return (
        <TouchableOpacity>
            <Text type="submit" style={[styles.green, styles.myButton]} disabled={props.disabled} onClick={props.onPress}>{props.children}</Text>
        </TouchableOpacity>
    )
}

export function BlueButton(props) {
    return (
        <TouchableOpacity>
            <Text type="submit" style={[styles.blue, styles.toggleButton]} disabled={props.disabled} onClick={props.onPress}>{props.children}</Text>
        </TouchableOpacity>
    )
}

export function RedButton(props) {
    return (
        <TouchableOpacity>
            <Text type="submit" style={[styles.red, styles.myButton]} disabled={props.disabled} onClick={props.onPress}>{props.children}</Text>
        </TouchableOpacity>
    )
}
