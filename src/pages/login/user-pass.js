import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import jwt_decode from 'jwt-decode';
import { Context } from '../../state/store';
import { getBearerToken } from '../../utilities/rest-api';
import { TextInput, ActivityIndicator, useTheme } from "react-native-paper";
import { GreenButton } from '../../components/controls/buttons';
import styles from './user-pass.styles';


export default function UserPass() {
    const theme = useTheme();
    const [state, dispatch] = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUsernameInvalid, setIsUsernameInvalid] = useState(undefined);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(undefined);
    const [isValidLogin, setIsValidLogin] = useState(true);

    const validateCredentials = async () => {
        setLoading(true);
        const userInvalid = username === '';
        const passInvalid = password === '';
        setIsUsernameInvalid(userInvalid);
        setIsPasswordInvalid(passInvalid)
        if (!userInvalid && !passInvalid)
            await getBearerTokenFromLogin(userInvalid, passInvalid);
    };

    const getBearerTokenFromLogin = async (userInvalid, passInvalid) => {
        // if (!userInvalid && !passInvalid) {
            const response = await getBearerToken(username, password);
            setIsValidLogin(response);
        if (response) {
            const decodedToken = jwt_decode(response.bearerToken);
            await dispatch({ type: 'SET_USER_DATA', payload: { userId: decodedToken.user.user_id, firstName: decodedToken.user.first_name, lastName: decodedToken.user.last_name, roles: decodedToken.user.roles } });
            // const garageRole = decodedToken.user.roles.find(x => x.role_name === 'garage_door');
            // await dispatch({ type: 'SET_GARAGE_ROLE', payload: garageRole });
            // await dispatch({ type: 'SET_DEVICES_TO_REGISTER', payload: unregisteredDevices(decodedToken.user.roles) });
            // await dispatch({ type: 'SET_STARTED_GARAGE_REGISTRATION', payload: garageRole && garageRole.device_id ? true : false });
            // await dispatch({ type: 'SET_DEVICE_ID', payload: garageRole && garageRole.device_id ? garageRole.device_id : null });
            await dispatch({ type: 'SET_AUTH_DATA', payload: { bearer: response.bearerToken, refresh: decodedToken.refresh_token, isAuthenticated: true, exp: decodedToken.exp } });
            }
        // }
        setLoading(false);
    };

    const unregisteredDevices = (roles) => {
        const garageRole = roles.find(x => x.role_name === 'garage_door');
        if (garageRole) {
            if (!garageRole.devices || garageRole.devices.length === 0) {
                return true;
            }
        }
        return false;
    };

    return (
        <View>
            <View style={styles.userPassBody}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.userPassInput}
                        alue={username}
                        error={isUsernameInvalid}
                        onChangeText={(i) => setUsername(i)}
                        mode='outlined'
                        textColor={theme.colors.font}
                        activeOutlineColor={theme.colors.primary}
                        label="Username" />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.userPassInput}
                        value={password}
                        error={isPasswordInvalid}
                        onChangeText={(i) => setPassword(i)}
                        mode='outlined'
                        textColor={theme.colors.font}
                        activeOutlineColor={theme.colors.primary}
                        label="Password"
                        secureTextEntry={true} />
                </View>
                <View>
                    {!isValidLogin &&
                        <Text style={styles.errorText}>Username or Password is invalid!</Text>
                    }
                </View>
                <View style={styles.inputContainer}>
                    <GreenButton onPress={validateCredentials}>Login</GreenButton>
                </View>
                <ActivityIndicator animating={loading} color={"#00c774"} size={40}/>
            </View>
        </View>
    )
}