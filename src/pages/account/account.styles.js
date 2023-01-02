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
        // margin: 5,
    },

    accountDivider: {
        marginTop: 5,
    },

    accountText: {
        paddingRight: 5,
    },

    accountRow: {
        flexDirection: 'row',
        marginLeft: 1,
        marginTop: 5,
    },

    textInput: {
        width: 300,
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

    failureText: {
        color: '#a8120a',
        marginLeft: 5,
        marginRight: 5,
    },

    cancel: {
        backgroundColor: '#c73200',
    },

    emailAccountUser: {
        marginRight: 20,
    },
});