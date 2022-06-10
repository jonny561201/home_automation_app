import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    garagePanel: {
        elevation: 5,
        borderRadius: 8,

        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    garageHeader: {
        marginLeft: 16,
    },

    statusTextBold: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 0.5,
        marginRight: 0.5,
    },

    statusText: {
        fontSize: 12,
        marginRight: 10,
    },

    titleGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    doorGroups: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 15,
        paddingLeft: 15,
    },

    registerGroup: {
        paddingBottom: 12,
    },

    registerBody: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    registerDoor: {
        paddingBottom: 8,
        paddingRight: 15,
        paddingLeft: 15,
    },

    registerText: {
        textAlign: 'center'
    },

    smallText: {
        marginLeft: 10,
        fontSize: 12,
        alignItems: 'center',
    },

    smallTextGroup: {
        marginLeft: 24,
        width: 120,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    iconImage: {
        height: 82,
        width: 82,
        resizeMode: 'contain',
    },

    openText: {
        color: 'red',
        fontWeight: 'bold',
    },
});