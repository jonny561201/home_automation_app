import { StyleSheet } from 'react-native';


export default StyleSheet.create({

    container: {
        marginRight: 4,
        marginLeft: 4,
        marginBottom: 2,
        marginTop: 2,
        shadowColor: 'black',
        elevation: 5,
        borderRadius: 8,

        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },

    row: {
        minHeight: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 25,
        paddingRight: 18,
        alignItems: 'center',
        marginTop: 14,
        marginBottom: 14,
    },

    expansion: {
        alignItems: 'center',
    },

    divider: {
        width: '96%'
    },
    
    child: {
        marginTop: 6,
        marginBottom: 8,
        padding: 10,
    }
});