import LightSwitch from '../../../components/controls/light-switch';
import LightingIcon from '../../../resources/panelIcons/LightingIcon.png';

import React, { useContext, useState } from 'react';
import { Context } from '../../../state/store';
import { View, Text, Image } from 'react-native';
import styles from './lighting-panel.styles';
import Accordian from '../../../components/accordion';

export default function LightingPanel() {
    const [state,] = useContext(Context);
    const [open, setOpen] = useState(false);

    const renderGroups = () => {
        if (state.lights && state.lights.length) {
            return state.lights.map(group => <LightSwitch key={`switch-${group.groupId}`} data={group} />)
        }
        return <Text>No Light Groups were found</Text>
    };

    return (
        <Accordian style={styles.lightingPanel} onPress={() => { setOpen(!open) }}>
            <View style={styles.titleGroup}>
                <Image style={styles.iconImage} source={LightingIcon} />
                <Text style={[styles.panelText, styles.panelHeaderText]}>Lighting</Text>
            </View>
            <View style={styles.center}>
                <View style={styles.lightPanelGroup}>
                    {renderGroups()}
                </View>
            </View>
        </Accordian>
    );
}