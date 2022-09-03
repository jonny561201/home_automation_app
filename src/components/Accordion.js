import { Divider } from '@react-native-material/core';
import React, { useState } from 'react';
import { Animated, LayoutAnimation, Platform, TouchableOpacity, UIManager, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './Accordion.styles';

export default function Accordion(props) {
    const [expanded, setExpanded] = useState(false);
    const [rotateAnimation,] = useState(new Animated.Value(0));

    const interpolateRotating = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const rotateStyle = {
        transform: [
            {
                rotate: interpolateRotating,
            },
        ],
    };

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const toggleExpand = () => {
        props.onPress();
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const shouldExpand = !expanded;
        setExpanded(shouldExpand);
        shouldExpand
            ? expand()
            : collapse()
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
        <View style={styles.container}>
            <TouchableOpacity style={styles.row} onPress={toggleExpand}>
                <View>{props.children[0]}</View>
                <Animated.View style={rotateStyle}>
                    <Icon name='keyboard-arrow-down' size={30} />
                </Animated.View>
            </TouchableOpacity>
            {
                expanded &&
                <View style={styles.expansion}>
                    <Divider style={styles.divider} />
                    <View style={styles.child}>
                        <View>{props.children[1]}</View>
                    </View>
                </View>
            }
        </View>
    )
}