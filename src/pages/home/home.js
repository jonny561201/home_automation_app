import React, { useContext, useCallback } from "react";
import { View, ScrollView } from 'react-native';
import Header from '../../header/header';
import styles from './home.styles';
import BasementPanel from './basement/basement-panel';
import GaragePanel from './garage/garage-panel';
import { Context } from "../../state/store";
import { useFocusEffect } from "@react-navigation/native";
import LightingPanel from "./lighting/lighting-panel";


export default function Home(props) {
    const [state, dispatch] = useContext(Context);
    const roles = state.user.roles;

    useFocusEffect(
        useCallback(() => {
            dispatch({type: 'SET_ACTIVE_PAGE', payload: 'Home'});
        }, [dispatch])
    );

    return (
        <>
            <View style={styles.pageContainer}>
                <Header toggleMenu={props.navigation.toggleDrawer}/>
            </View>
            <ScrollView>
                {
                    roles.some(x => x.role_name === 'garage_door') &&
                    <GaragePanel/>
                }
                {
                    roles.some(x => x.role_name === 'sump_pump') &&
                    <BasementPanel/>
                }
                {
                    roles.some(x => x.role_name === 'lighting') &&
                    <LightingPanel/>
                }
            </ScrollView>
        </>
    )
}