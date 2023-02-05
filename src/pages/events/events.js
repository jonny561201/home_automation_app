import React, { useCallback, useContext } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, ScrollView } from 'react-native';
import { Context } from "../../state/store";
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../header/header';
import styles from './events.styles';


export default function Events(props) {
    const [state, dispatch] = useContext(Context);

    useFocusEffect(
        useCallback(() => {
            dispatch({ type: 'SET_ACTIVE_PAGE', payload: 'Events' });
        }, [dispatch])
    );

    return (
        <>
            <Header toggleMenu={props.navigation.toggleDrawer} />
            <ScrollView style={styles.pageContainer}>
            <View style={styles.eventsBody}>
                    <Text style={styles.eventsHeader}>Events</Text>
                </View>
            </ScrollView>
            <FAB style={styles.fab} onPress={() => {}} label='Add User' icon={(props) => <Icon {...props} name='person-add' />} color='#ffffff' />
        </>
    )
}