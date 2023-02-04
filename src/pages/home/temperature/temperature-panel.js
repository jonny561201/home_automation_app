import React, { useState, useContext } from 'react';
import { Image, Text, View } from 'react-native';
import { setUserTemperature } from '../../../utilities/rest-api'
import Accordion from '../../../components/accordion';
import TempIcon from '../../../resources/panelIcons/TemperatureIcon.png';
import { Context } from '../../../state/store';
import TemperatureImage from './temperature-image';
import TempSlider from '../../../components/controls/temp-slider';
import styles from './temperature-panel.styles';
import { RadialSlider } from 'react-native-radial-slider';


export default function TemperaturePanel() {
    const [state, dispatch] = useContext(Context);
    const [open, setOpen] = useState(false);
    const [speed, setSpeed] = useState(72);
    const [color, setColor] = useState('#db5127');
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

    const test = (value) => {
//55 = #3DA3C5
//60 = #5497AE
//65 = #6A8B98
//70 = #817F81
//75 = #97746B
//80 = #AE6854
//85 = #C45D3E

        setSpeed(value);
        if (value < 60)
            setColor('#27AEDB');
        else if (value <= 55)
            setColor('#3DA3C5')
        else if (value <= 60)
            setColor('#5497AE')
        else if (value <= 65)
            setColor('#6A8B98')
        else if (value <= 70)
            setColor('#817F81')
        else if (value <= 75)
            setColor('#97746B')
        else if (value <= 80)
            setColor('#AE6854')
        else if (value <= 85)
            setColor('#C45D3E')
        else if (value >= 80)
            setColor('#db5127');
    }

    return (
        <Accordion style={styles.temperaturePanel} onPress={() => { setOpen(!open) }}>
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
                <View>
                    <View style={styles.formContainer}>
                        <View style={styles.tempImages}>
                            <TemperatureImage value={0} />
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <RadialSlider
                                value={speed}
                                min={50}
                                max={90}
                                onChange={test}
                                unit="&deg;"
                                sliderWidth={30}
                                lineSpace={3}
                                thumbColor='white'
                                markerLineSize={20}
                                isHideSubtitle={true}
                                isHideButtons={true}
                                // isHideLines={true}
                                valueStyle={{ fontSize: 70, paddingLeft: 20 }}
                                unitStyle={{ fontSize: 40 }}
                                linearGradient={[{ offset: '0%', color: '#27aedb' }, { offset: '100%', color: color }]}
                            />
                            <TempSlider hasHvac={hasHvacTask} value={state.tempData.modeValue} slideComplete={modeToggle} />
                        </View>

                        {/* <CircularSlider startAngle={20} angleLength={300}/> */}
                        {/* <Knob value={state.tempData.currentDesiredTemp} lineCap={"round"} inputColor={state.tempData.gaugeColor} fgColor={state.tempData.gaugeColor} title="Desired Temp"
                                onChange={knobChange} angleArc={240} angleOffset={240} min={state.tempData.minThermostatTemp} max={state.tempData.maxThermostatTemp} /> */}
                    </View>
                </View>
            </View>
        </Accordion >
    )
}