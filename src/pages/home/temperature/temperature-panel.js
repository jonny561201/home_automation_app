import React, { useState, useContext } from 'react';
import { Image, Text, View } from 'react-native';
import Accordion from '../../../components/accordion';
import TempIcon from '../../../resources/panelIcons/TemperatureIcon.png';
import { Context } from '../../../state/store';
import styles from './temperature-panel.styles';


export default function TemperaturePanel() {
    const [state, dispatch] = useContext(Context);
    const [open, setOpen] = useState(false);

    return (
        <Accordion style={styles.securityPanel} onPress={() => { setOpen(!open) }}>
            <View style={styles.titleGroup}>
                <Image style={styles.iconImage} source={TempIcon} />
                <View style={styles.securityHeader}>
                    <Text style={styles.statusTextBold}>Temperature</Text>
                    {
                        !open &&
                        <View style={{ alignItems: 'flex-start', alignContent: 'flex-start' }}>
                            <View style={styles.smallTextGroup}>
                                <Text style={styles.smallText}>Outside:</Text>
                                <Text style={styles.smallText}>{state.forecastData.temp}&deg;</Text>
                            </View>
                            <View style={styles.smallTextGroup}>
                                <Text style={styles.smallText}>Inside:</Text>
                                <Text style={styles.smallText}>{state.tempData.currentTemp}&deg;</Text>
                            </View>
                        </View>
                    }
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