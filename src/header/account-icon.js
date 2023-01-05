import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { Context } from '../state/store';
import styles from './account-icon.styles.js';


export default function Account(props) {
    const [state,] = useContext(Context);
    const firstInitial = state.user.firstName.trim().charAt(0);
    const lastInitial = state.user.lastName.trim().charAt(0);

    return (
        <View style={styles.accountContainer}>
            <TouchableRipple style={styles.accountBorder} rippleColor='#95b9fc' onPress={props.toggleMenu} borderless={true}>
                <View style={styles.accountCenter}>
                    <Text style={styles.accountText}>{firstInitial + lastInitial}</Text>
                </View>
            </TouchableRipple>
        </View>
    );
}