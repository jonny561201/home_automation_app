import moment from 'moment/moment';
import React, { useContext, useState } from 'react';
import { View } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TextInput, useTheme } from 'react-native-paper';
import DropDown from '../../components/controls/drop-down';
import WeekPicker from '../../components/controls/week-picker';
import { Context } from '../../state/store';


export default function CreateLightEvent() {
    const initialDays = [{ id: 'Sun', day: 'S', on: false }, { id: 'Mon', day: 'M', on: false }, { id: 'Tue', day: 'T', on: false }, { id: 'Wed', day: 'W', on: false }, { id: 'Thu', day: 'T', on: false }, { id: 'Fri', day: 'F', on: false }, { id: 'Sat', day: 'S', on: false }];
    const theme = useTheme();
    const [state, dispatch] = useContext(Context);
    const [days, setDays] = useState();
    const [open, setOpen] = useState(false);
    const [rooms, setRooms] = useState(state.lights.map((x) => x.groupName));
    const [edited, setEdited] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState();
    const [daysOfWeek, setDaysOfWeek] = useState(initialDays);
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [value, setValue] = useState(moment(selectedTime).format('hh:mm a'));

    const handleConfirm = (date) => {
        setSelectedTime(date);
        setOpen(false);
    };

    const toggleDay = (task, newState) => {
        const newProjects = daysOfWeek.map(day => day.id === task.id
            ? { ...day, on: newState }
            : day
        );
        setDaysOfWeek(newProjects);
        setDays(newProjects.filter(x => x.on === true).map(y => y.id).join(''));
    }

    const handleChange = (newValue) => {
        console.log(moment(newValue).format('hh:mm a'))
    }

    return (
        <>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <View style={{ justifyContent: 'center' }}>
                    <TextInput
                        value={value}
                        outlineColor={theme.colors.primaryFont}
                        onChange={handleChange}
                        mode='outlined'
                        style={{ width: 140, marginLeft: 10 }}
                        textColor={theme.colors.secondaryFont}
                        activeOutlineColor={theme.colors.primary}
                        right={<TextInput.Icon icon='clock-outline' color={theme.colors.primaryFont} onPress={() => setOpen(true)} />}
                        label="Time" />
                </View>
                <DropDown style={{width: '60%'}} value={selectedRoom} label="Room" onChange={setSelectedRoom} data={rooms} placeholder='Room' />
            </View>

            <WeekPicker daysOfWeek={initialDays} toggleDay={toggleDay} setEdited={() => setEdited(true)} />

            <DateTimePickerModal
                date={selectedTime}
                isVisible={open}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={() => setOpen(false)}
            />
        </>
    )
}