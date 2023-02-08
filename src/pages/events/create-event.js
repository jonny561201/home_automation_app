import React from 'react';
import { Text } from 'react-native';
import { Dialog, Divider } from 'react-native-paper';
import { RedButton, GreenButton } from '../../components/controls/buttons';
import styles from './create-event.styles';


export default function CreateEvent(props) {

    const submitEvent = () => {
        props.close();
    }

    return (
        <>
            <Dialog.Title>Create Event</Dialog.Title>
            <Divider style={styles.dividerHeader} />
            <Dialog.Content>
                <Text>This is a Test</Text>
            </Dialog.Content>

            <Dialog.Actions style={styles.dialogButtonContainer}>
                <RedButton onPress={props.close}>Cancel</RedButton>
                <GreenButton onPress={submitEvent}>Add</GreenButton>
            </Dialog.Actions>
        </>
    )
}