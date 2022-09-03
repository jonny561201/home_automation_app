import React, { useState, useContext } from 'react';
import LogoHeader from './LogoHeader';
import AccountIcon from './AccountIcon';
import { Context } from '../state/Store';
import { getStore } from '../state/GlobalState';
// import UserLocation from '../../pages/Home/segments/UserLocation';
import { View, Text } from 'react-native';
import StateUtil from '../utilities/StateUtil';
import styles from './Header.styles';


export default function Header(props) {
    const [state,] = useContext(Context);
    const activePage = getStore().getActivePage();

    StateUtil();

    // useInterval(async () => {
    //     const isAuto = localStorage.getItem('auto-theme');
    //     if (isAuto === 'true') {
    //         isDayLight(state.garageCoords, state.userCoords)
    //             ? setTheme('theme-light')
    //             : setTheme('theme-dark')
    //     }
    // }, 60000);


    return (
        <View>
            <View style={styles.systemIconSpacer}/>
            <View style={styles.homeHeader}>
                <View style={styles.logoContainer}>
                    <LogoHeader />
                </View>
                <View style={{width: 40}}/>
                <View>
                    <Text style={styles.homeHeaderText}>{activePage}</Text>
                </View>
                <AccountIcon toggleMenu={props.toggleMenu}/>
            </View>
        </View>
    );
}