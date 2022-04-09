import React from 'react';
import { Image, View } from 'react-native';
import Logo from '../resources/CompanyLogo.png'
import styles from './LogoHeader.style';


export default function LogoHeader() {
    return (
        <View>
            <View style={styles.whiteHeader}>
                <View style={styles.logoBackground}>
                    <Image style={styles.logoImage} source={Logo} />
                </View>
            </View>
        </View>
    );
}