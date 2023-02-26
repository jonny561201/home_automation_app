import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import { Text, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import styles from './thermostat-toggle.sytles';


export default function ThermostatToggle(props) {
    const modes = {'off': 0, 'heating': 1, 'cooling': 2, 'auto': 3}
    const theme = useTheme();
    const [value, setValue] = useState(modes[props.mode]);

    const onSlideComplete = (item) => {
        const position = item[0];
        setValue(position);
        props.slideComplete(position);
    }

    const trackMark = () => {
        return (<View style={styles.trackMark}></View>)
    }

    return (
        <>
            <View style={{ width: 140 }}>
                <View style={styles.textContainerThree}>
                    <Text style={[styles.sliderText, { color: theme.colors.secondaryFont }]}>Off</Text>
                    <Text style={[styles.sliderText, { paddingLeft: 10, color: theme.colors.secondaryFont }]}>Heat</Text>
                    <Text style={[styles.sliderText, { paddingLeft: 10, color: theme.colors.secondaryFont }]}>Cool</Text>
                </View>
                <Slider
                    minimumValue={0}
                    maximumValue={2}
                    minimumTrackTintColor={props.color}
                    step={1}
                    disabled={props.disabled}
                    thumbStyle={{ height: 40, width: 60, backgroundColor: 'white', elevation: 5 }}
                    trackStyle={{ height: 40, borderRadius: 10 }}
                    trackMarks={[0, 1, 2]}
                    value={value}
                    onSlidingComplete={onSlideComplete}
                    renderTrackMarkComponent={trackMark}
                />
            </View>
        </>
    )
} 