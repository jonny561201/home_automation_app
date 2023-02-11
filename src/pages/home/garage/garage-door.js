import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import moment from 'moment';
import { useTheme } from 'react-native-paper';
import { Context } from '../../../state/store';
import { useInterval } from '../../../utilities/use-interval';
import UpDownIcon from '../../../resources/panelIcons/UpDown.png';
import { toggleGarageDoor, updateGarageState } from '../../../utilities/rest-api';
import { BlueButton, GreenButton, RedButton } from '../../../components/controls/buttons';
import styles from './garage-door.styles';


export default function GarageDoor(props) {
    const theme = useTheme();
    const [state, dispatch] = useContext(Context);
    const [statusDays, setStatusDays] = useState();
    const [statusMins, setStatusMins] = useState();
    const [statusHours, setStatusHours] = useState();

    useEffect(() => {
        updateGarageDuration();
    })

    useInterval(() => {
        updateGarageDuration();
    }, 2000);

    const updateGarageDuration = () => {
        const diffMs = new Date() - moment(props.device.duration).toDate();
        setStatusDays(Math.floor(diffMs / 86400000));
        setStatusHours(Math.floor((diffMs % 86400000) / 3600000));
        setStatusMins(Math.round(((diffMs % 86400000) % 3600000) / 60000));
    };

    const openCloseGarageDoor = async (newState) => {
        const response = await updateGarageState(state.user.userId, state.auth.bearer, newState, props.device.doorId);
        dispatch({ type: 'UPDATE_GARAGE_DOORS', payload: { doorName: props.device.doorName, doorId: props.device.doorId, isOpen: response.isGarageOpen, duration: new Date() } });
    };

    const toggleDoor = () => {
        toggleGarageDoor(state.user.userId, state.auth.bearer, props.device.doorId);
    };

    return (
        <View style={styles.garageDoorContainer}>
            <View style={styles.statusTextGroup}>
                <Text style={[styles.garageTextBold, {color: theme.colors.font}]}>{props.device.doorName}</Text>
                {props.device.isOpen
                    ? <Text style={[styles.garageBigText, {color: theme.colors.font}]}>Opened</Text>
                    : <Text style={[styles.garageBigText, {color: theme.colors.font}]}>Closed</Text>}
                {statusDays === 0
                    ? <Text style={[styles.timeText, {color: theme.colors.font}]}>{statusHours}Hrs {statusMins}Min</Text>
                    : <Text style={[styles.timeText, {color: theme.colors.font}]}>{statusDays}Days {statusHours}Hrs</Text>}
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
