import {StyleSheet} from 'react-native';


export default StyleSheet.create({
    tableContainer: {
        flexDirection: 'column',
        // margin: 1rem 0 0 1rem;
    },

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

    fab: {
        position: 'relative',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#00c774',
        borderRadius: 30,
    },
})