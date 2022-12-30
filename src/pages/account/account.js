import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Divider } from '@react-native-material/core';
import { Context } from "../../state/store";
import { View, Text } from 'react-native';
import Header from '../../header/header';
// import { CheckCircle, Error } from '@material-ui/icons';
import { updateUserAccount } from '../../utilities/rest-api';
// import AccountChildUser from '../../pages/account/account-child-user';
import { TextInput } from "react-native-paper";
import { GreenButton } from "../../components/controls/buttons";
import { useFocusEffect } from "@react-navigation/native";
import styles from './account.styles';


export default function Account(props) {
    const [state, dispatch] = useContext(Context);
    const [arePasswordsMismatched, setPasswordsMismatched] = useState(null);
    const [changed, setChanged] = useState(false);
    const [oldPasswordError, setPasswordError] = useState(null);
    const [oldPassword, setOldPassword] = useState("");
    const [firstNewPassword, setFirstPassword] = useState("");
    const [secondNewPassword, setSecondPassword] = useState("");
    const [succeeded, setSucceeded] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    useFocusEffect(
        useCallback(() => {
            dispatch({type: 'SET_ACTIVE_PAGE', payload: 'Account'});
        }, [dispatch])
    );

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
            return <View/>
        }
    }

    return (
        <>
             <View>
                 <Header toggleMenu={props.navigation.toggleDrawer}/>
             </View>
             <View style={styles.accountBody}>
                 <View style={[styles.accountWrapper, styles.accountText]}>
                     <View style={[styles.accountGroup, styles.accountText]}>
                         <Text style={styles.accountHeader}>Change Password</Text>
                         <Divider />
                         <View style={styles.accountRow}>
                             <TextInput style={styles.textInput} value={oldPassword} error={oldPasswordError} onChangeText={(input) => onOldPasswordChange(input)} mode='outlined' activeOutlineColor='#00c774' label="Old Password" secureTextEntry={true}/>
                         </View>
                         <View style={styles.accountRow}>
                             <TextInput style={styles.textInput} value={firstNewPassword} error={arePasswordsMismatched} onChangeText={(input) => setFirstPassword(input)} mode='outlined' activeOutlineColor='#00c774' label="New Password" secureTextEntry={true}/>
                         </View>
                         <View style={styles.accountRow}>
                             <TextInput style={styles.textInput} value={secondNewPassword} error={arePasswordsMismatched} onChangeText={(input) => setSecondPassword(input)} mode='outlined' activeOutlineColor='#00c774' label="Confirm New Password" secureTextEntry={true}/>
                         </View>
                         { passwordMessage() }
                         <GreenButton onPress={submitAccountChange}>Submit</GreenButton>
                     </View>
        {/*<AccountChildUser />*/}
                 </View>
             </View>
        </>
    );
}