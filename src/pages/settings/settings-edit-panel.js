import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import { RadioButton, TextInput } from "react-native-paper";
import { updateUserPreferences } from '../../utilities/rest-api';
import { Context } from '../../state/store';
import { GreenButton, RedButton } from "../../components/controls/buttons";
import { Picker } from "@react-native-picker/picker";
import styles from './settings-edit-panel.styles'


export default function SettingsEditPanel(props) {
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
                <Text style={styles.settingsHeader}>Garage</Text>
                <View style={[styles.settingsRow, styles.pickerContainer]}>
                    <Picker style={styles.picker} selectedValue={garage} onValueChange={updateGarageDoor}>
                        <Picker.Item lable='None' value='None'/>
                        {
                            state.garageDoors.map(x => {
                                return <Picker.Item key={x.doorName} label={x.doorName} value={x.doorName}/>
                            })
                        }
                    </Picker>
                </View>
                <Text style={styles.settingsHeader}>Temperature</Text>
                <View  style={styles.settingsRow}>
                    <RadioButton.Group style={styles.settingsRow} onValueChange={updateTempRadioButton} value={newTempUnit}>
                        <View  style={{flexDirection: 'row'}}>
                            <RadioButton value="fahrenheit" />
                            <Text style={styles.settingsLabelText}>Fahrenheit</Text>
                        </View>
                        <View  style={{flexDirection: 'row'}}>
                            <RadioButton value="celsius" />
                            <Text style={styles.settingsLabelText}>Celsius</Text>
                        </View>
                    </RadioButton.Group>
                </View>
                <View style={styles.settingsRow}>
                    <TextInput style={{width: '90%'}} value={newCity} onChangeText={updateCity} mode='outlined' activeOutlineColor='#00c774' label="City" />
                </View>
                <Text style={styles.settingsHeader}>Measurement</Text>
                <View style={styles.settingsRow} >
                    <RadioButton.Group onValueChange={updateMeasureRadioButton} value={newMeasureUnit}>
                        <View style={{flexDirection: 'row'}}>
                            <RadioButton value="imperial" />
                            <Text style={styles.settingsLabelText}>Imperial</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <RadioButton value="metric" />
                            <Text style={styles.settingsLabelText}>Metric</Text>
                        </View>
                    </RadioButton.Group>
                </View>
            </View>
            <View style={styles.settingsRow}>
                <GreenButton disabled={!edited} onPress={savePreferences}>Save</GreenButton>
                <RedButton onPress={cancelPreferences}>Cancel</RedButton>
            </View>
        </>
    );
}