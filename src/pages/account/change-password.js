import React, { useState, useEffect, useContext } from 'react';
import { Text, View } from 'react-native';
import { GreenButton } from "../../components/controls/buttons";
import { TextInput } from "react-native-paper";
import { updateUserAccount } from '../../utilities/rest-api';
import { Context } from "../../state/store";
import styles from './change-password.styles'


export default function ChangePassword() {
    const [state, _] = useContext(Context);

    const [arePasswordsMismatched, setPasswordsMismatched] = useState(null);
    const [changed, setChanged] = useState(false);
    const [oldPasswordError, setPasswordError] = useState(null);
    const [oldPassword, setOldPassword] = useState("");
    const [firstNewPassword, setFirstPassword] = useState("");
    const [secondNewPassword, setSecondPassword] = useState("");
    const [succeeded, setSucceeded] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (firstNewPassword !== "" && secondNewPassword !== "") {
            setPasswordsMismatched(secondNewPassword !== firstNewPassword);
        }

        if (changed && oldPassword === "") {
            setPasswordError(true);
        } else if (changed && oldPassword !== "") {
            setPasswordError(false)
        } else if (submitted && oldPassword === "") {
            setPasswordError(true);
        }
    }, [firstNewPassword, secondNewPassword, changed, oldPassword, submitted]);

    const passwordMessage = () => {
        if (succeeded) {
            return <View style={styles.accountMessage}>
                {/*<CheckCircle style={styles.successText}/>*/}
                <Text style={styles.successText}>Updated Successfully</Text>
            </View>
        } else if (succeeded === false) {
            return <View style={styles.accountMessage}>
                {/*<Error style={styles.failureText}/>*/}
                <Text style={styles.failureText}>Password Update Failed</Text>
            </View>
        } else {
            return <View />
        }
    }

    const onOldPasswordChange = async (input) => {
        setOldPassword(input);
        setChanged(true);
    }
    
    const submitAccountChange = async () => {
        setSubmitted(true);
        if (!oldPasswordError && !arePasswordsMismatched && changed) {
            const response = await updateUserAccount(state.user.userId, state.auth.bearer, oldPassword, secondNewPassword);
            setSucceeded(response.ok);
        }
    }

    return (
        <>
            <Text style={styles.passwordHeader}>Change Password</Text>
            <View style={[styles.passwordGroup, styles.passwordText]}>
                <TextInput style={styles.textInput} value={oldPassword} error={oldPasswordError} onChangeText={(input) => onOldPasswordChange(input)} mode='outlined' activeOutlineColor='#00c774' label="Old Password" secureTextEntry={true} />
                <TextInput style={styles.textInput} value={firstNewPassword} error={arePasswordsMismatched} onChangeText={(input) => setFirstPassword(input)} mode='outlined' activeOutlineColor='#00c774' label="New Password" secureTextEntry={true} />
                <TextInput style={styles.textInput} value={secondNewPassword} error={arePasswordsMismatched} onChangeText={(input) => setSecondPassword(input)} mode='outlined' activeOutlineColor='#00c774' label="Confirm New Password" secureTextEntry={true} />
                {
                    passwordMessage()
                }
            </View>
            <GreenButton style={styles.saveButton} onPress={submitAccountChange}>Save</GreenButton>
        </>
    )
}