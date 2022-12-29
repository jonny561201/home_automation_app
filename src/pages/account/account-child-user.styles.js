import {StyleSheet} from 'react-native';


export default StyleSheet.create({
    tableContainer: {
        // display: flex;
        flexDirection: 'column',
        // margin: 1rem 0 0 1rem;
    },

    tableEndItem: {
        flexDirection: 'row-reverse',
    },

    table: {
        // display: flex;
        justifyContent: 'space-between',
    },

    td: {
        maxWidth: 250,
    },

    tr: {
        marginTop: 0.5,
        alignItems: 'center',
    },

    tableHeader: {
        marginTop: 0.5,
    },

    input: {
        borderColor: 'lightgray',
    },

    inputError: {
        borderColor: '#e60000',
    }
})