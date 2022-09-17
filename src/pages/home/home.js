import React, { useContext, useCallback } from "react";
import { View } from 'react-native';
import Header from '../../header/header';
import styles from './home.styles';
import BasementPanel from './basement/basement-panel';
import GaragePanel from './garage/garage-panel';
import { Context } from "../../state/store";
import { useFocusEffect } from "@react-navigation/native";


export default function Home(props) {
    const [, dispatch] = useContext(Context);

    useFocusEffect(
        useCallback(() => {
            dispatch({type: 'SET_ACTIVE_PAGE', payload: 'Home'});
        }, [dispatch])
    );

    return (
        <>
            <View style={styles.pageContainer}>
                <Header toggleMenu={props.navigation.toggleDrawer} />
            </View>
            <View>
                <GaragePanel/>
                <BasementPanel/>
            </View>
        </>
    )
}