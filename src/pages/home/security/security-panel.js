import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import { Image, Text, View } from 'react-native';
import Accordion from '../../../components/accordion';
import SecurityIcon from '../../../resources/panelIcons/SecurityIcon.png';
import styles from './security-panel.styles';


export default function SecurityPanel() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    return (
        <Accordion style={styles.securityPanel} onPress={() => { setOpen(!open) }}>
            <View style={styles.titleGroup}>
                <Image style={styles.iconImage} source={SecurityIcon} />
                <View style={styles.securityHeader}>
                    <Text style={[styles.statusTextBold, {color: theme.colors.font}]}>Security</Text>
                </View>
            </View>
            <View style={styles.securityGroup}>
                <View style={styles.smallTextGroup}>
                    <Text style={{color: theme.colors.font}}>Test Text for Now</Text>
                </View>
            </View>
        </Accordion >
    )
}