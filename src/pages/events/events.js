import React, { useCallback, useContext } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Context } from "../../state/store";
import { FAB } from 'react-native-paper';
import { deleteScheduledTask } from '../../utilities/rest-api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../header/header';
import styles from './events.styles';
import Event from './event';


export default function Events(props) {
    const [state, dispatch] = useContext(Context);

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

    return (
        <>
            <Header toggleMenu={props.navigation.toggleDrawer} />
            <View style={styles.pageContainer}>
                <View style={styles.eventsBody}>
                    <Text style={styles.eventsHeader}>Events</Text>
                    <SwipeListView
                        data={state.tasks}
                        rightOpenValue={-150}
                        disableRightSwipe
                        previewRowKey={'0'}
                        style={{ marginBottom: 20 }}
                        renderItem={(data) => (
                            <Event task={data.item} key={`${data.item.task_type}-${data.item.alarm_days}-${data.item.enabled}`} />
                        )}
                        renderHiddenItem={(data) => (
                            <View style={styles.swipeContainer}>
                                <TouchableOpacity style={styles.swipeEdit} onPress={() => editEvent(data.item)}>
                                    <Icon name='edit' size={30} style={styles.swipeText} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.swipeDelete} onPress={() => deleteEvent(data.item)}>
                                    <Icon name='delete' size={30} style={styles.swipeText} />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                    {/* {
                        state.tasks.map(x => <Event task={x} key={`${x.task_type}-${x.alarm_days}-${x.enabled}`} />)
                    } */}
                </View>
            </View>
            <FAB style={styles.fab} onPress={() => { }} label='Create Event' icon={(props) => <Icon {...props} name='person-add' />} color='#ffffff' />
        </>
    )
}