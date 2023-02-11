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
        if (position === 1)
            setColor('#db5127') //hot
        else if (position === 2)
            setColor('#27AEDB')  //cool
        else if (position === 3)
            setColor('#00c774')  //green
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
            {
                props.hasHvac
                    ? <View style={{ width: 140 }}>
                        <View style={styles.textContainerFour}>
                            <Text style={[styles.sliderText, { paddingLeft: 20, color: theme.colors.font }]}>Off</Text>
                            <Text style={[styles.sliderText, { paddingLeft: 6, color: theme.colors.font }]}>Heat</Text>
                            <Text style={[styles.sliderText, { color: theme.colors.font }]}>Cool</Text>
                            <Text style={[styles.sliderText, { paddingRight: 20, color: theme.colors.font }]}>Auto</Text>
                        </View>
                        <Slider
                            minimumValue={0}
                            maximumValue={3}
                            minimumTrackTintColor={color}
                            step={1}
                            thumbStyle={{ height: 40, width: 60, backgroundColor: 'white', elevation: 5 }}
                            trackStyle={{ height: 40, borderRadius: 10 }}
                            trackMarks={[0, 1, 2, 3]}
                            value={value}
                            onSlidingComplete={onSlideComplete}
                            renderTrackMarkComponent={trackMark}
                            onValueChange={updateColor}
                        />
                    </View>
                    : <View style={{ width: 140 }}>
                        <View style={styles.textContainerThree}>
                            <Text style={[styles.sliderText, { color: theme.colors.font }]}>Off</Text>
                            <Text style={[styles.sliderText, { paddingLeft: 10, color: theme.colors.font }]}>Heat</Text>
                            <Text style={[styles.sliderText, { paddingLeft: 10, color: theme.colors.font }]}>Cool</Text>
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
            }

        </>

    )
} 