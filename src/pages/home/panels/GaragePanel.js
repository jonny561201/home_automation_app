import React, { useContext, useState } from 'react';
import { Divider } from '@react-native-material/core';
import Accordian from '../../../components/Accordion';
import { View, Text, Image, Modal } from 'react-native';
import { Context } from '../../../state/Store';
import GarageDoor from '../segments/GarageDoor';
import GarageIcon from '../../../resources/panelIcons/GarageDoorIcon.png'
import { GreenButton } from '../../../components/controls/Buttons';
import styles from './GaragePanel.styles';
import AddGarage from '../segments/AddGarage';


export default function GaragePanel() {
    const [open, setOpen] = useState(false);
    const [state, dispatch] = useContext(Context);
    const [displayRegister, setDisplayRegister] = useState(false);

    const renderDoors = () => {
        const devices = state.garageDoors;
        if (devices && devices.length > 0) {
            return devices.map(x => <GarageDoor key={`door-${x.doorName}`} device={x} />);
        }
        return <Text>No Garge devices have been registered</Text>
    }

    const closeModal = () => {
        setDisplayRegister(false);
        if (state.addedGarageNode)
            dispatch({ type: 'SET_DEVICES_TO_REGISTER', payload: false });
    }

    return (
        <Accordian style={styles.garagePanel} onPress={() => { setOpen(!open) }}>
            <View>
                <View style={styles.titleGroup}>
                    <Image style={styles.iconImage} source={GarageIcon} />
                    <View style={styles.garageHeader}>
                        <Text style={styles.statusTextBold}>Garage</Text>
                        {!open &&
                            state.garageDoors.map(x => {
                                return <View style={styles.smallTextGroup} key={`door-notify-${x.doorName}`}>
                                    <Text style={styles.smallText}>{x.doorName}:</Text>
                                    <Text style={[styles.smallText, x.isOpen ? styles.openText : null]}>{x.isOpen ? 'Open' : 'Closed'}</Text>
                                </View>
                            })
                        }
                    </View>
                </View>
            </View>
            {state.devicesToRegister
                ? <View style={styles.registerDoor}>
                    <View style={styles.registerGroup}>
                        <Text style={[styles.statusTextBold, styles.registerText]}>Register Garage Opener</Text>
                        <Divider />
                    </View>
                    <View style={styles.registerBody}>
                        <View style={styles.registerGroup}>
                            <Text style={[styles.statusText, styles.registerText]}>A new device has been detected and needs to be registered.</Text>
                        </View>
                        <View>
                            <GreenButton onPress={() => setDisplayRegister(true)}>Register</GreenButton>
                        </View>
                        <Modal animationType="slide" visible={displayRegister} onRequestClose={() => setDisplayRegister(false)}>
                            <AddGarage></AddGarage>
                        </Modal>
                    </View>
                </View>
                : <View style={styles.doorGroups}>{renderDoors()}</View>
            }
        </Accordian>
    );
}