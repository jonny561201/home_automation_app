import React, { useContext, useState } from 'react';
import { deleteUserChildAccount } from '../../utilities/rest-api';
import { Context } from '../../state/store';
import { Text, View, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Portal, Dialog, useTheme } from 'react-native-paper';
import CreateChildAccount from './create-child-account';
import styles from './account-child-user.styles';


export default function AccountChildUser(props) {
    const [state, _] = useContext(Context);
    const [display, setDisplay] = useState(false);
    const [roles, setRoles] = useState([]);
    const theme = useTheme();

    const deleteChildUser = async (childUser) => {
        const response = await deleteUserChildAccount(state.user.userId, state.auth.bearer, childUser.user_id);
        if (response.ok)
            props.updateChild(props.childAccounts.filter(x => x.user_id !== childUser.user_id));
    }

    const getStyle = (data, index) => {
        const rowStyles = [];
        const lastChild = props.childAccounts?.length - 1 === data.index;
        const lastRow = index === data.item.roles?.length - 1;

        if (lastRow)
            rowStyles.push(styles.last)
        if (lastRow && lastChild)
            rowStyles.push(styles.lastChild)

        return rowStyles;
    }

    const closeDialog = () => setDisplay(false);

    const setChildAccounts = () => { console.log('tried setting child account') }

    const edit = (child) => {
        setDisplay(true);
        setRoles(child?.item?.roles);
    }

    return (
        <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={[styles.accountHeader, {color: theme.colors.font}]}>Account Users</Text>
            <SwipeListView
                data={props.childAccounts}
                rightOpenValue={-150}
                disableRightSwipe
                previewRowKey={'0'}
                style={{marginBottom: 20}}
                renderItem={(data) => (
                    <>
                        <List.Accordion
                            key={`user-${data.item.user_name}`}
                            theme={{ colors: { primary: '#00c774' } }}
                            title={data.item.user_name}
                            left={(props) => <Icon {...props} name="person" size={30} />}>
                            {
                                data.item.roles.map((x, i) => {
                                    if (x === 'lighting')
                                        return <List.Item style={getStyle(data, i)} key={`role-${x}}`} title={x} left={(props) => <List.Icon {...props} icon='lightbulb-on-outline' />} />
                                    else if (x === 'garage_door')
                                        return <List.Item style={getStyle(data, i)} key={`role-${x}}`} title={x} left={(props) => <List.Icon {...props} icon='garage-variant' />} />
                                    else if (x === 'thermostat')
                                        return <List.Item style={getStyle(data, i)} key={`role-${x}}`} title={x} left={(props) => <List.Icon {...props} icon='thermostat' />} />
                                    else if (x === 'security')
                                        return <List.Item style={getStyle(data, i)} key={`role-${x}}`} title={x} left={(props) => <List.Icon {...props} icon='security' />} />
                                    else if (x === 'sump_pump')
                                        return <List.Item style={getStyle(data, i)} key={`role-${x}}`} title={x} left={(props) => <List.Icon {...props} icon='water-pump' />} />
                                })
                            }
                        </List.Accordion>
                    </>
                )}
                renderHiddenItem={(data) => (
                    <View style={styles.swipeContainer}>
                        <TouchableOpacity style={styles.swipeEdit} onPress={() => edit(data)}>
                            <Icon name='edit' size={30} style={styles.swipeText} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.swipeDelete} onPress={() => deleteChildUser(data.item)}>
                            <Icon name='delete' size={30} style={styles.swipeText} />
                        </TouchableOpacity>
                    </View>
                )}
            />

            <Portal>
                <Dialog visible={display} onDismiss={closeDialog}>
                    <CreateChildAccount close={closeDialog} addChild={setChildAccounts} roles={roles} />
                </Dialog>
            </Portal>
        </View>
    );
}