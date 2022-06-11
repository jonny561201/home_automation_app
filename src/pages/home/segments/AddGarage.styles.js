import { StyleSheet } from 'react-native';


export default StyleSheet.create({

    garageSuccessText: {
        color: '#055219',
        alignSelf: 'center',
    },

    borderSuccessIcon: {
        borderRadius: 40,
        backgroundColor: 'white',
        height: 1.5,
        width: 1.5,
        alignSelf: 'center',
    },

     headerText: {
         paddingTop: 12,
         paddingBottom: 12,
         alignSelf: 'center',
         fontSize: 24,
         fontWeight: 'bold',
     },

    deviceText: {
        fontSize: 14,
        marginLeft: 1,
    },

    deviceGroup: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    addDoorGroup: {
        padding: 16,
    },

    doorHeaderGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    preferredGarage: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    deviceRow: {
        flexDirection: 'row',
        marginTop: 0.5,
    },    
    
    closeIcon: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingRight: 12,
        color: 'grey',
        alignSelf: 'center',
        fontSize: 28,
    },
});