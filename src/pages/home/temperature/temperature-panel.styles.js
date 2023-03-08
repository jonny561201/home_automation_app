import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    temperaturePanel: {
        elevation: 5,
        borderRadius: 8,

        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },

    titleGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    temperatureHeader: {
        marginLeft: 16,
    },

    temperatureGroup: {
        flexDirection: 'row',
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 15,
        paddingLeft: 15,
    },

    tempToggleGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    tempImages: {
        marginLeft: -94,
    },

    statusTextBold: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 18,
    },

    iconImage: {
        height: 82,
        width: 82,
        resizeMode: 'contain',
    },

    smallTextGroup: {
        marginLeft: 40,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    smallText: {
        marginLeft: 10,
        fontSize: 12,
        alignItems: 'center',
    },
});