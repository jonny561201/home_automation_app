import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    basementPanel: {
        elevation: 5,
        borderRadius: 8,

        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        // box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 2px rgba(0,0,0,0.12) !important;
    },

    sumpGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 15,
        paddingLeft: 15,
    },
    
    titleGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    basementHeader: {
        marginLeft: 16,
    },

    statusTextBold: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 0.5,
        marginRight: 0.5,
    },

    smallText: {
        marginLeft: 10,
        fontSize: 12,
        alignItems: 'center',
    },


    iconImage: {
        height: 82,
        width: 82,
        resizeMode: 'contain',
    },

    sumpIcon: {
        /* height: 75px, */
        width: 175,
    },

    smallTextGroup: {
        marginLeft: 24,
        width: 120,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    sumpTextGroup: {
        display: 'flex',
        justifyContent: 'center',
    },

    sumpMeasureGroup: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
    },

    sumpText: {
        // margin: 0.75rem 0rem 0rem 0.5rem,
        marginTop: 0.75,
        marginLeft: 0.5,
        alignItems: 'center',
    },

    alert: {
        color: 'red',
        fontWeight: '300',
    },

    healthy: {
        color: 'green',
        fontWeight: '300',
    },
});