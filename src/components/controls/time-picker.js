import React, { useState} from 'react';
import { View } from 'react-native';
import moment from 'moment/moment';
import { TextInput, useTheme } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './time-picker.styles';


export default function TimePicker(props) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const onChange = (date) => {
        setOpen(false);
        props.onChange(date);
    }

    return (
        <>
            <View style={styles.buttonContainer}>
                <TextInput
                    value={moment(props.value).format('hh:mm a')}
                    outlineColor={theme.colors.primaryFont}
                    // onChangeText={handleChange}
                    mode='outlined'
                    disabled
                    style={[props.style, styles.button]}
                    textColor={theme.colors.secondaryFont}
                    activeOutlineColor={theme.colors.primary}
                    right={<TextInput.Icon icon='clock-outline' color={theme.colors.primaryFont} onPress={() => setOpen(true)} />}
                    label="Time" />
            </View>
            <DateTimePickerModal
                date={props.value}
                isVisible={open}
                mode="time"
                onConfirm={onChange}
                onCancel={() => setOpen(false)}
            />
        </>
    )
}