import React, { useCallback, useContext } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Context } from "../../state/store";
import { FAB } from 'react-native-paper';
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

    //Light Activity
    // props.task.task_type
    // props.task.alarm_days
    // props.task.alarm_time
    // props.task.enabled

    //hvac Activity
    // props.task.task_type
    // props.task.alarm_days
    // props.task.enabled
    // props.task.hvac_stop
    // props.task.hvac_start
    // props.task.hvac_start_temp
    // props.task.hvac_stop_temp

    const editEvent = (item) => {
        console.log(item)
    }

    const deleteEvent = (item) => {
        console.log(item)
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