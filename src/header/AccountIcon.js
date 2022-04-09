import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Context } from '../state/Store';
import styles from './AccountIcon.styles.js';


export default function Account(props) {
    const [state,] = useContext(Context);
    const firstInitial = state.user.firstName.trim().charAt(0);
    const lastInitial = state.user.lastName.trim().charAt(0);

    return (
        <TouchableOpacity style={styles.accountContainer} onPress={props.toggleMenu}>
            <View style={styles.accountBorder}>
                <View style={styles.accountCenter}>
                    <Text style={styles.accountText}>{firstInitial + lastInitial}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}