import React, { useContext, useCallback } from "react";
import { ScrollView } from 'react-native';
import { useTheme } from "react-native-paper";
import Header from '../../header/header';
import styles from './home.styles';
import BasementPanel from './basement/basement-panel';
import GaragePanel from './garage/garage-panel';
import { Context } from "../../state/store";
import { useFocusEffect } from "@react-navigation/native";
import LightingPanel from "./lighting/lighting-panel";
import SecurityPanel from "./security/security-panel";
import TemperaturePanel from "./temperature/temperature-panel";


export default function Home(props) {
    const [state, dispatch] = useContext(Context);
    const roles = state.user.roles;
    const theme = useTheme();

    useFocusEffect(
        useCallback(() => {
            dispatch({ type: 'SET_ACTIVE_PAGE', payload: 'Home' });
        }, [dispatch])
    );

    return (
        <>
            <Header toggleMenu={props.navigation.toggleDrawer} />
            <ScrollView style={[styles.pageContainer, {backgroundColor: theme.colors.background}]}>
                {
                    roles.some(x => x.role_name === 'garage_door') &&
                    <GaragePanel />
                }
                {
                    roles.some(x => x.role_name === 'sump_pump') &&
                    <BasementPanel />
                }
                                {
                    roles.some(x => x.role_name === 'thermostat') &&
                    <TemperaturePanel />
                }
                {
                    roles.some(x => x.role_name === 'lighting') &&
                    <LightingPanel />
                }
                {
                    roles.some(x => x.role_name === 'security') &&
                    <SecurityPanel />
                }
            </ScrollView>
        </>
    )
}