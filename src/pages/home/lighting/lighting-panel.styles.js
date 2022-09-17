import { StyleSheet } from 'react-native';


export default StyleSheet.create({

    lightingPanel: {
        elevation: 5,
        borderRadius: 8,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },

    lightPanelGroup: {
        paddingTop: 8,
        paddingBottom: 8,
        // padding: 8px 0 8px 0;
    },

    iconImage: {
        height: 82,
        width: 82,
        resizeMode: 'contain',
    },

    titleGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    statusTextBold: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 16,
    },
});