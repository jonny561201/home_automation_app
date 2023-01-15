import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import Accordion from '../../../components/accordion';
import TempIcon from '../../../resources/panelIcons/TemperatureIcon.png';
import styles from './temperature-panel.styles';


export default function TemperaturePanel() {
    const [open, setOpen] = useState(false);

    return (
        <Accordion style={styles.securityPanel} onPress={() => { setOpen(!open) }}>
            <View style={styles.titleGroup}>
                <Image style={styles.iconImage} source={TempIcon} />
                <View style={styles.securityHeader}>
                    <Text style={styles.statusTextBold}>Temperature</Text>
                </View>
            </View>
            <View style={styles.securityGroup}>
                <View style={styles.smallTextGroup}>
                    <Text>Test Text for Now</Text>
                </View>
            </View>
        </Accordion >
    )
}