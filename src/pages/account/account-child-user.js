import React, { useState, useContext, useEffect } from 'react';
import { addUserChildAccount, getUserChildAccounts, deleteUserChildAccount } from '../../utilities/rest-api';
import { Context } from '../../state/store';
import { Text } from 'react-native';
// import { Divider, MenuItem, Select, InputLabel, Input, FormControl, Checkbox, TextField, ListItemText } from '@material-ui/core';
// import { AddButton, RemoveButton } from '../../components/controls/Buttons';
import styles from './account-child-user.styles';
import { List, FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function AccountChildUser(props) {
    const [state, _] = useContext(Context);
    // const roles = state.user.roles;
    const [selectedRole, setSelectedRole] = useState([]);
    // const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    // const [childAccounts, setChildAccounts] = useState([]);
    const [isEmailInvalid, setIsEmailInvalid] = useState(undefined);
    const [isRoleInvalid, setIsRoleInvalid] = useState(undefined);

    // useEffect(() => {
    //     const getData = async () => {
    //         const response = await getUserChildAccounts(state.user.userId, state.auth.bearer);
    //         setChildAccounts(response);
    //     };
    //     getData();
    // }, []);


    // const submitChildAccount = async () => {
    //     if ((!isEmailInvalid && !isRoleInvalid) && (selectedRole.length !== 0 && email !== null && email !== "")) {
    //         const response = await addUserChildAccount(state.user.userId, state.auth.bearer, email, selectedRole);
    //         setChildAccounts(response);
    //         setEmail("");
    //         setSelectedRole([]);
    //     } else {
    //         setIsEmailInvalid(email === "" || email === null);
    //         setIsRoleInvalid(selectedRole.length === 0);
    //     }
    // }

    const deleteChildUser = async (childUserId) => {
        const response = await deleteUserChildAccount(state.user.userId, state.auth.bearer, childUserId);
        if (response.ok)
            setChildAccounts(childAccounts.filter(x => x.user_id !== childUserId));
    }

    const validateEmail = (input) => {
        setEmail(input.target.value);
        setIsEmailInvalid(input.target.value === "");
    }

    const validateRole = (input) => {
        setSelectedRole(input.target.value);
        setIsRoleInvalid(input.target.value === "");
    }

    return (
        <>
            <Text style={styles.accountHeader}>Account Users</Text>
            {/* <table style={styles.tableContainer}>
                <tbody>
                    {test.map(x => (
                        <tr key={`user-${x.user_name}`}>
                            <td>{x.user_name}</td>
                            <td>{x.roles.join(', ')}</td>
                            <td style={styles.tableEndItem}>
                                <RemoveButton aria-label={`user-${x.user_name}`} onClick={() => deleteChildUser(x.user_id)} />
                            </td>
                        </tr>
                    ))}
                    
                    <tr>
                        <td>
                            <TextField error={isEmailInvalid} onChange={(input) => validateEmail(input)} value={email} label="Email" />
                        </td>
                        <td>
                            <FormControl error={isRoleInvalid}>
                                <InputLabel id="demo-mutiple-name-label">Roles</InputLabel>
                                <Select multiple value={selectedRole} onChange={(input) => validateRole(input)} input={<Input />}
                                    renderValue={(selectedRole) => (selectedRole.join(', '))}>
                                    {roles.map((role) => (
                                        <MenuItem key={role.role_name} value={role.role_name}>
                                            <Checkbox checked={selectedRole.indexOf(role.role_name) > -1} />
                                            <ListItemText primary={role.role_name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </td>
                        <td style={styles.tableEndItem}>
                            <AddButton onClick={(event) => { submitChildAccount(event) }} />
                        </td>
                    </tr>
                </tbody>
            </table> */}

            <List.Section>
                {
                    props.childAccounts.map(x => (
                        <List.Accordion
                            key={`user-${x.user_name}`}
                            theme={{ colors: { primary: '#00c774' }}}
                            title={x.user_name}
                            left={(props) => <Icon {...props} name="person" size={30} />}>
                            {
                                x.roles.map(y =>
                                    <List.Item key={`role-${y.role_name}}`} title={y.role_name} />
                                )
                            }
                        </List.Accordion>
                    ))
                }

            </List.Section>
        </>
    );
}