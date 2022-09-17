import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {Context} from "../state/store";
import {useContext} from "react";


export default function LogoutDrawer(props) {
    const [, dispatch] = useContext(Context);

    const logout = async () => {
        await dispatch({ type: 'SET_AUTH_DATA', payload: { bearer: '', refresh: '', isAuthenticated: false, exp: '' } });
        props.navigation.navigate("Login", {screen: 'Login'})
    }

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={logout} />
        </DrawerContentScrollView>
    )
}