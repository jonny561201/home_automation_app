import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    headerContainer: {
        zIndex: 1,
    },
    
    systemIconSpacer: {
        height: 34,
        backgroundColor: '#00c774',
    },

    homeHeader: {
        paddingBottom: 10,
        backgroundColor: '#00c774',
        padding: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    homeHeaderText: {
        margin: 0,
        fontSize: 20,
        marginLeft: 5,
        color: 'white',
    },

    logoContainer: {
        position: 'absolute',
        left: 1,
        top: -33
    },
});