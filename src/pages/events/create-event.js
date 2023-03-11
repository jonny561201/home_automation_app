import React, { useContext, useState } from 'react';
import { Dialog, Divider, useTheme } from 'react-native-paper';
import { GreenButton, RedButton } from '../../components/controls/buttons';
import DropDown from '../../components/controls/drop-down';
import { Context } from '../../state/store';
import styles from './create-event.styles';
import CreateLightEvent from './create-light-event';


export default function CreateEvent(props) {
    const theme = useTheme(new Date());
    const [state, dispatch] = useContext(Context);
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
                <DropDown style={styles.pickerContainer} data={state.taskTypes} onChange={setSelectedTaskType} value={selectedTaskType} label="Task Type" placeholder="Select Task"/>
                {selectedComponents()}
            </Dialog.Content>

            <Dialog.Actions style={styles.dialogButtonContainer}>
                <RedButton onPress={props.close}>Cancel</RedButton>
                <GreenButton onPress={submitEvent}>Add</GreenButton>
            </Dialog.Actions>
        </>
    )
}