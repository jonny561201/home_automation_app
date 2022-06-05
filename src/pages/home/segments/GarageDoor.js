import React, { useContext, useState } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './GarageDoor.styles';
import { BlueButton, GreenButton, RedButton } from '../../../components/controls/Buttons';


import { Context } from '../../../state/Store';
// import { useInterval } from '../../../utilities/UseInterval';
import UpDownIcon from '../../../resources/panelIcons/UpDown.png';
// import { toggleGarageDoor, updateGarageState } from '../../../utilities/RestApi';


export default function GarageDoor(props) {
    // const [ding] = useSound(dingSound, { volume: 0.25 });
    // const [click] = useSound(clickSound, { volume: 0.25 });
    const [state, dispatch] = useContext(Context);
    const [statusDays, setStatusDays] = useState();
    const [statusMins, setStatusMins] = useState();
    const [statusHours, setStatusHours] = useState();

    // useInterval(() => {
    //     updateGarageDuration();
    // }, 2000);

    const updateGarageDuration = () => {
        const diffMs = new Date() - new Date(props.device.duration);
        setStatusDays(Math.floor(diffMs / 86400000));
        setStatusHours(Math.floor((diffMs % 86400000) / 3600000));
        setStatusMins(Math.round(((diffMs % 86400000) % 3600000) / 60000));
    };

    const openCloseGarageDoor = async (newState) => {
        // newState ? ding() : click();
        // const response = await updateGarageState(state.user.userId, state.auth.bearer, newState, props.device.doorId);
        dispatch({ type: 'UPDATE_GARAGE_DOORS', payload: { doorName: props.device.doorName, doorId: props.device.doorId, isOpen: response.isGarageOpen, duration: new Date() } });
    };

    const toggleDoor = () => {
        // toggleGarageDoor(state.user.userId, state.auth.bearer, props.device.doorId);
        // click();
    };

    return (
        <View style={styles.garageDoorContainer}>
            <View style={styles.statusTextGroup}>
                <Text style={styles.garageTextBold}>{props.device.doorName}</Text>
                {props.device.isOpen
                    ? <Text style={styles.garageBigText}>Opened</Text>
                    : <Text style={styles.garageBigText}>Closed</Text>}
                {statusDays === 0
                    ? <Text style={styles.timeText}>{statusHours}Hrs {statusMins}Min</Text>
                    : <Text style={styles.timeText}>{statusDays}Days {statusHours}Hrs</Text>}
            </View >
            <View style={styles.statusButtonGroup}>
                {props.device.isOpen
                    ? <RedButton style={styles.button} onPress={() => openCloseGarageDoor(false)}>Close</RedButton>
                    : <GreenButton style={styles.button} onPress={() => openCloseGarageDoor(true)}>Open</GreenButton>}
                <BlueButton style={styles.button} onPress={toggleDoor}>
                    <Image alt="UpDown" style={styles.iconImage} source={UpDownIcon} />
                </BlueButton>
            </View >
        </View >
    );
}
