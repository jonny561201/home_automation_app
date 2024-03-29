import React, { useContext, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Accordion from '../../../components/accordion';
import BasementIcon from '../../../resources/panelIcons/BasementIcon.png';
import SumpPumpHighIcon from '../../../resources/panelIcons/SumpPumpHighIcon.png';
import SumpPumpLowIcon from '../../../resources/panelIcons/SumpPumpLowIcon.png';
import SumpPumpMediumHighIcon from '../../../resources/panelIcons/SumpPumpMediumHighIcon.png';
import SumpPumpMediumLowIcon from '../../../resources/panelIcons/SumpPumpMediumLowIcon.png';
import { Context } from '../../../state/store';
import styles from './basement-panel.styles';


export default function BasementPanel() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [state,] = useContext(Context);

    const getSumpIcon = () => {
        if (state.sumpData.warningLevel === 0) {
            return <Image style={styles.sumpIcon} source={SumpPumpLowIcon} />
        } else if (state.sumpData.warningLevel === 1) {
            return <Image style={styles.sumpIcon} source={SumpPumpMediumLowIcon} />
        } else if (state.sumpData.warningLevel === 2) {
            return <Image style={styles.sumpIcon} source={SumpPumpMediumHighIcon} />
        } else if (state.sumpData.warningLevel === 3) {
            return <Image style={styles.sumpIcon} source={SumpPumpHighIcon} />
        }
    }

    return (
        <Accordion style={styles.basementPanel} onPress={() => { setOpen(!open) }}>
            <View style={styles.titleGroup}>
                <Image style={styles.iconImage} source={BasementIcon} />
                <View style={styles.basementHeader}>
                    <Text style={[styles.statusTextBold, {color: theme.colors.primaryFont}]}>Basement</Text>
                    {!open &&
                        <View style={styles.smallTextGroup}>
                            <Text style={[styles.smallText, {color: theme.colors.secondaryFont}]}>Depth:</Text>
                            <Text style={[styles.smallText, {color: theme.colors.secondaryFont}, state.sumpData.warningLevel === 3 ? styles.alert : styles.healthy]}>{state.sumpData.currentDepth} {state.sumpData.depthUnit}</Text>
                        </View>
                    }
                </View>
            </View>
            <View style={styles.sumpGroup}>
                {getSumpIcon()}
                <View style={styles.sumpMeasureGroup}>
                    <View style={styles.smallTextGroup}>
                        <Text style={{color: theme.colors.secondaryFont}}>Current: </Text>
                        <Text style={[{color: theme.colors.secondaryFont}, state.sumpData.warningLevel === 3 ? styles.alert : styles.healthy]}>{state.sumpData.currentDepth} {state.sumpData.depthUnit}</Text>
                    </View>
                    <View style={styles.smallTextGroup}>
                        <Text style={{color: theme.colors.secondaryFont}}>Average: </Text>
                        <Text style={{color: theme.colors.secondaryFont}}>{state.sumpData.averageDepth} {state.sumpData.depthUnit}</Text>
                    </View>
                </View>
            </View>
        </Accordion >
    );
}