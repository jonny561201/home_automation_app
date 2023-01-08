import React, { useContext } from 'react';
import { deleteUserChildAccount } from '../../utilities/rest-api';
import { Context } from '../../state/store';
import { Text, View, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import styles from './account-child-user.styles';


export default function AccountChildUser(props) {
    const [state, _] = useContext(Context);

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

    return (
        <>
            <Text style={styles.accountHeader}>Account Users</Text>
            <List.Section>
                <SwipeListView
                    data={props.childAccounts}
                    rightOpenValue={-150}
                    disableRightSwipe
                    previewRowKey={'0'}
                    renderItem={(data) => (
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
                    )}
                    renderHiddenItem={(data) => (
                        <View style={styles.swipeContainer}>
                            <TouchableOpacity style={styles.swipeEdit} onPress={() => {console.log('test')}}>
                                <Icon name='edit' size={30} style={styles.swipeText} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.swipeDelete} onPress={() => deleteChildUser(data.item)}>
                                <Icon name='delete' size={30} style={styles.swipeText} />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </List.Section>
        </>
    );
}