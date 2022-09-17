import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Context } from '../../../state/store';
import { debounchApi } from '../../../utilities/services';
import { setLightState } from '../../../utilities/rest-api';
import Slider from "@react-native-community/slider";
import styles from './switch-slider.styles'


export default function SwitchSlider(props) {
    const initialBrightness = Math.round(props.data.brightness / 2.55);
    const [state, dispatch] = useContext(Context);
    const [light, setLight] = useState(props.data);
    const [lightId,] = useState(props.data.lightId);
    const [groupId,] = useState(props.data.groupId);
    const [brightness, setBrightness] = useState(initialBrightness);
    const [prevBrightness, setPrevBrightness] = useState(0);

    useEffect(() => {
        const group = state.lights.find(x => x.groupId === props.data.groupId)
        if (group && group.lights) {
            setLight(group.lights.find(y => y.lightId === lightId));
        }
    });

    const updateSlider = (event, value) => {
        const newLight = { ...light, brightness: value * 2.55, on: value > 0 };
        setLight(newLight);
        debounchApi(() => setLightState(state.auth.bearer, lightId, true, value * 2.55));
        const newList = state.lights.map(x => (x.groupId === groupId) ? { ...x, lights: x.lights.map(y => (y.lightId === lightId) ? newLight : y) } : x);
        dispatch({ type: 'SET_LIGHTS', payload: newList });
    }

    const toggleLight = async () => {
        const newState = !light.on;
        const newBrightness = !newState ? 0 : prevBrightness;
        await setLightState(state.auth.bearer, lightId, newState, newBrightness)
        setPrevBrightness(light.brightness);

        const newLight = { ...light, brightness: newBrightness, on: newState };
        const newList = state.lights.map(x => (x.groupId === groupId) ? { ...x, lights: x.lights.map(y => (y.lightId === lightId) ? newLight : y) } : x);
        setLight(newLight);
        dispatch({ type: 'SET_LIGHTS', payload: newList });
    }

    return (
        <View style={styles.lightGroup}>
            <View style={styles.lightSpacerOne}/>
            <TouchableOpacity onPress={toggleLight}>
                <Text style={styles.lightTextSmall}>{light.lightName}</Text>
            </TouchableOpacity>
            <Slider value={brightness} onValueChange={(event, val) => updateSlider(event, val)} style={{ width: 200 }} minimumTrackTintColor='#00c774' thumbTintColor='white' maximumValue={100}/>

            {/*<CustomSlider onChange={(event, val) => updateSlider(event, val)} value={Math.round(light.brightness / 2.55)} valueLabelDisplay="auto" aria-label="slider" />*/}
            <View style={styles.lightSpacerTwo}/>
        </View>
    )
}