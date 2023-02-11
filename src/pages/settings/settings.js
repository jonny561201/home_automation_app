import React, { useState, useContext, useCallback } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Context } from '../../state/store';
import Header from '../../header/header';
import SettingsPanel from './settings-panel';
import SettingsEditPanel from './settings-edit-panel';
import styles from './settings.styles'
import { useFocusEffect } from "@react-navigation/native";
import { Switch, useTheme } from "react-native-paper";


export default function Settings(props) {
    const [state, dispatch] = useContext(Context);
    const [isAutoMode, setIsAutoMode] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [isEditMode, setEditMode] = useState();
    const theme = useTheme();

    useFocusEffect(
        useCallback(() => {
            dispatch({ type: 'SET_ACTIVE_PAGE', payload: 'Settings' });
        }, [dispatch])
    );

    const toggleEditMode = () => {
        setEditMode(!isEditMode);
    }

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        dispatch({ type: 'SET_DARK_MODE', payload: !state.isDarkMode });
        console.log(state.isDarkMode)
    }

    // const toggleAutoTheme = () => {
    //     // localStorage.setItem('auto-theme', !isAutoMode);
    //     setIsAutoMode(!isAutoMode);
    //     // isNightTime(state.garageCoords, state.userCoords)
    //     //     ? setTheme('theme-dark')
    //     //     : setTheme('theme-light')
    //     if (!isAutoMode === false && !darkMode)
    //         console.log('set theme')
    //     // setTheme('theme-light');
    // }

    return (
        <>
            <Header toggleMenu={props.navigation.toggleDrawer} />
            <ScrollView style={[styles.pageContainer, {backgroundColor: theme.colors.background}]}>
                <View style={styles.settingsBody}>
                    <Text style={[styles.settingsHeader, {color: theme.colors.font}]}>Preferences</Text>

                    <View style={styles.settingsRow}>
                        <Switch value={darkMode && !isAutoMode} onValueChange={toggleTheme} />
                        <Text style={[styles.settingsLabelText, {color: theme.colors.font}]}>Dark Mode</Text>
                    </View>

                    {/* <View style={styles.settingsRow}>
                        <Switch value={isAutoMode} onValueChange={toggleAutoTheme} />
                        <Text style={styles.settingsLabelText}>Auto Theme</Text>
                    </View> */}

                    {
                        isEditMode
                            ? <SettingsEditPanel isEditMode={isEditMode} setEditMode={setEditMode} />
                            : <SettingsPanel toggleEdit={toggleEditMode} />
                    }

                </View>
            </ScrollView>
        </>
    )
}