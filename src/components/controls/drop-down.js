import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useTheme } from 'react-native-paper';
import styles from './drop-down.styles';


export default function DropDown(props) {
    const theme = useTheme();
    const [data, setData] = useState([]);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        if (!props.data.value) {
            setData(props.data.map(x => ({label: x, value: x})))
        }
    }, []);

    const onChange = (item) => {
        props.onChange(item.value);
    };

    const renderLabel = () => {
        if (props.value || isFocus) {
          return (
            <Text style={[styles.label, {backgroundColor: theme.colors.background, color: theme.colors.secondaryFont}, isFocus && { color: theme.colors.primary }]}>{props.label}</Text>
          );
        }
        return null;
      };

  
    return (
        <View style={[styles.container, props.style, { borderColor: theme.colors.primaryFont }]}>
        {renderLabel()}
                <Dropdown
                    style={[styles.dropdown, {borderColor: theme.colors.primaryFont, backgroundColor: theme.colors.background}, isFocus && { borderColor: theme.colors.primary, borderWidth: 2 }]}
                    placeholder={!isFocus ? props.placeholder : ''}
                    placeholderStyle={{fontSize: 16, color: theme.colors.primaryFont}}
                    selectedTextStyle={[styles.selectedTextStyle, {color: theme.colors.primaryFont}]}
                    // iconStyle={styles.iconStyle}
                    data={data}
                    containerStyle={{backgroundColor: theme.colors.background}}
                    itemTextStyle={{color: theme.colors.primaryFont}}
                    maxHeight={300}
                    activeColor={theme.colors.selected}
                    labelField="label"
                    valueField="value"
                    value={props.value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={onChange}
                />
                </View>
    );
}