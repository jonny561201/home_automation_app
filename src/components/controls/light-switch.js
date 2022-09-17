import { TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import { Context } from '../../state/store';
import { ExpandButton } from './buttons';
import { MaterialIcons } from '@expo/vector-icons';
import { debounchApi } from '../../utilities/services';
import { setLightGroupState } from '../../utilities/rest-api';
import styles from './light-switch.styles'
import Slider from '@react-native-community/slider';
import SwitchSlider from "../../pages/home/lighting/switch-slider";

export default function LightSwitch(props) {
    const initialBrightness = Math.round(props.data.brightness / 2.55);
    const [state, dispatch] = useContext(Context);
    const [isOn, setIsOn] = useState(props.data.on);
    const [lights,] = useState(props.data.lights);
    const [groupId,] = useState(props.data.groupId);
    const [groupName,] = useState(props.data.groupName);
    const [brightness, setBrightness] = useState(initialBrightness);
    const [prevBrightness, setPrevBrightness] = useState(initialBrightness);
    const [areLightsOpen, setLightsOpen] = useState(false);

    const sliderToggleLightGroup = async (event, value) => {
        const newBrightness = Math.round(value * 2.55);
        debounchApi(() => setLightGroupState(state.auth.bearer, groupId, true, newBrightness));
        if (newBrightness > 0)
            setIsOn(true);
        setBrightness(value);
        const newList = state.lights.map(x => (x.groupId === groupId) ? { ...x, brightness: newBrightness, lights: x.lights.map(y => ({ ...y, brightness: newBrightness })) } : x);
        dispatch({ type: 'SET_LIGHTS', payload: newList });
    };

    const toggleLightGroup = async () => {
        const newState = !isOn;
        setIsOn(!isOn);
        await setLightGroupState(state.auth.bearer, groupId, newState);
        if (!newState) {
            setPrevBrightness(brightness);
            setBrightness(0);
            const newList = state.lights.map(x => (x.groupId === groupId) ? { ...x, brightness: 0, lights: x.lights.map(y => ({ ...y, brightness: 0 })) } : x);
            dispatch({ type: 'SET_LIGHTS', payload: newList });
        } else {
            setBrightness(prevBrightness);
            const newList = state.lights.map(x => (x.groupId === groupId) ? { ...x, brightness: prevBrightness, lights: x.lights.map(y => ({ ...y, brightness: Math.round(prevBrightness * 2.55) })) } : x);
            dispatch({ type: 'SET_LIGHTS', payload: newList });
        }
    }

    const getLightSwitches = () => {
        if (lights && lights.length > 0) {
            return lights.map(x => <SwitchSlider key={`switch-${x.lightId}`} data={x}/>);
        }
        return <Text style={styles.panelText}>No lights assigned to group</Text>
    };

    return (
        <View>
            <View style={styles.lightGroup}>
                <ExpandButton onPress={() => setLightsOpen(!areLightsOpen)} rotate='90' direction='right' />
                <TouchableOpacity style={styles.lightButton} onPress={toggleLightGroup}>
                    <Text numberOfLines={1} style={styles.lightText}>{groupName}</Text>
                </TouchableOpacity>
                <Slider value={brightness} onValueChange={sliderToggleLightGroup} style={{ width: 200 }} minimumTrackTintColor='#00c774' thumbTintColor='white' maximumValue={100}/>
                <MaterialIcons name='brightness-medium' style={styles.brightnessIcon} />
            </View>
            {
                areLightsOpen &&
                <View style={styles.lightGroupExpansion}>{getLightSwitches()}</View>
            }
        </View>
    );
}