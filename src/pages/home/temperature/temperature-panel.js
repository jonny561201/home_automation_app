import React, { useState, useContext } from 'react';
import { Image, Text, View } from 'react-native';
import { useTheme, Switch } from 'react-native-paper';
import { setUserTemperature } from '../../../utilities/rest-api'
import Accordion from '../../../components/accordion';
import TempIcon from '../../../resources/panelIcons/TemperatureIcon.png';
import { Context } from '../../../state/store';
import TemperatureImage from './temperature-image';
import ThermostatToggle from '../../../components/controls/thermostat-toggle';
import ThermostatDial from '../../../components/controls/thermostat-dial';
import styles from './temperature-panel.styles';


export default function TemperaturePanel() {
    const theme = useTheme();
    const [state, dispatch] = useContext(Context);
    const hasHvacTask = state.tasks.some(x => x.task_type === 'hvac');
    const [open, setOpen] = useState(false);
    const [auto, setAuto] = useState(state.tempData.mode === 'auto' && hasHvacTask);
    const [color, setColor] = useState('#E5E5E5');
    const [previousMode, setPreviousMode] = useState(state.tempData.mode);
    const [previousColor, setPreviousColor] = useState('#E5E5E5');
    const [mode, setMode] = useState(state.tempData);
    const [desiredTemp, setDesiredTemp] = useState(state.tempData.desiredTemp);
    const [disabled, setDisabled] = useState(state.tempData.mode === 'auto' || state.tempData.mode === 'off');

    const knobChange = (value) => {
        dispatch({ type: 'SET_TEMP_DATA', payload: { ...state.tempData, desiredTemp: value } });
        setDesiredTemp(value);
        setUserTemperature(state.user.userId, state.auth.bearer, value, state.tempData.mode, state.tempData.isFahrenheit);
    }

    const modeToggle = async (newModeValue) => {
        setPreviousMode(state.tempData.mode)
        setDisabled(newModeValue === 0 || newModeValue === 3)
        if (newModeValue === 1) 
            setTempMode('heating', '#db5127');
        else if (newModeValue === 2)
            setTempMode('cooling', '#27AEDB');
        else 
            setTempMode('off', '#E5E5E5');
    }

    const toggleAuto = async () => {
        const isAuto = !auto;
        const previous = state.tempData.mode || 'off';
        if (isAuto) {
            setPreviousMode(previous);
            setPreviousColor(color);
        }
        setMode(isAuto ? 'auto' : previousMode);
        setTempMode(isAuto ? 'auto' : previous, isAuto ? '#00c774' : previousColor);
        setAuto(isAuto)
    }

    const setTempMode = async (mode, color) => {
        await dispatch({ type: 'SET_TEMP_DATA', payload: { ...state.tempData, mode: mode } });
        setColor(color);
    }

    return (
        <Accordion style={styles.temperaturePanel} onPress={() => { setOpen(!open) }}>
            <View style={styles.titleGroup}>
                <Image style={styles.iconImage} source={TempIcon} />
                <View style={styles.securityHeader}>
                    <Text style={[styles.statusTextBold, {color: theme.colors.primaryFont}]}>Temperature</Text>
                    {
                        !open &&
                        <>
                            <View style={styles.smallTextGroup}>
                                <Text style={[styles.smallText, {color: theme.colors.secondaryFont}]}>Outside:</Text>
                                <Text style={[styles.smallText, {color: theme.colors.secondaryFont}]}>{state.forecastData.temp}&deg;</Text>
                            </View>
                            <View style={styles.smallTextGroup}>
                                <Text style={[styles.smallText, {color: theme.colors.secondaryFont}]}>Inside:</Text>
                                <Text style={[styles.smallText, {color: theme.colors.secondaryFont}]}>{state.tempData.currentTemp}&deg;</Text>
                            </View>
                        </>
                    }
                </View>
            </View>
            <View>
                <View>
                    <View>
                        <View style={styles.tempImages}>
                            <TemperatureImage value={0} />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <ThermostatDial onChange={knobChange} desiredTemp={desiredTemp} disabled={disabled} color={color}/>
                            <Switch value={auto} onValueChange={toggleAuto}/>
                            {
                                !auto &&
                                <ThermostatToggle mode={mode} slideComplete={modeToggle} disabled={auto} color={color} />
                            }
                        </View>
                    </View>
                </View>
            </View>
        </Accordion >
    )
}