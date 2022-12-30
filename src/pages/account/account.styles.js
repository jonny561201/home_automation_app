import {StyleSheet} from 'react-native';


export default StyleSheet.create({
    accountBody: {
        // background-color: var(--primary-color),
        flexDirection: 'column',
    },

    accountHeader: {
        fontSize: 24,
    },

    accountWrapper: {
        margin: 1,
    },

    accountGroup: {
        margin: 5,
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