import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    garageDoorContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    statusTextGroup: {
        display: 'flex',
        flexDirection: 'column',
    },

    statusText: {
        fontSize: 12,
    },

    garageBigText: {
        fontSize: 1.2,
        fontWeight: 'bold',
    },

    garageTextBold: {
        fontSize: 0.8,
        fontWeight: 'bold',
    },

    statusButtonGroup: {
        display: 'flex',
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