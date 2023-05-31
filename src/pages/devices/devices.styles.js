import {StyleSheet} from 'react-native';


export default StyleSheet.create({
    pageContainer: {
        flex: 1,
        paddingTop: 30,
    },

    devicesBody: {
        flexDirection: 'column',
        marginLeft: 10,
    },

    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
    },

    swipeContainer: {
        alignItems: 'center',
        // backgroundColor: '#dddddd',
        justifyContent: 'space-between',
        paddingLeft: 15,
        flexDirection: 'row',
        flex: 1,
    },

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#00c774',
    },

    swipeEdit: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        flex: 1,
        position: 'absolute',
        top: 0,
        width: 75,
        right: 0,
        backgroundColor: 'blue'
    },

    swipeText: {
        color: '#ffffff',
    },
});