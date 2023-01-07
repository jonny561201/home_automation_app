import {StyleSheet} from 'react-native';

export default StyleSheet.create({

    settingsHeader: {
        fontSize: 26,
        color: 'black',
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
    },
    
    settingsLabelText: {
        paddingTop: 6,
        fontSize: 16,
    },

    settingsRow: {
        flexDirection: 'row',
        marginLeft: 20,
        justifyContent: 'space-between',
    },

    buttonRow: {
        marginBottom: 20,
        marginRight: 30,
    },

    pickerContainer: {
        borderRadius: 4,
        borderColor: 'grey',
        borderWidth: 1,
        width: '85%',
    },

    picker: {
        width: '100%'
    },
});