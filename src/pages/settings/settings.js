import React, { useContext, useCallback } from "react";
import { Text } from 'react-native';
import Header from '../../header/Header';
import { Context } from "../../state/Store";
import { useFocusEffect } from "@react-navigation/native";


export default function Settings(props) {
    const [, dispatch] = useContext(Context);

    useFocusEffect(
        useCallback(() => {
            dispatch({type: 'SET_ACTIVE_PAGE', payload: 'Settings'});
        }, [dispatch])
    );

    return (
        <>
            <Header toggleMenu={props.navigation.toggleDrawer} />
            <Text>Settings</Text>
            <Text>Isnt it beautiful?</Text>
        </>
    )
}