import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Context } from "../../state/store";
import { View } from 'react-native';
import Header from '../../header/header';
import AccountChildUser from './account-child-user';
import ChangePassword from './change-password';
import { FAB } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './account.styles';


export default function Account(props) {
    const [state, dispatch] = useContext(Context);
    const [childAccounts, setChildAccounts] = useState([{user_name: 'Jonny561201', roles: [{role_name: 'garage'}, {role_name: 'thermostat'}, {role_name: 'lights'}]}]);

    useFocusEffect(
        useCallback(() => {
            dispatch({ type: 'SET_ACTIVE_PAGE', payload: 'Account' });
        }, [dispatch])
    );

    useEffect(() => {
        // const getData = async () => {
        //     const response = await getUserChildAccounts(state.user.userId, state.auth.bearer);
        //     setChildAccounts(response);
        // };
        // getData();
    });

    const submitChildAccount = async () => {
        if ((!isEmailInvalid && !isRoleInvalid) && (selectedRole.length !== 0 && email !== null && email !== "")) {
            const response = await addUserChildAccount(state.user.userId, state.auth.bearer, email, selectedRole);
            setChildAccounts(response);
            setEmail("");
            setSelectedRole([]);
        } else {
            setIsEmailInvalid(email === "" || email === null);
            setIsRoleInvalid(selectedRole.length === 0);
        }
    }

    return (
        <>
            <View style={styles.pageContainer}>
                <Header toggleMenu={props.navigation.toggleDrawer} />
            </View>
            <View style={styles.accountBody}>
                <View style={styles.accountWrapper}>
                    <ChangePassword />
                    <AccountChildUser childAccounts={childAccounts}/>
                </View>
            </View>
            
            <FAB style={styles.fab} onPress={() => console.log('Touch me!')} label='Add User'  icon={(props) => <Icon {...props} name='person-add' />}/>
        </>
    );
}