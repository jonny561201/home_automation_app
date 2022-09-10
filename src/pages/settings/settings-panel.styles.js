import {StyleSheet} from 'react-native';

export default StyleSheet.create({

    settingsBody: {
        // background-color: var(--primary-color),
        color: 'black',
        flexDirection: 'column',
        // borderRadius: 0 0 20px 20px,
    },

// @media (min-width: 480px) {
//     .settings-body {
//         min-width: 670px,
//     }
// },

    settingsWrapper: {
        margin: 1,
        display: 'flex',
        flexDirection: 'column',
    },

    settingsHeader: {
        fontSize: 26,
        color: 'black',
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
    },

    measureUnit: {
        fontSize: 16,
    },

    tempUnit: {
        fontSize: 16,
    },

    tempCity: {
        fontSize: 16,
    },

    setting: {
        paddingRight: 1,
    },

    settingsRow: {
        paddingTop: 12,
        paddingBottom: 12,
        flexDirection: 'row',
        marginLeft: 20,
    },

    cancel: {
        backgroundColor: '#c73200',
    },
});