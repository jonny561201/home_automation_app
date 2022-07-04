import { StyleSheet } from 'react-native';


export default StyleSheet.create({

    buttonContainer: {
        margin: 8,
    },

    green: {
        backgroundColor: '#00c774',
    },

    blue: {
        backgroundColor: '#1a75ff',
    },

    red: {
        backgroundColor: '#ff3333',
    },

    myButton: {
        textAlign: 'center',
        width: 80,
        height: 40,
        paddingBottom: 6,
        paddingTop: 8,
        borderRadius: 10,
        fontSize: 16,
        borderColor: '#5c5c5c',
        borderWidth: 2,
        color: 'white'
    },

    toggleButton: {
        width: 50,
        height: 40,
        textAlign: 'center',
        paddingBottom: 9.4,
        paddingTop: 10,
        borderRadius: 10,
        fontSize: 16,
        borderColor: '#5c5c5c',
        borderWidth: 2,
        color: 'white'
    },

    switchContainer: {
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },

    switchText: {
        fontSize: 16,
    },

    expandButton: {
        height: 30,
        width: 30,
        margin: 2,
        borderRadius: 20,
    },

    expandChevron: {
        fontSize: 30,
    },
});