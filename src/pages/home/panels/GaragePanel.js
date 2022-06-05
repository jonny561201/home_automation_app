import React, { useContext, useState } from 'react';
import { Divider } from '@react-native-material/core';
import Accordian from '../../../components/Accordion';
import { View, Text, Image } from 'react-native';
import { Context } from '../../../state/Store';
import GarageDoor from '../segments/GarageDoor';
import GarageIcon from '../../../resources/panelIcons/GarageDoorIcon.png'
import styles from './GaragePanel.styles';
import { GreenButton } from '../../../components/controls/Buttons';


export default function GaragePanel() {
    const [open, setOpen] = useState(false);
    const [state, dispatch] = useContext(Context);
    const [displayRegister, setDisplayRegister] = useState(false);
    const [wrapperRef, setWrapperRef] = useState(null);

    const renderDoors = () => {
        // //TODO: need to test all of this behavior
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
                        <View>
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
            </View>
            {state.devicesToRegister
                ? <View style={styles.registerDoor}>
                        <View style={styles.registerGroup}>
                            <Text style={[styles.statusTextBold, styles.registerText]}>Register Garage Door</Text>
                            <Divider />
                        </View>
                        <View style={styles.registerBody}>
                            <View style={styles.registerGroup}>
                                <Text style={[styles.statusText, styles.registerText]}>A new device has been detected and needs to be registered.</Text>
                            </View>
                            <View>
                                <GreenButton onPress={() => setDisplayRegister(true)}>Register</GreenButton>
                            </View>
                            {/* <View ref={(node) => { setWrapperRef(node) }}>
                                {displayRegister && <RegisterDevice close={closeModal} parentRef={wrapperRef} />}
                            </View> */}
                        </View>
                  </View>
                : <View style={styles.doorGroups}>{renderDoors()}</View>
            }
        </Accordian>
    );
}