import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        paddingTop: 16,
        // marginTop: 8,
      },

      dropdown: {
        height: 50,
        // borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
      },

      icon: {
        marginRight: 5,
      },

      label: {
        position: 'absolute',
        left: 8,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },

      selectedTextStyle: {
        fontSize: 16,
      },

      iconStyle: {
        width: 20,
        height: 20,
      },

      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
});