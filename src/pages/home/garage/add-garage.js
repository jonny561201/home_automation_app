import React, { useState, useContext } from 'react';
import { addUserDeviceNode } from '../../../utilities/rest-api.js';
import { View, Text } from 'react-native';
import styles from './add-garage.styles.js';
import { Context } from '../../../state/store';
import { GreenButton, GreenSwitch, RedButton } from '../../../components/controls/buttons.js';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';

export default function AddGarage(props) {
    const [state, dispatch] = useContext(Context);
    const [succeeded, setSucceeded] = useState();
    const [preferred, setPreferred] = useState(false);
    const [garageName, setGarageName] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);
    const [garageTouched, setGarageTouched] = useState(false);
    const [availableNodes, setAvailableNodes] = useState(1);

    const checkGarageName = (input) => {
        if (availableNodes > 0) {
            setGarageTouched(true);
            setIsNameValid(input !== "");
            setGarageName(input);
        }
    }

    const submitGarageDoor = async () => {
        garageTouched && isNameValid
            ? updateGarageNode()
            : setIsNameValid(false);
    }

    const updateGarageNode = async () => {
        const response = await addUserDeviceNode(state.user.userId, state.auth.bearer, state.devicesToRegister.garage.deviceId, garageName, preferred);
        setSucceeded(response.ok);
        setPreferred(false);
        const jsonResponse = await response.json();
        setAvailableNodes(jsonResponse.availableNodes);
        dispatch({ type: 'REGISTER_GARAGE_DOOR', payload: jsonResponse.device});
        if (jsonResponse.availableNodes === 0) {
            completeRegistration();
            props.close();
        }
    }

    const completeRegistration = () => {
        dispatch({ type: 'UPDATE_GARAGE_REGISTRATION', payload: { started: false, newDevice: false} });
    }

    const resetDevices = () => {
        setSucceeded(false);
        setGarageName('');
        setGarageTouched(false);
    }

    return (
        <View >
            {succeeded
                ? <View>
                    <View style={styles.doorHeaderGroup}>
                        <View style={styles.deviceGroup}>
                            <View style={styles.borderSuccessIcon}>
                                <MaterialIcons name='check-circle' style={styles.garageSuccessIcon}/>
                            </View>
                            <Text style={[styles.headerText]}>Successfully Added</Text>
                        </View>
                        <MaterialIcons name='close' style={styles.closeIcon} onPress={props.close} />
                    </View>
                    <View style={styles.addDoorGroup}>
                        <View style={styles.addDoorGroup}>
                            <Text style={styles.deviceText}>Setup remaining ({availableNodes}) openers?</Text>
                        </View>
                        <View style={styles.addButtonGroup}>
                            <GreenButton onPress={resetDevices}>Continue</GreenButton>
                            <RedButton onPress={completeRegistration}>Done</RedButton>
                        </View>
                    </View>
                </View>

                : <View>
                    <View style={styles.doorHeaderGroup}>
                        <View></View>
                        <Text style={styles.headerText}>Add Garage Door</Text>
                        <MaterialIcons name='close' style={styles.closeIcon} onPress={props.close} />
                    </View>
                    <View style={styles.addDoorGroup}>
                        <View>
                            <GreenSwitch status={preferred} label="Preferred Door" onPress={() => setPreferred(!preferred)} />
                        </View>
                        <View style={styles.addDoorGroup}>
                            <TextInput value={garageName} error={!isNameValid} onChangeText={checkGarageName} mode='outlined' activeOutlineColor='#00c774' label="Garage Name" />
                        </View>
                        <View style={{ alignItems: 'center', padding: 6 }}>
                            <GreenButton onPress={submitGarageDoor}>Add</GreenButton>
                        </View>
                    </View>
                </View>
            }
        </View>
    );
}