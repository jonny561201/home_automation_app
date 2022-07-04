import React from 'react';
import { TouchableOpacity, Text, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './Buttons.styles';


export function GreenButton(props) {
    return (
        <TouchableOpacity style={styles.buttonContainer}>
            <Text type="submit" style={[styles.green, styles.myButton, props.style]} disabled={props.disabled} onPress={props.onPress}>{props.children}</Text>
        </TouchableOpacity>
    )
}

export function BlueButton(props) {
    return (
        <TouchableOpacity style={styles.buttonContainer}>
            <Text type="submit" style={[styles.blue, styles.toggleButton, props.style]} disabled={props.disabled} onPress={props.onPress}>{props.children}</Text>
        </TouchableOpacity>
    )
}

export function RedButton(props) {
    return (
        <TouchableOpacity style={styles.buttonContainer}>
            <Text type="submit" style={[styles.red, styles.myButton, props.style]} disabled={props.disabled} onPress={props.onPress}>{props.children}</Text>
        </TouchableOpacity>
    )
}


export function GreenSwitch(props) {
    return (
        <TouchableOpacity style={styles.switchContainer} onPress={props.onPress} >
            <Switch thumbColor={props.status ? "#00c774" : "#f4f3f4"} value={props.status} onValueChange={props.onPress}/>
            <Text style={styles.switchText}>{props.label}</Text>
        </TouchableOpacity>
    )
}

export function ExpandButton(props) {
    return (
        <TouchableOpacity style={[styles.expandButton, props.style]} onPress={props.onPress}>
            <MaterialIcons name='chevron-right' style={styles.expandChevron}/>
        </TouchableOpacity>
    )
}