import React, { useContext } from 'react';
import LogoHeader from './logo-header';
import AccountIcon from './account-icon';
import { Context } from '../state/store';
// import UserLocation from '../../pages/Home/segments/UserLocation';
import { View, Text } from 'react-native';
import StateUtil from '../utilities/state-util';
import styles from './header.styles';


export default function Header(props) {
    const [state,] = useContext(Context);
    const activePage = state.activePage;

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
        <View style={styles.headerContainer}>
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