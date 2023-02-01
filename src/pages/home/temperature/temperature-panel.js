import React, { useState, useContext } from 'react';
import { Image, Text, View } from 'react-native';
import { setUserTemperature } from '../../../utilities/rest-api'
import Accordion from '../../../components/accordion';
import TempIcon from '../../../resources/panelIcons/TemperatureIcon.png';
import { Context } from '../../../state/store';
import TemperatureImage from './temperature-image';
import TempSlider from '../../../components/controls/temp-slider';
import styles from './temperature-panel.styles';


export default function TemperaturePanel() {
    const [state, dispatch] = useContext(Context);
    const [open, setOpen] = useState(false);
    const hasHvacTask = state.tasks.some(x => x.task_type === 'hvac');

    const knobChange = (newValue) => {
        if (state.tempData.mode === 'heating' || state.tempData.mode === 'cooling') {
            dispatch({ type: 'SET_TEMP_DATA', payload: { ...state.tempData, desiredTemp: newValue } });
            setUserTemperature(state.user.userId, state.auth.bearer, newValue, state.tempData.mode, state.tempData.isFahrenheit);
        }
    }

    const toggleHvac = async (newMode) => {
        if (newMode !== 'auto' || state.tasks.some(x => x.task_type === 'hvac')) {
            const modeState = state.tempData.mode === newMode ? null : newMode;
            await dispatch({ type: 'SET_TEMP_DATA', payload: { ...state.tempData, mode: modeState } });
            setUserTemperature(state.user.userId, state.auth.bearer, state.tempData.desiredTemp, modeState, state.tempData.isFahrenheit);
        }
    }

    const modeToggle = async (newModeValue) => {
        if (newModeValue === 1)
            await dispatch({ type: 'SET_TEMP_DATA', payload: { ...state.tempData, mode: 'heating', modeValue: newModeValue } });
        else if (newModeValue === 2)
            await dispatch({ type: 'SET_TEMP_DATA', payload: { ...state.tempData, mode: 'cooling', modeValue: newModeValue } });
        else if (newModeValue === 3)
            await dispatch({ type: 'SET_TEMP_DATA', payload: { ...state.tempData, mode: 'auto', modeValue: newModeValue } });
        else
            await dispatch({ type: 'SET_TEMP_DATA', payload: { ...state.tempData, mode: 'off', modeValue: 0 } });
    }

    return (
        <Accordion style={styles.securityPanel} onPress={() => { setOpen(!open) }}>
            <View style={styles.titleGroup}>
                <Image style={styles.iconImage} source={TempIcon} />
                <View style={styles.securityHeader}>
                    <Text style={styles.statusTextBold}>Temperature</Text>
                    {
                        !open &&
                        <>
                            <View style={styles.smallTextGroup}>
                                <Text style={styles.smallText}>Outside:</Text>
                                <Text style={styles.smallText}>{state.forecastData.temp}&deg;</Text>
                            </View>
                            <View style={styles.smallTextGroup}>
                                <Text style={styles.smallText}>Inside:</Text>
                                <Text style={styles.smallText}>{state.tempData.currentTemp}&deg;</Text>
                            </View>
                        </>
                    }
                </View>
            </View>
            <View>
                <View style={styles.smallTextGroup}>
                    <View style={styles.formContainer}>
                        <View style={styles.tempImages}>
                            <TemperatureImage value={0} />
                        </View>
                        <TempSlider hasHvac={hasHvacTask} value={state.tempData.modeValue} slideComplete={modeToggle}/>

                        <View>
                            {/* <Knob value={state.tempData.currentDesiredTemp} lineCap={"round"} inputColor={state.tempData.gaugeColor} fgColor={state.tempData.gaugeColor} title="Desired Temp"
                                onChange={knobChange} angleArc={240} angleOffset={240} min={state.tempData.minThermostatTemp} max={state.tempData.maxThermostatTemp} /> */}
                        </View>
                    </View>
                </View>
            </View>
        </Accordion >
    )
}