import React, { useCallback, useContext } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { Text, ScrollView } from 'react-native';
import { Context } from "../../state/store";
import { FAB, Portal, Provider, Dialog } from 'react-native-paper';
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
                <Text>Test</Text>
            </ScrollView>
            <FAB style={styles.fab} onPress={() => {}} label='Add User' icon={(props) => <Icon {...props} name='person-add' />} color='#ffffff' />
        </>
    )
}