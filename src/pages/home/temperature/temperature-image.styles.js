import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    tempContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        margin: 0,
    },

    tempExternalContainer: {
        flexDirection: 'row',
    },

    tempHomeContainer: {
        flexDirection: 'row',
    },

    internalTemp: {
        fontSize: 38,
        marginTop: 90,
        marginLeft: -124,
        fontWeight: '800',
    },

    externalTemp: {
        alignItems: 'center',
        flexDirection: 'column',

        marginLeft: -20,
        paddingTop: 30,
    },

    external: {
        fontWeight: '600',
        fontSize: 30,
    },

    weatherIcon: {
        height: 180,
        width: 180,
        resizeMode: 'contain',
    },

    homeIcon: {
        paddingTop: 60,
        height: 200,
        width: 200,
        resizeMode: 'contain',
    },
});