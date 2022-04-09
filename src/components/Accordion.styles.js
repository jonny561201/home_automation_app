import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        margin: 8,
        shadowColor: 'black',
        elevation: 5,
        borderRadius: 8,

        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    otherContainer: {
    },
    header: {
        padding: 12,
    },
    title: {
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        paddingLeft: 25,
        paddingRight: 18,
        alignItems: 'center',
    },
    parentHr: {
        height: 1,
        width: '100%'
    },
    child: {
        padding: 16,
    }
});