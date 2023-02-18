import {Divider} from '@react-native-material/core';
import React, {useRef, useState} from 'react';
import { useTheme } from 'react-native-paper';
import {Animated, LayoutAnimation, Platform, TouchableOpacity, UIManager, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './accordion.styles';

export default function Accordion(props) {
    const theme = useTheme();
    const [expanded, setExpanded] = useState(false);
    const [slideDown, setSlideDown] = useState(false);
    const slide = useRef(new Animated.Value(-100)).current;
    const [rotateAnimation,] = useState(new Animated.Value(0));

    const interpolateRotating = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const toggleExpand = () => {
        props.onPress();
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const shouldExpand = !expanded;
        setExpanded(shouldExpand);
        // shouldExpand
        //     ? expand()
        //     : collapse()
        // doStuff();
    }

    const doStuff = () => {
        const shouldSlide = !slideDown;
        setSlideDown(shouldSlide);
        shouldSlide
            ? Animated.timing(slide, {toValue: 0, useNativeDriver: true, duration: 200}).start()
            : Animated.timing(slide, {toValue: -100, useNativeDriver: true, duration: 200}).start()
    }

    const expand = () => {
        Animated.timing(slide, {toValue: 0, duration: 250, useNativeDriver: true}).start(() => slide.setValue(0));
        Animated.timing(rotateAnimation, {toValue: 1, duration: 200, useNativeDriver: true})
            .start(() => {
                rotateAnimation.setValue(1)
            });
    };

    const collapse = () => {
        Animated.timing(slide, {toValue: -100, duration: 250, useNativeDriver: true}).start(() => slide.setValue(-100));
        Animated.timing(rotateAnimation, {toValue: 0, duration: 200, useNativeDriver: true})
            .start(() => {
                rotateAnimation.setValue(0);
            });
    };

    return (
        <View style={[styles.container, {shadowColor: theme.colors.shadow}]}>
            <TouchableOpacity style={styles.row} onPress={toggleExpand}>
                <View>{props.children[0]}</View>
                <Animated.View style={{transform: [{rotate: interpolateRotating}]}}>
                    <Icon name='keyboard-arrow-down' size={30} style={{color: theme.colors.font}} />
                </Animated.View>
            </TouchableOpacity>
            {
                expanded &&
                <View style={styles.expansion}>
                    <Divider style={[styles.divider, {backgroundColor: theme.colors.divider}]} />
                    <View style={styles.child}>
                        <Animated.View style={{transform: [{translateY: slide}]}}>{props.children[1]}</Animated.View>
                        {/*<Button title='Test' onPress={doStuff}/>*/}
                    </View>
                </View>
            }
        </View>
    )
}