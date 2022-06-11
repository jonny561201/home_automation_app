import React, { useState, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { isValidIpAddress, debounchApi } from '../../../utilities/Services';
import { addUserDevice } from '../../../utilities/RestApi';
import { MaterialIcons } from '@expo/vector-icons';
import AddGarage from './AddGarage';
import styles from './RegisterDevice.styles'
import { Context } from '../../../state/Store';
import { GreenButton } from '../../../components/controls/Buttons';


export default function RegisterDevice(props) {
    const [state, dispatch] = useContext(Context);
    const [ipAddress, setIpAddress] = useState('');
    const [touched, setTouched] = useState(false);
    const [isIpValid, setIsIpValid] = useState(true);
    const [startedRegistration, setStartedRegistration] = useState(false);
    const [transitionComponent, setTransitionComponent] = useState(false);

    useEffect(() => {
        setStartedRegistration(state.devicesToRegister.garage.started);
    });

    const checkIpAddress = (input) => {
        debounchApi(() => setIsIpValid(isValidIpAddress(input)));
        setIpAddress(input);
        setTouched(true);
    }

    const submitDevice = async (event) => {
        if (isIpValid && touched) {
            const response = await addUserDevice(state.user.userId, state.auth.bearer, 'garage_door', ipAddress)
            const responseObj = await response.json();
            dispatch({ type: 'SET_STARTED_GARAGE_REGISTRATION', payload: true })
            dispatch({ type: 'SET_DEVICE_ID', payload: responseObj.deviceId });
            setTransitionComponent(response.ok);
        }
    }

    return (
        <View>
            {transitionComponent || startedRegistration
                ? <AddGarage close={props.close} />
                : <View>
                    <View style={styles.deviceHeaderGroup}>
                        <View></View>
                        <Text style={styles.headerText}>Add Device</Text>
                        <MaterialIcons style={styles.closeIcon} onPress={() => props.close()} name='close' />
                    </View>

                    <View style={styles.addIPGroup}>
                        <View style={styles.addIPGroup}>
                            <TextInput value={ipAddress} error={!isIpValid} onChangeText={checkIpAddress} activeOutlineColor='#00c774' mode='outlined' label="IP Address" />
                        </View>
                        <View style={{ alignItems: 'center', padding: 6 }}>
                            <GreenButton onPress={submitDevice}>Next</GreenButton>
                        </View>
                    </View>
                </View>
            }
        </View>
    );
}