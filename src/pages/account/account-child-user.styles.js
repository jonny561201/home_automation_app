import {StyleSheet} from 'react-native';


export default StyleSheet.create({
    accountHeader: {
        fontSize: 26,
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

    last: {
        paddingBottom: 20,
    },

    lastChild: {
        marginBottom: 80,
    },

    swipeContainer: {
        alignItems: 'center', 
        backgroundColor: '#dddddd', 
        justifyContent: 'space-between',
        paddingLeft: 15, 
        flexDirection: 'row', 
        flex: 1
    },

    swipeEdit: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        flex: 1,
        position: 'absolute',
        top: 0,
        width: 75,
        right: 75,
        backgroundColor: 'blue'
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
    
    swipeText: {
        color: '#ffffff', 
    },
})