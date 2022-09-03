import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    column: {
        textAlign: 'center',
        marginBottom: 1
    },

    loginMenu: {
        borderRadius: 10,
        // backgroundColor: var(--primary-color),
        minHeight: 550,
        minWidth: 350,
    },

    loginHeader: {
        padding: 1,
        flexGrow: 1,
        borderRadius: 10,
        backgroundColor: '#00c774',
        flexDirection: 'column',
        alignItems: 'center',
        height: 10,
    },

    loginBody: {
        flexGrow: 10,
        borderRadius: 12,
        // backgroundColor: var(--primary-color),
        marginTop: 2,
    },
});