import React, { useState } from 'react';
import { TouchableOpacity, Text, Switch, UIManager, Animated } from 'react-native';
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
            <Switch thumbColor={props.status ? "#00c774" : "#f4f3f4"} value={props.status} onValueChange={props.onPress} />
            <Text style={styles.switchText}>{props.label}</Text>
        </TouchableOpacity>
    )
}

export function ExpandButton(props) {
    const [expanded, setExpandeded] = useState(false);
    const [rotateAnimation,] = useState(new Animated.Value(0));

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const interpolateRotating = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });

    const rotateStyle = {
        transform: [
            {
                rotate: interpolateRotating,
            },
        ],
    };

    const toggle = () => {
        // props.onPress();
        expanded ? collapse() : expand()
        setExpandeded(!expanded);
    }

    const expand = () => {
        Animated.timing(rotateAnimation, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start(() => {
            rotateAnimation.setValue(1)
        });
    };

    const collapse = () => {
        Animated.timing(rotateAnimation, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        }).start(() => {
            rotateAnimation.setValue(0);
        });
    };

    return (
        <TouchableOpacity style={[styles.expandButton]} onPress={toggle}>
            <Animated.View style={rotateStyle}>
                <MaterialIcons name='chevron-right' style={styles.expandChevron} />
            </Animated.View>
        </TouchableOpacity>
    )
}