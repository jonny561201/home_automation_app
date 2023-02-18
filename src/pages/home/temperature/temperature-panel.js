import React, { useState, useContext } from 'react';
import { Image, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
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
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState('#E5E5E5');
    const hasHvacTask = state.tasks.some(x => x.task_type === 'hvac');
    const [desiredTemp, setDesiredTemp] = useState(state.tempData.currentDesiredTemp);
    const [disabled, setDisabled] = useState(state.tempData.mode === 'auto' || state.tempData.mode === 'off');

    const knobChange = () => {
        dispatch({ type: 'SET_TEMP_DATA', payload: { ...state.tempData, desiredTemp: desiredTemp } });
        setUserTemperature(state.user.userId, state.auth.bearer, desiredTemp, state.tempData.mode, state.tempData.isFahrenheit);
    }

    const modeToggle = async (newModeValue) => {
        setDisabled(newModeValue === 0 || newModeValue === 3)
        if (newModeValue === 1) {
            await dispatch({ type: 'SET_TEMP_DATA', payload: { ...state.tempData, mode: 'heating', modeValue: newModeValue } });
            setColor('#db5127'); //hot
        }
        else if (newModeValue === 2) {
            await dispatch({ type: 'SET_TEMP_DATA', payload: { ...state.tempData, mode: 'cooling', modeValue: newModeValue } });
            setColor('#27AEDB'); //cool
        }
        else if (newModeValue === 3) {
            await dispatch({ type: 'SET_TEMP_DATA', payload: { ...state.tempData, mode: 'auto', modeValue: newModeValue } });
            setColor('#00c774');  //green
        }
        else {
            await dispatch({ type: 'SET_TEMP_DATA', payload: { ...state.tempData, mode: 'off', modeValue: 0 } });
            setColor('#E5E5E5');  //grey
        }
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
                            <ThermostatDial onChange={setDesiredTemp} desiredTemp={desiredTemp} disabled={disabled} color={color}/>
                            <ThermostatToggle value={state.tempData.modeValue} slideComplete={modeToggle} />
                        </View>
                    </View>
                </View>
            </View>
        </Accordion >
    )
}