import React, { useContext, useState } from 'react';
import { addUserChildAccount } from '../../utilities/rest-api';
import { Dialog, TextInput, Checkbox } from 'react-native-paper';
import { GreenButton, RedButton } from '../../components/controls/buttons';
import { Context } from "../../state/store";


export default function CreateChildAccount(props) {
    const [state, _] = useContext(Context);
    const [roles, setRoles] = useState(state.user.roles.map(x => ({...x, checked: false})));
    const [email, setEmail] = useState('');
    const [isEmailInvalid, setIsEmailInvalid] = useState(undefined);

    const submitChildAccount = async () => {
        if ((!isEmailInvalid) && (roles !== 0 && email !== null && email !== "")) {
            const selectedRoles = roles.filter(x => x.checked).map(y => y.role_name);
            const response = await addUserChildAccount(state.user.userId, state.auth.bearer, email, selectedRoles);
            props.addChild(response);
            setEmail("");
        } else {
            setIsEmailInvalid(email === "" || email === null);
        }
    }

    const validateEmail = (value) => {
        setEmail(value);
        setIsEmailInvalid(value === "");
    }

    const updateRole = (role) => {
        setRoles(roles.map(x => (x.role_name === role.role_name) ? {...role, checked: !role.checked} : x));
    }

    return (
        <>
            <Dialog.Title>Add User</Dialog.Title>
            <Dialog.Content>
                <TextInput value={email} error={isEmailInvalid} onChangeText={(input) => validateEmail(input)} mode='outlined' activeOutlineColor='#00c774' label="Email" />
                {
                    roles.map(x =>  <Checkbox.Item key={x.role_name} label={x.role_name} status={x.checked ? 'checked' : 'unchecked'} onPress={() => updateRole(x)}/> )
                }
            </Dialog.Content>

            <Dialog.Actions>
                <RedButton onPress={props.close}>Cancel</RedButton>
                <GreenButton onPress={submitChildAccount}>Add</GreenButton>
            </Dialog.Actions>
        </>
    )
}