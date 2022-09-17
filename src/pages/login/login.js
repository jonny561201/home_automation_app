import React, { useContext, useEffect } from 'react';
import LogoHeader from '../../header/LogoHeader';
import { View, Text } from 'react-native';
import UserPass from './UserPass';
import styles from './login.styles';
import { Context } from "../../state/Store";


export default function Login() {
    const [, dispatch] = useContext(Context);

    useEffect(() => {
        console.log('login')
        dispatch({type: 'SET_ACTIVE_PAGE', payload: 'Login'});
    }, [])

    return (
        <View>
            <View style={styles.loginHeader}>
                <LogoHeader/>
                <Text style={styles.loginHeaderText}>Member Login</Text>
            </View>
            <View style={styles.loginBody}>
                <UserPass/>
            </View>
        </View>
    );
}