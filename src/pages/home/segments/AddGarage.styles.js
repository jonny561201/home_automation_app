import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    addGarageContainer: {
        padding: 16,
    },

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
         padding: 12,
         alignSelf: 'center',
         fontSize: 18,
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
        padding: 6,
    },

    preferredGarage: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    deviceRow: {
        flexDirection: 'row',
        marginTop: 0.5,
    },
});