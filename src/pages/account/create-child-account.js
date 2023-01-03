import React, { useContext, useState } from 'react';
import { addUserChildAccount } from '../../utilities/rest-api';
import { Dialog, Paragraph, TextInput } from 'react-native-paper';
import { View, Text } from 'react-native';
import { BlueButton, GreenButton, RedButton } from '../../components/controls/buttons';
import { Context } from "../../state/store";


export default function CreateChildAccount(props) {
    const [state, dispatch] = useContext(Context);
    const [open, setOpen] = useState(false);
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [isEmailInvalid, setIsEmailInvalid] = useState(undefined);
    const [isRoleInvalid, setIsRoleInvalid] = useState(undefined);

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

    const validateEmail = (value) => {
        setEmail(value);
        setIsEmailInvalid(value === "");
    }

    const validateRole = (value) => {
        setSelectedRole(value);
        setIsRoleInvalid(value === "");
    }

    return (
        <>
            <Dialog.Title>Add User</Dialog.Title>
            <Dialog.Content>
                <TextInput value={email} error={isEmailInvalid} onChangeText={(input) => validateEmail(input)} mode='outlined' activeOutlineColor='#00c774' label="Email" />
            </Dialog.Content>

            <Dialog.Actions>
                <RedButton onPress={props.close}>Cancel</RedButton>
                <GreenButton onPress={() => console.log('Pressed')}>Add</GreenButton>
            </Dialog.Actions>


            {/* <FormControl error={isRoleInvalid}>
                <InputLabel>Roles</InputLabel>
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
            <View style={styles.tableEndItem}>
                <GreenButton onPress={submitChildAccount} />
            </View> */}
        </>
    )
}