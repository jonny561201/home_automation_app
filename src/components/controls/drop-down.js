import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useTheme } from 'react-native-paper';
import styles from './drop-down.styles';


export default function DropDown(props) {
    const theme = useTheme();
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
          return (
            <Text style={[styles.label, {backgroundColor: theme.colors.background, color: theme.colors.secondaryFont}, isFocus && { color: theme.colors.primary }]}>Room</Text>
          );
        }
        return null;
      };

  
    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background, borderColor: theme.colors.primaryFont }]}>
        {renderLabel()}
                <Dropdown
                    style={[styles.dropdown, {borderColor: theme.colors.primaryFont}, isFocus && { borderColor: theme.colors.primary }]}
                    placeholder={!isFocus ? 'Select Room' : ''}
                    placeholderStyle={{fontSize: 16, color: theme.colors.primaryFont}}
                    selectedTextStyle={[styles.selectedTextStyle, {color: theme.colors.primaryFont}]}
                    // iconStyle={styles.iconStyle}
                    data={props.data}
                    containerStyle={{backgroundColor: theme.colors.background}}
                    itemTextStyle={{color: theme.colors.primaryFont}}
                    maxHeight={300}
                    activeColor={theme.colors.selected}
                    labelField="label"
                    valueField="value"
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                    // renderLeftIcon={() => (
                    //     <AntDesign
                    //         style={styles.icon}
                    //         color={isFocus ? 'blue' : 'black'}
                    //         name="Safety"
                    //         size={20}
                    //     />
                    // )}
                />
                </View>
    );
}