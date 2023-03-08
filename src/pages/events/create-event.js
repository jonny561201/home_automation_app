import React, { useContext, useState } from 'react';
import DropDown from '../../components/controls/drop-down';
import { Context } from '../../state/store';
import { Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button, Dialog, Divider, TextInput, useTheme } from 'react-native-paper';
import { RedButton, GreenButton } from '../../components/controls/buttons';
import CreateLightEvent from './create-light-event';
import styles from './create-event.styles';


export default function CreateEvent(props) {
    const theme = useTheme(new Date());
    const [state, dispatch] = useContext(Context);
    const [pickerFocused, setPickerFocused] = useState(false);
    const [selectedTaskType, setSelectedTaskType] = useState('');

    const submitEvent = () => {
        props.close();
    }

    const selectedComponents = () => {
        if (selectedTaskType === 'hvac')
            return <CreateHvacActivity type={selectedTaskType} cancel={props.close} save={props.saveNewTask} />
        else if (selectedTaskType !== '')
            return <CreateLightEvent type={selectedTaskType} cancel={props.close} save={props.saveNewTask} />
    }

    return (
        <>
            <Dialog.Title style={{color: theme.colors.primaryFont}}>Create Event</Dialog.Title>
            <Divider style={[styles.dividerHeader, {backgroundColor: theme.colors.secondaryFont}]} />
            <Dialog.Content style={styles.eventContainer}>
                <View style={[styles.pickerContainer, {borderColor: theme.colors.secondaryFont}]}>
                    <Picker
                        style={[styles.picker, {backgroundColor: theme.colors.background, color: theme.colors.secondaryFont}]}
                        selectedValue={selectedTaskType}
                        onValueChange={setSelectedTaskType}
                        onFocus={() => setPickerFocused(true)}
                        onBlur={() => setPickerFocused(false)}>
                        <Picker.Item label='Task Type' value='' enabled={!pickerFocused} style={{ backgroundColor: theme.colors.background, color: theme.colors.secondaryFont }} />
                        {
                            state.taskTypes.map(x => {
                                return <Picker.Item key={x} label={x} value={x} style={{ backgroundColor: theme.colors.background, color: theme.colors.secondaryFont }} />
                            })
                        }
                    </Picker>

                </View>
                {/* <TextInput
                    // value={value}
                    outlineColor={theme.colors.primaryFont}
                    // onChange={handleChange}
                    mode='outlined'
                    style={{ width: 200, marginLeft: 10 }}
                    textColor={theme.colors.secondaryFont}
                    activeOutlineColor={theme.colors.primary}
                    right={<TextInput.Icon icon='triangle' color={theme.colors.primaryFont} onPress={() => console.log('test')} />}
                    label="Time" /> */}
                
                {selectedComponents()}
            </Dialog.Content>

            <Dialog.Actions style={styles.dialogButtonContainer}>
                <RedButton onPress={props.close}>Cancel</RedButton>
                <GreenButton onPress={submitEvent}>Add</GreenButton>
            </Dialog.Actions>
        </>
    )
}