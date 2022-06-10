import React, { useState, useContext } from 'react';
import { addUserDeviceNode } from '../../../utilities/RestApi.js';
import { View, Text } from 'react-native';
import styles from './AddGarage.styles.js';
import { Context } from '../../../state/Store';
import { GreenButton, GreenSwitch } from '../../../components/controls/Buttons.js';
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

    const submitGarageDoor = async (event) => {
        garageTouched && isNameValid
            ? updateGarageNode()
            : setIsNameValid(false);
    }

    const updateGarageNode = async () => {
        const response = await addUserDeviceNode(state.user.userId, state.auth.bearer, state.deviceId, garageName, preferred);
        console.log(JSON.stringify(response))
        console.log('----- Updating Roles -----')
        updateRoles();
        setSucceeded(response.ok);
        setPreferred(false);
        const jsonResponse = await response.json();
        setAvailableNodes(jsonResponse.availableNodes);
        dispatch({ type: "SET_ADDED_GARAGE_NODE", payload: true })
        if (jsonResponse.availableNodes === 0) {
            props.close();
        }
    }

    const updateRoles = async () => {
        // const userRoles = await getRolesByUserId(state.user.userId, state.auth.bearer);
        await dispatch({ type: 'SET_USER_DATA', payload: { ...state.user, roles: userRoles.roles } });
        const garageRole = userRoles.roles.find(x => x.role_name === 'garage_door');
        await dispatch({ type: 'SET_GARAGE_ROLE', payload: garageRole });
    }

    const resetDevices = () => {
        setSucceeded(false);
        setGarageName('');
        setGarageTouched(false);
    }

    return (
        <View style={styles.addGarageContainer}>
            {succeeded
                ? <View>
                    <View style={styles.deviceGroup}>
                        <View style={styles.deviceGroup}>
                            <View style={styles.borderSuccessIcon}>
                                <MaterialIcons name='check_circle' style={styles.garageSuccessText} />
                                {/* <CheckCircle style={styles.garageSuccessText} /> */}
                            </View>
                            <Text style={[styles.headerText]}>Successfully Added</Text>
                        </View>
                        <CloseIcon onPress={() => props.close()} style={styles.close - icon} />
                    </View>
                    <View style={styles.deviceRow}>
                        <Text style={styles.deviceText}>Would you like to setup the remaining ({availableNodes}) openers?</Text>
                    </View>
                    <GreenButton onClick={resetDevices}>Add</GreenButton>
                </View>
                : <View>
                    <Text style={[styles.headerText]}>Add Garage Door</Text>
                    <View style={styles.addDoorGroup}>
                        <GreenSwitch status={preferred} label="Preferred Door" onPress={() => setPreferred(!preferred)} />
                    </View>
                    <View style={styles.addDoorGroup}>
                        <TextInput mode='outlined' activeOutlineColor='#00c774' value={garageName} error={!isNameValid} onChangeText={checkGarageName} label="Garage Name" />
                    </View>
                    <View style={{ alignItems: 'center', padding: 6 }}>
                        <GreenButton onPress={submitGarageDoor}>Add</GreenButton>
                    </View>
                </View>
            }
        </View>
    );
}