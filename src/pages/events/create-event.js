import React, { useContext, useState } from 'react';
import { Dialog, Divider, useTheme } from 'react-native-paper';
import DropDown from '../../components/controls/drop-down';
import { Context } from '../../state/store';
import CreateLightEvent from './create-light-event';
import CreateHvacEvent from "./create-hvac-event";
import styles from './create-event.styles';


export default function CreateEvent(props) {
    const theme = useTheme(new Date());
    const [state, _] = useContext(Context);
    const [selectedTaskType, setSelectedTaskType] = useState('');


    const selectedComponents = () => {
        if (selectedTaskType === 'hvac')
            return <CreateHvacEvent close={props.close} type={selectedTaskType}/>
        else if (selectedTaskType !== '')
            return <CreateLightEvent close={props.close} type={selectedTaskType}/>
    }

    return (
        <>
            <Dialog.Title style={{color: theme.colors.primaryFont}}>Create Event</Dialog.Title>
            <Divider style={[styles.dividerHeader, {backgroundColor: theme.colors.secondaryFont}]} />
            <Dialog.Content style={styles.eventContainer}>
                <DropDown style={styles.pickerContainer} data={state.taskTypes} onChange={setSelectedTaskType} value={selectedTaskType} label="Task Type" placeholder="Select Task"/>
                {selectedComponents()}
            </Dialog.Content>
        </>
    )
}