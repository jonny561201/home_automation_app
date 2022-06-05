import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    garageDoorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    statusTextGroup: {
        alignItems: 'center',
    },

    statusText: {
        fontSize: 12,
    },

    garageBigText: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    garageTextBold: {
        fontSize: 12,
        fontWeight: 'bold',
    },

    statusButtonGroup: {
        flexDirection: 'row',
    },

    iconImage: {
        width: 15,
        height: 15,
    },

    doorStatus: {
        flexDirection: 'row',
    },

    toggleButton: {
        backgroundColor: '#1a75ff',
    },

    closeButton: {
        backgroundColor: '#ff3333',
    },

    open: {
        color: '#00c774',
    },

    close: {
        color: '#ff3333',
    },
});