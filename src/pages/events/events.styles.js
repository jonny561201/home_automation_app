import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    pageContainer: {
        paddingTop: 30,
    },

    eventsHeader: {
        fontSize: 26,
        // color: 'black',
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
    
    swipeContainer: {
        alignItems: 'center', 
        backgroundColor: '#dddddd', 
        justifyContent: 'space-between',
        paddingLeft: 15, 
        flexDirection: 'row', 
        flex: 1,
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
});