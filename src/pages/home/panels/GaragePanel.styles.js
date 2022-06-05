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
        marginLeft: 14,
    },

    statusTextBold: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 0.5,
        marginRight: 0.5,
    },

    statusText: {
        fontSize: 12,
        marginRight: 10,
    },

    titleGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    doorGroups: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 15,
        paddingLeft: 15,
    },

    smallText: {
        marginLeft: 10,
        fontSize: 12,
        alignItems: 'center',
    },

    smallTextGroup: {
        marginLeft: 24,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    smallTextContainer: {
        display: 'flex',
    },
    
    iconImage: {
        height: 82,
        width: 82,
        resizeMode: 'contain',
    },
});