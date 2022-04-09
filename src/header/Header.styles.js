import { StyleSheet } from 'react-native';
import theme from '../../constants/Colors';


export default StyleSheet.create({
    homeHeader: {
        backgroundColor: '#00c774',
        padding: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    homeHeaderText: {
        margin: 0,
        fontSize: 20,
        marginLeft: 5,
        color: theme.dark.headerFontColor,
        // fontFamily: 'Trebuchet MS',
    },

    header: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },

    logoContainer: {
        position: 'absolute',
        left: 1,
    },
});