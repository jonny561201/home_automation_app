import React, { useState, useContext, useEffect } from 'react';
// import { getStore } from '../../state/GlobalState';
import { addUserChildAccount, getUserChildAccounts, deleteUserChildAccount } from '../../utilities/rest-api';
import { Context } from '../../state/Store';
import { View, Text } from 'react-native';
import { Divider, MenuItem, Select, InputLabel, Input, FormControl, Checkbox, TextField, ListItemText } from '@material-ui/core';
import { AddButton, RemoveButton } from '../../components/controls/Buttons';
import styles from './account-child-user.styles';


export default function AccountChildUser() {
    const [state, _] = useContext(Context);
    // const [roles,] = useState(getStore().getUserRoles());
    const [selectedRole, setSelectedRole] = useState([]);
    const [email, setEmail] = useState("");
    const [test, setTest] = useState([]);
    const [isEmailInvalid, setIsEmailInvalid] = useState(undefined);
    const [isRoleInvalid, setIsRoleInvalid] = useState(undefined);

    useEffect(() => {
        const getData = async () => {
            const response = await getUserChildAccounts(state.user.userId, state.auth.bearer);
            setTest(response);
        };
        getData();
    }, []);


    const submitChildAccount = async (event) => {
        event.preventDefault();
        if ((!isEmailInvalid && !isRoleInvalid) && (selectedRole.length !== 0 && email !== null && email !== "")) {
            const response = await addUserChildAccount(state.user.userId, state.auth.bearer, email, selectedRole);
            setTest(response);
            setEmail("");
            setSelectedRole([]);
        } else {
            setIsEmailInvalid(email === "" || email === null);
            setIsRoleInvalid(selectedRole.length === 0);
        }
    }

    const deleteChildUser = async (childUserId) => {
        const response = await deleteUserChildAccount(state.user.userId, state.auth.bearer, childUserId);
        if (response.ok)
            setTest(test.filter(x => x.user_id !== childUserId));
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
            <form onSubmit={submitChildAccount}>
                <Text>Account Users</Text>
                <Divider />
                <table style={styles.tableContainer}>
                    <tbody>
                        {test.map(x => (
                            <tr key={`user-${x.user_name}`}>
                                <td>{x.user_name}</td>
                                <td>{x.roles.join(', ')}</td>
                                <td style={styles.tableEndItem}>
                                    <RemoveButton aria-label={`user-${x.user_name}`} onClick={() => deleteChildUser(x.user_id)}/>
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
                                <AddButton onClick={(event) => { submitChildAccount(event) }}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
    );
}