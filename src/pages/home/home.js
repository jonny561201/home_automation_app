import React, { useContext, useCallback } from "react";
import { View } from 'react-native';
import Header from '../../header/Header';
import styles from './Home.styles';
import BasementPanel from './basement/BasementPanel';
import GaragePanel from './garage/GaragePanel';
import { Context } from "../../state/Store";
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