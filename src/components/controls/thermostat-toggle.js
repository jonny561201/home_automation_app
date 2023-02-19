import React, { useState, useEffect } from 'react';
import { useTheme } from 'react-native-paper';
import { Text, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import styles from './thermostat-toggle.sytles';


export default function ThermostatToggle(props) {
    const theme = useTheme();
    const [value, setValue] = useState(props.value);
    const [color, setColor] = useState('#00c774');

    useEffect(() => {
        calculateColor(props.value);
    });

    const onSlideComplete = (item) => {
        const position = item[0];
        setValue(position);
        props.slideComplete(position);
    }

    const updateColor = (item) => {
        const position = item[0];
        calculateColor(position)
    }

    const calculateColor = (position) => {
        position === 1 ? setColor('#db5127') : setColor('#27AEDB');
    }

    const trackMark = () => {
        return (
            <View style={styles.trackMark}>
                <View></View>
            </View>
        )
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
                    minimumTrackTintColor={color}
                    step={1}
                    thumbStyle={{ height: 40, width: 60, backgroundColor: 'white', elevation: 5 }}
                    trackStyle={{ height: 40, borderRadius: 10 }}
                    trackMarks={[0, 1, 2]}
                    value={value}
                    onSlidingComplete={onSlideComplete}
                    renderTrackMarkComponent={trackMark}
                    onValueChange={updateColor}
                />
            </View>
        </>
    )
} 