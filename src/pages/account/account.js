import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Context } from "../../state/store";
import { ScrollView, View } from 'react-native';
import Header from '../../header/header';
import AccountChildUser from './account-child-user';
import ChangePassword from './change-password';
import { FAB, Portal, Provider } from 'react-native-paper';
import { useFocusEffect } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUserChildAccounts } from '../../utilities/rest-api';
import { Dialog } from 'react-native-paper';
import styles from './account.styles';
import CreateChildAccount from './create-child-account';


export default function Account(props) {
    const [state, dispatch] = useContext(Context);
    const [display, setDisplay] = useState(false);
    const [childAccounts, setChildAccounts] = useState([]);

    useFocusEffect(
        useCallback(() => {
            dispatch({ type: 'SET_ACTIVE_PAGE', payload: 'Account' });
        }, [dispatch])
    );

    useEffect(() => {
        const getData = async () => {
            const response = await getUserChildAccounts(state.user.userId, state.auth.bearer);
            setChildAccounts(response.map((x, i) => ({...x, key: `${i}`})));
        };
        getData();
    }, []);

    const closeDialog = () => setDisplay(false);

    return (
        <Provider>
            <View>
                <Header toggleMenu={props.navigation.toggleDrawer} />
            </View>
                <ScrollView style={styles.pageContainer}>
                    <View style={styles.accountBody}>
                        <View style={styles.accountWrapper}>
                            <ChangePassword />
                            <AccountChildUser childAccounts={childAccounts} updateChild={setChildAccounts} />
                        </View>
                    </View>

                        <Portal>
                            <Dialog visible={display} onDismiss={closeDialog}>
                                <CreateChildAccount close={closeDialog} addChild={setChildAccounts} />
                            </Dialog>
                        </Portal>
                </ScrollView>

            <FAB style={styles.fab} onPress={() => setDisplay(!display)} label='Add User' icon={(props) => <Icon {...props} name='person-add' />} color='#ffffff' />
        </Provider>
    );
}