import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    pageContainer: {
        paddingTop: 30,
    },

    eventsHeader: {
        fontSize: 26,
        color: 'black',
        fontWeight: 'bold',
    },

    eventsBody: {
        color: 'black',
        flexDirection: 'column',
        marginLeft: 10,
    },
    
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#00c774',
    },
});