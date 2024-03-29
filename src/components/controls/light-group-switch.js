import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import { Context } from '../../state/store';
import { ExpandButton } from './buttons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { setLightGroupState } from '../../utilities/rest-api';
import { TouchableRipple, useTheme } from 'react-native-paper';
import { Slider } from '@miblanchard/react-native-slider';
import SwitchSlider from "../../pages/home/lighting/switch-slider";
import styles from './light-group-switch.styles'


export default function LightGroupSwitch(props) {
    const [state, dispatch] = useContext(Context);
    const theme = useTheme();
    const [isOn, setIsOn] = useState(props.data.on);
    const [lights,] = useState(props.data.lights);
    const [groupId,] = useState(props.data.groupId);
    const [groupName,] = useState(props.data.groupName);
    const [brightness, setBrightness] = useState(props.data.brightness);
    const [prevBrightness, setPrevBrightness] = useState(props.data.brightness);
    const [areLightsOpen, setLightsOpen] = useState(false);

    const slideLightGroup = async (value) => {
        const brightness = value[0]
        setLightGroupState(state.auth.bearer, groupId, true, brightness);
        updateGroup(brightness);
        setIsOn(brightness > 0);
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
                <ExpandButton onPress={() => setLightsOpen(!areLightsOpen)} rotate='90' direction='right' color={theme.colors.primaryFont} />
                <TouchableRipple style={styles.lightButton} onPress={toggleLightGroup} borderless={true}>
                    <Text numberOfLines={1} style={[styles.lightText, {color: theme.colors.primaryFont}]}>{groupName}</Text>
                </TouchableRipple>
                <Slider
                    style={{ marginRight: 40 }}
                    value={brightness}
                    onSlidingComplete={slideLightGroup}
                    trackStyle={{ width: 200 }}
                    minimumTrackTintColor={theme.colors.primary}
                    maximumTrackTintColor={theme.colors.secondaryFont}
                    thumbTintColor='white'
                    minimumValue={0}
                    maximumValue={100} />
                <Icon name='brightness-medium' style={styles.brightnessIcon} color={theme.colors.primaryFont}/>
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