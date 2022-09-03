import {StyleSheet} from 'react-native';

export default StyleSheet.create({

    loginHeader: {
        padding: 40,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: '#00c774',
        flexDirection: 'column',
        alignItems: 'center',
    },

    loginHeaderText: {
        color: 'white',
        fontSize: 30,
        fontWeight: "bold",
    },

    loginBody: {
        flexGrow: 10,
        borderRadius: 12,
        // backgroundColor: var(--primary-color),
        marginTop: 80,
    },
});