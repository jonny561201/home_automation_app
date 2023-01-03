import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Context } from "../../state/store";
import { View } from 'react-native';
import Header from '../../header/header';
import AccountChildUser from './account-child-user';
import ChangePassword from './change-password';
import { FAB } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dialog } from 'react-native-paper';
import styles from './account.styles';
// import { GreenButton } from '../../components/controls/buttons';
import CreateChildAccount from './create-child-account';


export default function Account(props) {
    const [state, dispatch] = useContext(Context);
    const [display, setDisplay] = useState(false);
    const [childAccounts, setChildAccounts] = useState([{ user_name: 'Jonny561201', roles: [{ role_name: 'garage_door' }, { role_name: 'thermostat' }, { role_name: 'lighting' }] }]);

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

    const closeDialog = () => setDisplay(false);

    return (
        <>
            <View style={styles.pageContainer}>
                <Header toggleMenu={props.navigation.toggleDrawer} />
            </View>
            <View style={styles.accountBody}>
                <View style={styles.accountWrapper}>
                    <ChangePassword />
                    <AccountChildUser childAccounts={childAccounts} />
                </View>
            </View>

            <Dialog visible={display} onDismiss={closeDialog}>
                <CreateChildAccount close={closeDialog} />
            </Dialog>

            <FAB style={styles.fab} onPress={() => setDisplay(!display)} label='Add User' icon={(props) => <Icon {...props} name='person-add' />} color='#ffffff' />
        </>
    );
}