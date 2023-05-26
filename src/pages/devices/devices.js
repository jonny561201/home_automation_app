import React, {useCallback, useContext, useState} from "react";
import Header from "../../header/header";
import {View, Text, ActivityIndicator, TouchableOpacity} from "react-native";
import {Dialog, FAB, Portal, useTheme} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect} from "@react-navigation/native";
import {Context} from "../../state/store";
import styles from "./devices.styles";
import {scanLights} from "../../utilities/rest-api";
import {SwipeListView} from "react-native-swipe-list-view";
import Event from "../events/event";
import RegisterDevice from "./register-device";


export default function Devices(props) {
    const [state, dispatch] = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [devices, setDevices] = useState([]);
    const theme = useTheme();

    useFocusEffect(
        useCallback(() => {
            dispatch({type: 'SET_ACTIVE_PAGE', payload: 'Devices'});
        }, [dispatch])
    );

    const scan = async () => {
        setTimeout(async () => {
            console.log('pressed me');
            const newDevices = await scanLights();
            setLoading(!loading);
        }, 5000);
    }

    return (
        <>
            <Header toggleMenu={props.navigation.toggleDrawer}/>
            <View style={styles.pageContainer}>
                <View style={styles.devicesBody}>

                    <Text style={[styles.headerText, {color: theme.colors.primaryFont}]}>Scan for New Devices</Text>
                    <ActivityIndicator animating={loading} size='large' color='#00c774'/>
                    <SwipeListView
                        data={devices}
                        rightOpenValue={-150}
                        disableRightSwipe
                        previewRowKey={'0'}
                        style={{marginBottom: 20}}
                        renderItem={(data) => (
                            <Event task={data.item}
                                   key={`${data.item.task_type}-${data.item.alarm_days}-${data.item.enabled}`}/>
                        )}
                        renderHiddenItem={(data) => (
                            <View style={[styles.swipeContainer, {backgroundColor: theme.colors.surface}]}>
                                <TouchableOpacity style={styles.swipeEdit} onPress={() => editEvent(data.item)}>
                                    <Icon name='playlist-add' size={30} style={styles.swipeText}/>
                                </TouchableOpacity>
                            </View>
                        )}
                    />

                    <Portal style={{ backgroundColor: theme.colors.background }}>
                        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                            <RegisterDevice close={() => setVisible(false)} />
                        </Dialog>
                    </Portal>
                </View>
            </View>

            <FAB style={styles.fab} onPress={scan} label='Scan Devices' icon={(props) => <Icon {...props} name='qr-code-scanner'/>} color='#ffffff'/>
        </>
    )
}