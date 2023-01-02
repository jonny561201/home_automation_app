import {StyleSheet} from 'react-native';


export default StyleSheet.create({
    pageContainer: {
        paddingBottom: 30,
    },

    accountBody: {
        // background-color: var(--primary-color),
        flexDirection: 'column',
        marginLeft: 10,
    },

    accountHeader: {
        fontSize: 26,
        color: 'black',
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
    },

    accountWrapper: {
        margin: 1,
        flexDirection: 'column',
    },

    accountGroup: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },

    accountText: {
        paddingRight: 5,
    }, 

    textInput: {
        width: 325,
        marginTop: 8,
    },

    accountMessage: {
        marginLeft: 2,
        alignItems: 'center',
    },

    successText: {
        color: '#055219',
        marginLeft: 5,
        marginRight: 5,
    },

    saveButton: {
        marginTop: 16,
    },

    failureText: {
        color: '#a8120a',
        marginLeft: 5,
        marginRight: 5,
    },

    // cancel: {
    //     backgroundColor: '#c73200',
    // },

    // emailAccountUser: {
    //     marginRight: 20,
    // },
});