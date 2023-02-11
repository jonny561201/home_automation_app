import React, { useCallback, useContext, useState, useEffect } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Context } from "../../state/store";
import { FAB, Portal, Dialog, useTheme } from 'react-native-paper';
import { deleteScheduledTask } from '../../utilities/rest-api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../header/header';
import styles from './events.styles';
import Event from './event';
import CreateEvent from './create-event';


export default function Events(props) {
    const [state, dispatch] = useContext(Context);
    const [visible, setVisible] = useState(false);
    const [events, setEvents] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        setEvents(state.tasks.map((x, i) => ({...x, key: `${i}`})));
    }, []);

    useFocusEffect(
        useCallback(() => {
            dispatch({ type: 'SET_ACTIVE_PAGE', payload: 'Events' });
        }, [dispatch])
    );

    const editEvent = (item) => {
        console.log(item)
    }

    const deleteEvent = async (item) => {
        const response = await deleteScheduledTask(state.user.userId, state.auth.bearer, item.task_id);
        if (response.ok)
            dispatch({ type: 'DELETE_SCHEDULED_TASK', payload: item.task_id });
    }

    const closeDialog = () => setVisible(false);

    return (
        <>
            <Header toggleMenu={props.navigation.toggleDrawer} />
            <View style={[styles.pageContainer, {backgroundColor: theme.colors.background}]}>
                <View style={styles.eventsBody}>
                    <Text style={[styles.eventsHeader, {color: theme.colors.font}]}>Schedule Events</Text>
                    <SwipeListView
                        data={events}
                        rightOpenValue={-150}
                        disableRightSwipe
                        previewRowKey={'0'}
                        style={{ marginBottom: 20 }}
                        renderItem={(data) => (
                            <Event task={data.item} key={`${data.item.task_type}-${data.item.alarm_days}-${data.item.enabled}`} />
                        )}
                        renderHiddenItem={(data) => (
                            <View style={[styles.swipeContainer, {backgroundColor: theme.colors.surface}]}>
                                <TouchableOpacity style={styles.swipeEdit} onPress={() => editEvent(data.item)}>
                                    <Icon name='edit' size={30} style={styles.swipeText} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.swipeDelete} onPress={() => deleteEvent(data.item)}>
                                    <Icon name='delete' size={30} style={styles.swipeText} />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                        <Portal>
                            <Dialog visible={visible} onDismiss={closeDialog}>
                                <CreateEvent close={closeDialog}/>
                            </Dialog>
                        </Portal>
                </View>
            </View>
            <FAB style={styles.fab} onPress={() => setVisible(!visible)} label='Create Event' icon={(props) => <Icon {...props} name='calendar-today' />} color='#ffffff' />
        </>
    )
}