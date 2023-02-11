import React, { useState } from 'react';
import { View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { TouchableOpacity, Text, Switch, UIManager, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './buttons.styles';


export function GreenButton(props) {
    return (
        <View style={[styles.buttonContainer]}>
            <TouchableRipple style={[styles.green, styles.myButton, props.style]} onPress={props.onPress} rippleColor='#4ce0a3' borderless={true}>
                <Text style={styles.buttonText} disabled={props.disabled} >{props.children}</Text>
            </TouchableRipple>
        </View>
    )
}

export function BlueButton(props) {
    return (
        <View style={[styles.buttonContainer]}>
            <TouchableRipple style={[styles.blue, styles.myButton, props.style]} onPress={props.onPress} rippleColor='#5c9dff' borderless={true}>
                <Text style={styles.buttonText} disabled={props.disabled} >{props.children}</Text>
            </TouchableRipple>
        </View>
    )
}

export function RedButton(props) {
    return (
        <View style={[styles.buttonContainer]}>
            <TouchableRipple style={[styles.red, styles.myButton, props.style]} onPress={props.onPress} rippleColor='#fa8484' borderless={true}>
                <Text style={styles.buttonText} disabled={props.disabled} >{props.children}</Text>
            </TouchableRipple>
        </View>
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
    const iconDirection = props.direction;
    const rotate = props.rotate;
    const color = props.color;
    const [expanded, setExpandeded] = useState(false);
    const [rotateAnimation,] = useState(new Animated.Value(0));

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const interpolateRotating = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', `${rotate}deg`],
    });

    const rotateStyle = {
        transform: [
            {
                rotate: interpolateRotating,
            },
        ],
    };

    const getIcon = () => {
        if (iconDirection === 'up')
            return 'expand-less'
        else if (iconDirection === 'down')
            return 'expand-more'
        else if (iconDirection === 'left')
            return 'chevron-left'
        else if (iconDirection === 'right')
            return 'chevron-right'
        else
            return 'expand-more'
    };

    const toggle = () => {
        props.onPress();
        expanded ? collapse() : expand()
        setExpandeded(!expanded);
    };

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
                <MaterialIcons color={color} name={getIcon()} style={styles.expandChevron} />
            </Animated.View>
        </TouchableOpacity>
    )
}