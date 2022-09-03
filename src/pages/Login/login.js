import React from 'react';
import LogoHeader from '../../header/LogoHeader';
import { View, Text } from 'react-native';
import UserPass from './UserPass';
import { getStore } from '../../state/GlobalState';
import styles from './login.styles';


export default function Login() {
    getStore().setActivePage('Login');

    return (
        <View>
            <View style={styles.loginHeader}>
                <LogoHeader />
                <Text style={styles.loginHeaderText}>Member Login</Text>
            </View>
            <View style={styles.loginBody}>
                <UserPass />
            </View>
        </View>
    );
}