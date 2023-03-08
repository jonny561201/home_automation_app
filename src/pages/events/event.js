import React from 'react';
import { List, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function Event(props) {
    const theme = useTheme();

    //Light Activity
    // props.task.task_type
    // props.task.alarm_days
    // props.task.alarm_time
    // props.task.enabled

    //hvac Activity
    // props.task.task_type
    // props.task.alarm_days
    // props.task.enabled
    // props.task.hvac_stop
    // props.task.hvac_start
    // props.task.hvac_start_temp
    // props.task.hvac_stop_temp
    return (
        <>
            {
                props.task.task_type === 'hvac'
                    ? <List.Accordion
                        title='Temp Event'
                        left={(props) => <Icon {...props} name="hvac" size={30} />}>
                            <List.Item title={props.task.alarm_days} titleStyle={{color: theme.colors.secondaryFont}} left={(props) => <List.Icon {...props} icon='calendar-week' color={theme.colors.primaryFont}/>} />
                            <List.Item title={props.task.hvac_start} titleStyle={{color: theme.colors.secondaryFont}} left={(props) => <List.Icon {...props} icon='play'  color={theme.colors.primaryFont}/>} />
                            <List.Item title={`Operating: ${props.task.hvac_start_temp}`} titleStyle={{color: theme.colors.secondaryFont}} left={(props) => <List.Icon {...props} icon='thermostat'  color={theme.colors.primaryFont}/>} />
                            <List.Item title={props.task.hvac_stop} titleStyle={{color: theme.colors.secondaryFont}} left={(props) => <List.Icon {...props} icon='stop'  color={theme.colors.primaryFont}/>} />
                            <List.Item title={`Hold: ${props.task.hvac_stop_temp}`} titleStyle={{color: theme.colors.secondaryFont}} left={(props) => <List.Icon {...props} icon='thermostat'  color={theme.colors.primaryFont}/>} />
                    </List.Accordion>

                    : <List.Accordion
                        title='Light Event'
                        left={(props) => <Icon {...props} name="lightbulb-outline" size={30} />}>
                            <List.Item title={props.task.alarm_days} titleStyle={{color: theme.colors.secondaryFont}} left={(props) => <List.Icon {...props} icon='calendar-week'  color={theme.colors.primaryFont}/>}/>
                            <List.Item title={props.task.alarm_time} titleStyle={{color: theme.colors.secondaryFont}} left={(props) => <List.Icon {...props} icon='alarm'  color={theme.colors.primaryFont}/>}/>
                    </List.Accordion>
            }
        </>
    )
}