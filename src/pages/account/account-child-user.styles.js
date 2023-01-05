import {StyleSheet} from 'react-native';


export default StyleSheet.create({
    accountHeader: {
        fontSize: 26,
        color: 'black',
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
    },

    tableEndItem: {
        flexDirection: 'row-reverse',
    },

    tableHeader: {
        marginTop: 0.5,
    },

    input: {
        borderColor: 'lightgray',
    },

    inputError: {
        borderColor: '#e60000',
    },

    swipeContainer: {
        alignItems: 'center', 
        backgroundColor: '#dddddd', 
        justifyContent: 'space-between',
        paddingLeft: 15, 
        flexDirection: 'row', 
        flex: 1
    },

    swipeDelete: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        flex: 1,
        position: 'absolute',
        top: 0,
        width: 75,
        right: 0,
        backgroundColor: 'red'
    },
})