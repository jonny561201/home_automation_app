import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import { RadioButton, TextInput, useTheme } from 'react-native-paper';
import { updateUserPreferences } from '../../utilities/rest-api';
import { Context } from '../../state/store';
import { GreenButton, RedButton } from "../../components/controls/buttons";
import { Picker } from "@react-native-picker/picker";
import styles from './settings-edit-panel.styles'


export default function SettingsEditPanel(props) {
    const theme = useTheme();
    const [state, dispatch] = useContext(Context);
    const [edited, setEdited] = useState(false);
    const [garage, setGarage] = useState(state.preferences.garage_door ? state.preferences.garage_door : '');
    const [garageId, setGarageId] = useState();
    const [newCity, setNewCity] = useState(state.preferences.city);
    const [newTempUnit, setNewTempUnit] = useState(state.preferences.temp_unit);
    const [newMeasureUnit, setNewMeasureUnit] = useState(state.preferences.measure_unit);

    const savePreferences = () => {
        const isFahrenheit = newTempUnit === "fahrenheit";
        const isImperial = newMeasureUnit === "imperial";
        const request = { isImperial, isFahrenheit, 'city': newCity, 'garageDoor': garage, 'garageId': garageId };
        updateUserPreferences(state.user.userId, state.auth.bearer, request);

        dispatch({ type: 'SET_USER_PREFERENCES', payload: { ...state.preferences, city: newCity, temp_unit: newTempUnit, measure_unit: newMeasureUnit, garage_id: garageId, garage_door: garage } });
        props.setEditMode(!props.isEditMode);
    }

    const cancelPreferences = () => {
        setNewCity(props.city);
        setNewTempUnit(props.tempUnit);
        setNewMeasureUnit(props.measureUnit);
        props.setEditMode(!props.isEditMode);
    }

    const updateCity = (input) => {
        setEdited(true);
        setNewCity(input);
    }

    const updateTempRadioButton = (input) => {
        setEdited(true);
        setNewTempUnit(input);
    }

    const updateMeasureRadioButton = (input) => {
        setEdited(true);
        setNewMeasureUnit(input);
    }

    const updateGarageDoor = (input) => {
        const door = state.garageDoors.find(x => x.doorName === input);
        setEdited(true);
        setGarage(input);
        setGarageId(door ? door.doorId : null);
    }

    return (
        <>
            <View>
                <Text style={[styles.settingsHeader, {color: theme.colors.primaryFont}]}>Garage</Text>
                <View style={[styles.settingsRow, styles.pickerContainer, {borderColor: theme.colors.secondaryFont}]}>
                    <Picker style={[styles.picker, {backgroundColor: theme.colors.background, color: theme.colors.secondaryFont}]} selectedValue={garage} onValueChange={updateGarageDoor}>
                        <Picker.Item label='None' value='None' style={{backgroundColor: theme.colors.background, color: theme.colors.secondaryFont}}/>
                        {
                            state.garageDoors.map(x => {
                                return <Picker.Item key={x.doorName} label={x.doorName} value={x.doorName} style={{backgroundColor: theme.colors.background, color: theme.colors.secondaryFont}}/>
                            })
                        }
                    </Picker>
                </View>
                <Text style={[styles.settingsHeader, {color: theme.colors.primaryFont}]}>Temperature</Text>
                <View  style={styles.settingsRow}>
                    <RadioButton.Group style={styles.settingsRow} onValueChange={updateTempRadioButton} value={newTempUnit}>
                        <View  style={{flexDirection: 'row'}}>
                            <RadioButton value="fahrenheit" />
                            <Text style={[styles.settingsLabelText, {color: theme.colors.secondaryFont}]}>Fahrenheit</Text>
                        </View>
                        <View  style={{flexDirection: 'row'}}>
                            <RadioButton value="celsius" />
                            <Text style={[styles.settingsLabelText, {color: theme.colors.secondaryFont}]}>Celsius</Text>
                        </View>
                    </RadioButton.Group>
                </View>
                <View style={styles.settingsRow}>
                    <TextInput
                        style={{ width: '90%' }}
                        value={newCity}
                        onChangeText={updateCity}
                        mode='outlined'
                        textColor={theme.colors.secondaryFont}
                        activeOutlineColor={theme.colors.primary}
                        label="City" />
                </View>
                <Text style={[styles.settingsHeader, {color: theme.colors.primaryFont}]}>Measurement</Text>
                <View style={styles.settingsRow} >
                    <RadioButton.Group onValueChange={updateMeasureRadioButton} value={newMeasureUnit}>
                        <View style={{flexDirection: 'row'}}>
                            <RadioButton value="imperial" />
                            <Text style={[styles.settingsLabelText, {color: theme.colors.secondaryFont}]}>Imperial</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <RadioButton value="metric" />
                            <Text style={[styles.settingsLabelText, {color: theme.colors.secondaryFont}]}>Metric</Text>
                        </View>
                    </RadioButton.Group>
                </View>
            </View>
            <View style={[styles.settingsRow, styles.buttonRow]}>
                <GreenButton disabled={!edited} onPress={savePreferences}>Save</GreenButton>
                <RedButton onPress={cancelPreferences}>Cancel</RedButton>
            </View>
        </>
    );
}