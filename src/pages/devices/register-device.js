import React, {useContext, useState} from 'react';
import {Dialog, Divider, TextInput, Button, useTheme} from "react-native-paper";
import {View} from "react-native";
import {GreenButton, RedButton} from "../../components/controls/buttons";
import styles from "./register-device.styles";
import DropDown from "../../components/controls/drop-down";
import {Context} from "../../state/store";


export default function RegisterDevice(props) {
    const theme = useTheme();
    const types = ['Light', 'Fan']
    const [state, dispatch] = useContext(Context);
    const [name, setName] = useState();
    const [rooms, setRooms] = useState(state.lights.map((x) => x.groupName));
    const [selectedRoom, setSelectedRoom] = useState();
    const [selectedType, setSelectedType] = useState();

    const registerSwitch = () => {
        console.log(selectedRoom)
        console.log(selectedType)
        console.log(name)
    }

    return (
        <>
            <Dialog.Title style={{color: theme.colors.primaryFont}}>Register Switch</Dialog.Title>
            <Divider style={[styles.dividerHeader, {backgroundColor: theme.colors.secondaryFont}]} />
            <Dialog.Content style={styles.eventContainer}>
                <View style={styles.deviceRow}>
                    <TextInput mode='outlined' label='Name' style={styles.deviceItem} onChangeText={setName}/>
                    <DropDown value={selectedRoom} label="Room" onChange={setSelectedRoom} data={rooms} style={styles.deviceItem} placeholder='Room' />
                    <DropDown value={selectedType} label="Type" onChange={setSelectedType} data={types} style={styles.deviceItem} placeholder='Type' />
                </View>

                <Dialog.Actions>
                        <RedButton onPress={props.close}>Cancel</RedButton>
                        <GreenButton onPress={registerSwitch}>Add</GreenButton>
                </Dialog.Actions>
            </Dialog.Content>
        </>
    )
}