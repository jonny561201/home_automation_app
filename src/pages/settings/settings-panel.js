import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Context } from '../../state/store';
import styles from './settings-panel.styles';
import { GreenButton } from "../../components/controls/buttons";


export default function SettingsPanel(props) {
    const [state,] = useContext(Context);
    const theme = useTheme();

    const handleClick = () => {
        props.toggleEdit();
    }

    return (
        <>
            <View>
                <Text style={[styles.settingsHeader, {color: theme.colors.primaryFont}]}>Garage</Text>
            </View>
            <View style={styles.settingsRow}>
                <Text style={[styles.measureUnit, {color: theme.colors.secondaryFont}]}>Open Door: </Text>
                <Text style={[styles.tempUnit, {color: theme.colors.secondaryFont}]}>{state.preferences.garage_door ? state.preferences.garage_door : "None"}</Text>
            </View>
            <View>
                <Text style={[styles.settingsHeader, {color: theme.colors.primaryFont}]}>Temperature</Text>
            </View>
            <View style={styles.settingsRow}>
                <Text style={[styles.tempUnit, {color: theme.colors.secondaryFont}]}>Unit: </Text>
                <Text style={[styles.tempUnit, {color: theme.colors.secondaryFont}]}>{state.preferences.temp_unit}</Text>
            </View>
            <View style={styles.settingsRow}>
                <Text style={[styles.tempCity, {color: theme.colors.secondaryFont}]}>City: </Text>
                <Text style={[styles.tempCity, {color: theme.colors.secondaryFont}]}>{state.preferences.city}</Text>
            </View>
            <View>
                <Text style={[styles.settingsHeader, {color: theme.colors.primaryFont}]}>Measurement</Text>
            </View>
            <View style={styles.settingsRow}>
                <Text style={[styles.measureUnit, {color: theme.colors.secondaryFont}]}>Unit: </Text>
                <Text style={[styles.measureUnit, {color: theme.colors.secondaryFont}]}>{state.preferences.measure_unit}</Text>
            </View>

            <View style={[styles.settingsRow, styles.buttonRow]}>
                <GreenButton onPress={handleClick}>Edit</GreenButton>
            </View>
        </>
    );
}