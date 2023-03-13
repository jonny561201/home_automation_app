import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { GreenButton, RedButton } from '../../components/controls/buttons';
import DropDown from '../../components/controls/drop-down';
import TimePicker from '../../components/controls/time-picker';
import WeekPicker from '../../components/controls/week-picker';
import { Context } from '../../state/store';
import { insertLightTask } from '../../utilities/rest-api';
import styles from './create-light-event.sytles';


export default function CreateLightEvent(props) {
    const initialDays = [{ id: 'Sun', day: 'S', on: false }, { id: 'Mon', day: 'M', on: false }, { id: 'Tue', day: 'T', on: false }, { id: 'Wed', day: 'W', on: false }, { id: 'Thu', day: 'T', on: false }, { id: 'Fri', day: 'F', on: false }, { id: 'Sat', day: 'S', on: false }];
    const [state, dispatch] = useContext(Context);
    const [days, setDays] = useState();
    const [rooms, setRooms] = useState(state.lights.map((x) => x.groupName));
    const [edited, setEdited] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState();
    const [daysOfWeek, setDaysOfWeek] = useState(initialDays);
    const [selectedTime, setSelectedTime] = useState(new Date());


    const toggleDay = (task, newState) => {
        const newProjects = daysOfWeek.map(day => day.id === task.id
            ? { ...day, on: newState }
            : day
        );
        setDaysOfWeek(newProjects);
        setDays(newProjects.filter(x => x.on === true).map(y => y.id).join(''));
    }

    const submitEvent = async () => {
        props.close();
        const tasks = await insertLightTask(state.user.userId, state.auth.bearer, true, props.type, groupId, selectedRoom, days, time);
        dispatch({ type: 'SET_SCHEDULED_TASK', payload: tasks });
    }

    return (
        <>
            <View style={styles.eventRow}>
                <TimePicker style={styles.timePicker} value={selectedTime} onChange={setSelectedTime}/>
                <DropDown style={styles.dropDown} value={selectedRoom} label="Room" onChange={setSelectedRoom} data={rooms} placeholder='Room' />
            </View>

            <WeekPicker daysOfWeek={initialDays} toggleDay={toggleDay} setEdited={() => setEdited(true)} />

            <View style={styles.buttonRow}>
                <RedButton onPress={props.close}>Cancel</RedButton>
                <GreenButton onPress={submitEvent}>Add</GreenButton>
            </View>
        </>
    )
}