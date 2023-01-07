import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import Accordion from '../../../components/accordion';
import SecurityIcon from '../../../resources/panelIcons/SecurityIcon.png';
import styles from './security-panel.styles';


export default function SecurityPanel() {
    const [open, setOpen] = useState(false);

    return (
        <Accordion style={styles.securityPanel} onPress={() => { setOpen(!open) }}>
            <View style={styles.titleGroup}>
                <Image style={styles.iconImage} source={SecurityIcon} />
                <View style={styles.securityHeader}>
                    <Text style={styles.statusTextBold}>Security</Text>
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