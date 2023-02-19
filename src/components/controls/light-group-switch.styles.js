import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    lightGroup: {
        alignItems: 'center',
        flexDirection: 'row',
    },

    lightGroupExpansion: {
        borderColor: 'darkgray',
        borderRadius: 1,
    },

    lightSpacerOne: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 24,
        paddingRight: 24,
    },

    lightSpacerTwo: {
        padding: 16,
    },

    brightnessIcon: {
        fontSize: 16,
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 8,
        paddingLeft: 8,
    },

    lightButton: {
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 4,
        marginRight: 10,
    },

    lightText: {
        padding: 6,
        width: 70,
        fontSize: 14,
    },
});