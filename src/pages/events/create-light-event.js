import React, { useState, useContext } from 'react';
import { Context } from '../../state/store';
import { View, SafeAreaView } from "react-native"
import moment from 'moment/moment';
import { Picker } from '@react-native-picker/picker';
import DropDown from "react-native-paper-dropdown";
import { useTheme, TextInput, Provider } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './create-light-event.sytles'
import WeekPicker from '../../components/controls/week-picker';


export default function CreateLightEvent() {
    const initialDays = [{ id: 'Sun', day: 'S', on: false }, { id: 'Mon', day: 'M', on: false }, { id: 'Tue', day: 'T', on: false }, { id: 'Wed', day: 'W', on: false }, { id: 'Thu', day: 'T', on: false }, { id: 'Fri', day: 'F', on: false }, { id: 'Sat', day: 'S', on: false }];
    const theme = useTheme();
    const [state, dispatch] = useContext(Context);
    const [days, setDays] = useState();
    const [open, setOpen] = useState(false);
    const [openSelect, setOpenSelect] = useState(false);
    const [edited, setEdited] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState();
    const [daysOfWeek, setDaysOfWeek] = useState(initialDays);
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [value, setValue] = useState(moment(selectedTime).format('hh:mm a'));

    const test = [{ label: 'light room', value: 'light room' }, { label: 'bedroom', value: 'bedroom' }, { label: 'bathroom', value: 'bathroom' }]

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
        console.log(newProjects)
    }

    const handleChange = (newValue) => {
        console.log(moment(newValue).format('hh:mm a'))
    }

    return (
        <>
            <View style={{ justifyContent: 'center' }}>
                {/* <View style={[styles.pickerContainer, {borderColor: theme.colors.secondaryFont}]}>
                <Picker
                    style={[styles.picker, { backgroundColor: theme.colors.background, color: theme.colors.secondaryFont }]}
                    selectedValue={selectedRoom}
                    onValueChange={setSelectedRoom}>
                    <Picker.Item label='None' value='None' style={{ backgroundColor: theme.colors.background, color: theme.colors.secondaryFont }} />
                    {
                        state.lights.map(x => {
                            return <Picker.Item key={x.groupId} label={x.groupName} value={x.groupName} style={{ backgroundColor: theme.colors.background, color: theme.colors.secondaryFont }} />
                        })
                    }
                </Picker>
            </View> */}


                {/* <Provider>
                    <SafeAreaView>
                        <DropDown
                            // dropDownStyle={{ width: '100%'}}
                            placeholder={"Select Room"}
                            label={"Room"}
                            mode={"outlined"}
                            visible={openSelect}
                            showDropDown={() => setOpenSelect(true)}
                            onDismiss={() => setOpenSelect(false)}
                            value={selectedRoom}
                            setValue={setSelectedRoom}
                            list={test}
                        />
                    </SafeAreaView>
                </Provider> */}


                <TextInput
                    value={value}
                    outlineColor={theme.colors.primaryFont}
                    onChange={handleChange}
                    mode='outlined'
                    style={{width: 200, marginLeft: 10}}
                    textColor={theme.colors.secondaryFont}
                    activeOutlineColor={theme.colors.primary}
                    right={<TextInput.Icon icon='clock-outline' color={theme.colors.primaryFont} onPress={() => setOpen(true)} />}
                    label="Time" />
            <WeekPicker daysOfWeek={initialDays} toggleDay={toggleDay} setEdited={() => setEdited(true)} />
            </View>

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