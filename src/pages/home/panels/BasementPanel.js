import BasementIcon from '../../../resources/panelIcons/BasementIcon.png';
import SumpPumpHighIcon from '../../../resources/panelIcons/SumpPumpHighIcon.png';
import SumpPumpLowIcon from '../../../resources/panelIcons/SumpPumpLowIcon.png';
import SumpPumpMediumHighIcon from '../../../resources/panelIcons/SumpPumpMediumHighIcon.png';
import SumpPumpMediumLowIcon from '../../../resources/panelIcons/SumpPumpMediumLowIcon.png';


import React, { useContext, useState } from 'react';
import { Text, View, Image } from 'react-native';
import Accordian from '../../../components/Accordion';
import { Context } from '../../../state/Store';
import { Divider } from '@react-native-material/core';
import styles from './BasementPanel.styles';

export default function BasementPanel() {
    const [open, setOpen] = useState(false);
    const [state,] = useContext(Context);

    const getSumpIcon = () => {
        if (state.sumpData.warningLevel === 0) {
            return <Image data-testid={"warning-low"} alt="sump pump" style={styles.sumpIcon} source={SumpPumpLowIcon} label="warning-low" />
        } else if (state.sumpData.warningLevel === 1) {
            return <Image data-testid={"warning-medium-low"} alt="sump pump" style={styles.sumpIcon} source={SumpPumpMediumLowIcon} label="warning-medium-low" />
        } else if (state.sumpData.warningLevel === 2) {
            return <Image data-testid={"warning-medium-high"} alt="sump pump" style={styles.sumpIcon} source={SumpPumpMediumHighIcon} label="warning-medium-high" />
        } else if (state.sumpData.warningLevel === 3) {
            return <Image data-testid={"warning-high"} alt="sump pump" style={styles.sumpIcon} source={SumpPumpHighIcon} label="warning-high" />
        }
    }

    return (
        <Accordian style={styles.basementPanel} onPress={() => { setOpen(!open) }}>
            <View style={styles.titleGroup}>
                <Image alt="basement" style={styles.iconImage} source={BasementIcon} />
                <View style={styles.basementHeader}>
                    <Text style={styles.statusTextBold}>Basement</Text>
                    {!open &&
                        <View style={styles.smallTextGroup}>
                            <Text style={styles.smallText}>Depth:</Text>
                            <Text style={[styles.smallText, state.sumpData.warningLevel === 3 ? 'alert' : 'healthy']}>{state.sumpData.currentDepth}</Text>
                            <Text style={[styles.smallText, state.sumpData.warningLevel === 3 ? 'alert' : 'healthy']}>{state.sumpData.depthUnit}</Text>
                        </View>
                    }
                </View>
            </View>
            <Divider />
            <View style={styles.sumpGroup}>
                {getSumpIcon()}
                <View className={styles.sumpMeasureGroup}>
                    <View style={styles.sumpTextGroup}>
                        <Text className={[styles.currentText, styles.sumpText]}>Current: </Text>
                        <Text style={"current-depth sump-text text " + (state.sumpData.warningLevel === 3 ? 'alert' : 'healthy')}>{state.sumpData.currentDepth}</Text>
                        <Text style={"current-text sump-text text " + (state.sumpData.warningLevel === 3 ? 'alert' : 'healthy')}>{state.sumpData.depthUnit}</Text>
                    </View>
                    <View style={styles.sumpTextGroup}>
                        <Text style={[styles.averageText, styles.sumpText]}>Average: </Text>
                        <Text style={[styles.averageDepth, styles.sumpText]}>{state.sumpData.averageDepth}</Text>
                        <Text style={[styles.averageText, styles.sumpText]}>{state.sumpData.depthUnit}</Text>
                    </View>
                </View>
            </View>
        </Accordian >
    );
}