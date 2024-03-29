import React, { useContext, useState } from 'react';
import { addUserChildAccount } from '../../utilities/rest-api';
import { Dialog, TextInput, Checkbox, Divider, useTheme } from 'react-native-paper';
import { GreenButton, RedButton } from '../../components/controls/buttons';
import { Context } from "../../state/store";
import styles from './create-child-account.styles';


export default function CreateChildAccount(props) {
    const theme = useTheme();
    const [state, _] = useContext(Context);
    const [roles, setRoles] = useState(props.roles?.length === 0 ? state.user.roles.map(x => ({ ...x, checked: false })) : state.user.roles.map(x => props.roles?.includes(x.role_name) ? ({ ...x, checked: true }) : ({ ...x, checked: false })));
    const [email, setEmail] = useState('');
    const [isEmailInvalid, setIsEmailInvalid] = useState(undefined);

    const submitChildAccount = async () => {
        if ((!isEmailInvalid) && (roles !== 0 && email !== null && email !== "")) {
            const selectedRoles = roles.filter(x => x.checked).map(y => y.role_name);
            const response = await addUserChildAccount(state.user.userId, state.auth.bearer, email, selectedRoles);
            props.addChild(response);
            props.close();
        } else {
            setIsEmailInvalid(email === "" || email === null);
        }
    }

    const validateEmail = (value) => {
        setEmail(value);
        setIsEmailInvalid(value === "");
    }

    const updateRole = (role) => {
        setRoles(roles.map(x => (x.role_name === role.role_name) ? { ...role, checked: !role.checked } : x));
    }

    return (
        <>
            <Dialog.Title style={{ color: theme.colors.primaryFont }}>{props.roles?.length === 0 ? 'Add User' : 'Edit User'}</Dialog.Title>
            <Divider style={[styles.dividerHeader, { backgroundColor: theme.colors.secondaryFont }]} />
            <Dialog.Content>
                <TextInput
                    value={email}
                    error={isEmailInvalid}
                    onChangeText={(input) => validateEmail(input)}
                    mode='outlined'
                    textColor={theme.colors.secondaryFont}
                    activeOutlineColor={theme.colors.primary}
                    label="Email" />
                {
                    roles.map(x => <Checkbox.Item key={x.role_name} label={x.role_name} status={x.checked ? 'checked' : 'unchecked'} onPress={() => updateRole(x)} labelStyle={{ color: theme.colors.secondaryFont }} />)
                }
            </Dialog.Content>

            <Dialog.Actions style={styles.dialogButtonContainer}>
                <RedButton onPress={props.close}>Cancel</RedButton>
                <GreenButton onPress={submitChildAccount}>Add</GreenButton>
            </Dialog.Actions>
        </>
    )
}