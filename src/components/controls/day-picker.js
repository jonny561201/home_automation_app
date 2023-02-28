import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import styles from './day-picker.styles';


export default function DayPicker(props) {
    const [on, setOn] = useState(props.day.on);
    const theme = useTheme();

    const toggleDay = () => {
        const updatedState = !on;
        props.toggleDay(props.day, updatedState);
        setOn(updatedState);
        props.setEdited();

        console.log(props.day)
    }

    return (
        <View style={styles.dayPicker}>
            <TouchableRipple
                style={[styles.dayPicker, on ? { backgroundColor: '#E0E0E0' } : { backgroundColor: theme.colors.primary }]}
                onPress={toggleDay}
                borderless={true}
                rippleColor='#4ce0a3'>
                <Text style={[{textAlign: 'center', fontWeight: 'bold' }, on ? {color: theme.colors.primary} : { color: theme.colors.primaryFont}]}>{props.day.day}</Text>
            </TouchableRipple>
        </View>
    )
}