import React, { useState, useContext, useCallback } from 'react';
import { Text, View } from 'react-native';
import { Context } from '../../state/store';
import Header from '../../header/header';
import SettingsPanel from './settings-panel';
import SettingsEditPanel from './settings-edit-panel';
import styles from './settings.styles'
import { useFocusEffect } from "@react-navigation/native";
import { Switch } from "react-native-paper";


export default function Settings(props) {
    const [state, dispatch] = useContext(Context);
    const [isAutoMode, setIsAutoMode] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [isEditMode, setEditMode] = useState();

    useFocusEffect(
        useCallback(() => {
            dispatch({type: 'SET_ACTIVE_PAGE', payload: 'Settings'});
        }, [dispatch])
    );

    const toggleEditMode = () => {
        setEditMode(!isEditMode);
    }

    const toggleTheme = () => {
        // toggleDarkMode()
        setDarkMode(!darkMode);
    }

    const toggleAutoTheme = () => {
        // localStorage.setItem('auto-theme', !isAutoMode);
        setIsAutoMode(!isAutoMode);
        // isNightTime(state.garageCoords, state.userCoords)
        //     ? setTheme('theme-dark')
        //     : setTheme('theme-light')
        if (!isAutoMode === false && !darkMode)
            console.log('set theme')
        // setTheme('theme-light');
    }

    return (
        <>
            <View style={styles.pageContainer}>
                <Header toggleMenu={props.navigation.toggleDrawer}/>
            </View>
            <View style={styles.settingsBody}>
                <Text style={styles.settingsHeader}>Preferences</Text>

                <View style={styles.settingsRow}>
                    <Switch value={darkMode && !isAutoMode} onValueChange={toggleTheme}/>
                    <Text style={styles.settingsLabelText}>Dark Mode</Text>
                </View>

                <View style={styles.settingsRow}>
                    <Switch value={isAutoMode} onValueChange={toggleAutoTheme}/>
                    <Text style={styles.settingsLabelText}>Auto Theme</Text>
                </View>

                {isEditMode
                    ? <SettingsEditPanel isEditMode={isEditMode} setEditMode={setEditMode}/>
                    : <SettingsPanel toggleEdit={toggleEditMode}/>
                }
            </View>
        </>
    )
}