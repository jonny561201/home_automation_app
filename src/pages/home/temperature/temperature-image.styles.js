import {StyleSheet} from 'react-native';


export default StyleSheet.create({

    tempExternalContainer: {
        flexDirection: 'row',
    },

    tempHomeContainer: {
        flexDirection: 'row',
    },

    internalTemp: {
        fontSize: 35,
        fontWeight: 'bolder',
    },

    externalTemp: {
        alignItems: 'center',
        flexDirection: 'column',

        marginLeft: -20,
        paddingTop: 30,
    },

// topFade: {
//     background: -webkit-linear-gradient(#27aedb, var(--primary-color)),
//     -webkit-background-clip: text,
//     -webkit-text-fill-color: transparent,
// },

    external: {
        // margin: 0,
        fontWeight: '800',
        fontSize: 30,
    },

// .bottom-fade {
//     background: -webkit-linear-gradient(var(--primary-color), #db5127),
//     -webkit-background-clip: text,
//     -webkit-text-fill-color: transparent,
// },

    weatherIcon: {
        height: 180,
        width: 180,
        resizeMode: 'contain',
    },

    minMax: {
        fontSize: 16,
        margin: 0,
    },

    homeIcon: {
        paddingTop: 60,
        height: 200,
        width:200,
        resizeMode: 'contain',
    },
});