import React, { useContext } from 'react';
import LogoutDrawer from "./logout-drawer";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../pages/login/login";
import Home from "../pages/home/home";
import Settings from "../pages/settings/settings";
import { Context } from "../state/store";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Account from "../pages/account/account";


export default function Routes() {
    const [state,] = useContext(Context);
    const Drawer = createDrawerNavigator();

    return (
        <NavigationContainer>
            <Drawer.Navigator screenOptions={{headerShown: false}} initialRouteName="Home" drawerContent={LogoutDrawer}>
                {state.auth.isAuthenticated
                    ? <>
                        <Drawer.Screen name="Home" component={Home}/>
                        <Drawer.Screen name="Settings" component={Settings}/>
                        <Drawer.Screen name="Account" component={Account}/>
                      </>
                    : <Drawer.Screen name="Login" component={Login}/>
                }
            </Drawer.Navigator>
        </NavigationContainer>
    )
}