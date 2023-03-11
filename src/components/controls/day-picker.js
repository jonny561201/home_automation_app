import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
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
    }

    return (
        <View style={styles.dayPicker}>
            <TouchableOpacity
                style={[styles.dayPicker, on ? { backgroundColor: '#E0E0E0' } : { backgroundColor: theme.colors.primary }]}
                onPress={toggleDay}
                borderless={true}
                rippleColor='#4ce0a3'>
                <Text style={[{textAlign: 'center', fontWeight: 'bold', fontSize: 18 }, on ? {color: theme.colors.primary} : { color: theme.colors.primaryFont}]}>{props.day.day}</Text>
            </TouchableOpacity>
        </View>
    )
}