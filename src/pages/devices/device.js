import React from 'react';
import {List, useTheme} from "react-native-paper";


export default function Device(props) {
    const theme = useTheme();

    return (
        <List.Accordion
            title={props.device.name}
            titleStyle={{color: theme.colors.secondaryFont}}
            left={(props) => <List.Icon {...props} icon='light-switch' color={theme.colors.primaryFont}/>}
            right={() => {
            }}
        />
    )
}