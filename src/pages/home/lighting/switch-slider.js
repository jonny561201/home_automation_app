import React, { useState, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TouchableRipple, useTheme } from 'react-native-paper';
import { Context } from '../../../state/store';
import { setLightState } from '../../../utilities/rest-api';
import Slider from "@react-native-community/slider";
import styles from './switch-slider.styles'


export default function SwitchSlider(props) {
    const [state, dispatch] = useContext(Context);
    const theme = useTheme();
    const [light, setLight] = useState({});
    const [lightId,] = useState(props.lightId);
    const [groupId,] = useState(props.groupId);
    const [prevBrightness, setPrevBrightness] = useState(0);

    useEffect(() => {
        const group = state.lights.find(x => x.groupId === props.groupId);
        if (group?.lights)
            setLight(group.lights.find(y => y.lightId === props.lightId));

    });

    const updateSlider = async (value) => {
        await updateLight(value, value > 0);
    }

    const toggleLight = async () => {
        const newState = !light.on;
        const newBrightness = !newState ? 0 : prevBrightness;
        setPrevBrightness(light.brightness);
        await updateLight(newBrightness, newState);
    }

    const updateLight = async (brightness, on) => {
        const newLight = { ...light, brightness: brightness, on: on };
        const newList = state.lights.map(x => (x.groupId === groupId) ? { ...x, lights: x.lights.map(y => (y.lightId === lightId) ? newLight : y) } : x);
        setLight(newLight);
        dispatch({ type: 'SET_LIGHTS', payload: newList });
        await setLightState(state.auth.bearer, lightId, on, brightness);
    }

    return (
        <View style={styles.lightGroup}>
            <View style={styles.lightSpacerOne}/>
            <TouchableRipple onPress={toggleLight} borderless={true} style={styles.lightButton}>
                <Text style={[styles.lightTextSmall, {color: theme.colors.secondaryFont}]}>{light.lightName}</Text>
            </TouchableRipple>
            <Slider
                value={light?.brightness}
                onSlidingComplete={updateSlider}
                style={{ width: 210 }}
                minimumTrackTintColor={theme.colors.primary}
                maximumTrackTintColor={theme.colors.primaryFont}
                thumbTintColor='white'
                maximumValue={100} />

            <View style={styles.lightSpacerTwo}/>
        </View>
    )
}