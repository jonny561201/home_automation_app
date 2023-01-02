import React, { useContext } from 'react';
// import { deleteUserChildAccount } from '../../utilities/rest-api';
import { Context } from '../../state/store';
import { Text } from 'react-native';
import styles from './account-child-user.styles';
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function AccountChildUser(props) {
    const [state, _] = useContext(Context);

    // const deleteChildUser = async (childUserId) => {
    //     const response = await deleteUserChildAccount(state.user.userId, state.auth.bearer, childUserId);
    //     if (response.ok)
    //         setChildAccounts(childAccounts.filter(x => x.user_id !== childUserId));
    // }

    return (
        <>
            <Text style={styles.accountHeader}>Account Users</Text>
            <List.Section>
                {
                    props.childAccounts.map(x => (
                        <List.Accordion
                            key={`user-${x.user_name}`}
                            theme={{ colors: { primary: '#00c774' } }}
                            title={x.user_name}
                            left={(props) => <Icon {...props} name="person" size={30} />}>
                            {
                                x.roles.map(x => {
                                    if (x.role_name === 'lights')
                                        return <List.Item key={`role-${x.role_name}}`} title={x.role_name} left={(props) => <List.Icon {...props} icon='lightbulb-on-outline' />} />
                                    else if (x.role_name === 'garage')
                                        return <List.Item key={`role-${x.role_name}}`} title={x.role_name} left={(props) => <List.Icon {...props} icon='garage-variant' />} />
                                    else if (x.role_name === 'thermostat')
                                        return <List.Item key={`role-${x.role_name}}`} title={x.role_name} left={(props) => <List.Icon {...props} icon='thermostat' />} />
                                })
                            }
                        </List.Accordion>
                    ))
                }

            </List.Section>
        </>
    );
}