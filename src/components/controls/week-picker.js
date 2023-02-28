import React from 'react';
import { View } from 'react-native';
import DayPicker from './day-picker';
import styles from './week-picker.styles';


export default function WeekPicker(props) {
    return (
        <View style={styles.weekdayPicker}>
            {
                props.daysOfWeek.map((weekday) => (
                    <DayPicker key={weekday.id + "-day-picker"} day={weekday} toggleDay={props.toggleDay} setEdited={props.setEdited} />
                ))
            }
        </View>
    )
}