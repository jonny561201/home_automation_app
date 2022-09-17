import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { Context } from '../../state/store';
import styles from './settings-panel.styles';
import { GreenButton } from "../../components/controls/buttons";


export default function SettingsPanel(props) {
    const [state,] = useContext(Context)

    const handleClick = () => {
        props.toggleEdit();
    }

    return (
        <>
            <View>
                <Text style={styles.settingsHeader}>Garage</Text>
            </View>
            <View style={styles.settingsRow}>
                <Text style={styles.measureUnit}>Open Door: </Text>
                <Text style={styles.tempUnit}>{state.preferences.garage_door ? state.preferences.garage_door : "None"}</Text>
            </View>
            <View>
                <Text style={styles.settingsHeader}>Temperature</Text>
            </View>
            <View style={styles.settingsRow}>
                <Text style={styles.tempUnit}>Unit: </Text>
                <Text style={styles.tempUnit}>{state.preferences.temp_unit}</Text>
            </View>
            <View style={styles.settingsRow}>
                <Text style={styles.tempCity}>City: </Text>
                <Text style={styles.tempCity}>{state.preferences.city}</Text>
            </View>
            <View>
                <Text style={styles.settingsHeader}>Measurement</Text>
            </View>
            <View style={styles.settingsRow}>
                <Text style={styles.measureUnit}>Unit: </Text>
                <Text style={styles.measureUnit}>{state.preferences.measure_unit}</Text>
            </View>

            <View style={styles.settingsRow}>
                <GreenButton onPress={handleClick}>Edit</GreenButton>
            </View>
        </>
    );
}