import React, { useContext } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import Login from "../pages/Login/login";
import Home from "../pages/home/Home";
import Settings from "../pages/settings/settings";
import { Context } from "../state/Store";
import { createDrawerNavigator } from "@react-navigation/drawer";


export default function Routes() {
    const [state,] = useContext(Context);
    const Drawer = createDrawerNavigator();

    return (
        <NavigationContainer>
            <Drawer.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
                {state.auth.isAuthenticated
                    ? <>
                        <Drawer.Screen name="Home" component={Home}/>
                        <Drawer.Screen name="Settings" component={Settings}/>
                      </>
                    : <Drawer.Screen name="Login" component={Login}/>
                }
            </Drawer.Navigator>
        </NavigationContainer>
    )
}