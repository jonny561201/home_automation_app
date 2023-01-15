import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import { Context } from '../../state/store';
import { ExpandButton } from './buttons';
import { MaterialIcons } from '@expo/vector-icons';
import { setLightGroupState } from '../../utilities/rest-api';
import { TouchableRipple } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import SwitchSlider from "../../pages/home/lighting/switch-slider";
import styles from './light-group-switch.styles'


export default function LightGroupSwitch(props) {
    const [state, dispatch] = useContext(Context);
    const [isOn, setIsOn] = useState(props.data.on);
    const [lights,] = useState(props.data.lights);
    const [groupId,] = useState(props.data.groupId);
    const [groupName,] = useState(props.data.groupName);
    const [brightness, setBrightness] = useState(props.data.brightness);
    const [prevBrightness, setPrevBrightness] = useState(props.data.brightness);
    const [areLightsOpen, setLightsOpen] = useState(false);

    const slideLightGroup = async (value) => {
        setLightGroupState(state.auth.bearer, groupId, true, value);
        updateGroup(value);
        setIsOn(value > 0);
    };

    const toggleLightGroup = async () => {
        const newState = !isOn;
        setIsOn(newState);
        const newBrightness = !newState ? 0 : prevBrightness;
        setPrevBrightness(brightness);
        updateGroup(newBrightness);

        await setLightGroupState(state.auth.bearer, groupId, newState);
    }

    const getLightSwitches = () => {
        if (lights && lights.length > 0) {
            return lights.map(x => <SwitchSlider key={`switch-${x.lightId}`} lightId={x.lightId} groupId={x.groupId} />);
        }
        return <Text style={styles.panelText}>No lights assigned to group</Text>
    };

    const updateGroup = (brightness) => {
        setBrightness(brightness);
        const newList = state.lights.map(x => (x.groupId === groupId) ? { ...x, brightness: brightness, lights: x.lights.map(y => ({ ...y, brightness: brightness })) } : x);
        dispatch({ type: 'SET_LIGHTS', payload: newList });
    }

    return (
        <>
            <View style={styles.lightGroup}>
                <ExpandButton onPress={() => setLightsOpen(!areLightsOpen)} rotate='90' direction='right' />
                <TouchableRipple style={styles.lightButton} onPress={toggleLightGroup} borderless={true}>
                    <Text numberOfLines={1} style={styles.lightText}>{groupName}</Text>
                </TouchableRipple>
                <Slider value={brightness} onSlidingComplete={slideLightGroup} style={{ width: 200 }} minimumTrackTintColor='#00c774' thumbTintColor='white' maximumValue={100} />
                <MaterialIcons name='brightness-medium' style={styles.brightnessIcon} />
            </View>
            {
                areLightsOpen &&
                <View style={styles.lightGroupExpansion}>
                    {
                        getLightSwitches()
                    }
                </View>
            }
        </>
    );
}