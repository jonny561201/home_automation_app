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
});