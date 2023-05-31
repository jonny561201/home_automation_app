import React, { useContext } from 'react';
import LogoutDrawer from "./logout-drawer";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../pages/login/login";
import Home from "../pages/home/home";
import Settings from "../pages/settings/settings";
import { useTheme } from 'react-native-paper';
import { Context } from "../state/store";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Account from "../pages/account/account";
import Events from '../pages/events/events';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Devices from "../pages/devices/devices";


export default function Routes() {
    const theme = useTheme();
    const [state,] = useContext(Context);
    const Drawer = createDrawerNavigator();

    return (
        <NavigationContainer theme={theme}>
            <Drawer.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home" drawerContent={LogoutDrawer}>
                {state.auth.isAuthenticated
                    ? <>
                        <Drawer.Screen
                            name="Home"
                            component={Home}
                            options={{ drawerIcon: ({ focused }) => (<Icon name="home" size={20} color={focused ? theme.colors.primary : theme.colors.primaryFont} />) }}
                        />
                        <Drawer.Screen
                            name="Events"
                            component={Events}
                            options={{ drawerIcon: ({ focused }) => (<Icon name="event" size={20} color={focused ? theme.colors.primary : theme.colors.primaryFont} />) }}
                        />
                        <Drawer.Screen
                            name="Settings"
                            component={Settings}
                            options={{ drawerIcon: ({ focused }) => (<Icon name="settings" size={20} color={focused ? theme.colors.primary : theme.colors.primaryFont} />) }}
                        />
                        <Drawer.Screen
                            name="Account"
                            component={Account}
                            options={{ drawerIcon: ({ focused }) => (<Icon name="account-circle" size={20} color={focused ? theme.colors.primary : theme.colors.primaryFont} />) }}
                        />
                        <Drawer.Screen
                            name="Devices"
                            component={Devices}
                            options={{ drawerIcon: ({ focused }) => (<Icon name="qr-code-scanner" size={20} color={focused ? theme.colors.primary : theme.colors.primaryFont} />) }}
                        />
                    </>
                    : <Drawer.Screen name="Login" component={Login} />
                }
            </Drawer.Navigator>
        </NavigationContainer>
    )
}