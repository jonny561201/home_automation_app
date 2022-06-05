import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './Buttons.styles';


export function GreenButton(props) {
    return (
        <TouchableOpacity style={styles.buttonContainer}>
            <Text type="submit" style={[styles.green, styles.myButton, props.style]} disabled={props.disabled} onClick={props.onPress}>{props.children}</Text>
        </TouchableOpacity>
    )
}

export function BlueButton(props) {
    return (
        <TouchableOpacity style={styles.buttonContainer}>
            <Text type="submit" style={[styles.blue, styles.toggleButton, props.style]} disabled={props.disabled} onClick={props.onPress}>{props.children}</Text>
        </TouchableOpacity>
    )
}

export function RedButton(props) {
    return (
        <TouchableOpacity style={styles.buttonContainer}>
            <Text type="submit" style={[styles.red, styles.myButton, props.style]} disabled={props.disabled} onClick={props.onPress}>{props.children}</Text>
        </TouchableOpacity>
    )
}
