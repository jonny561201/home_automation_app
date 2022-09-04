import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";


export default function LogoutDrawer(props) {

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={() => props.navigation.navigate("Login")} />
        </DrawerContentScrollView>
    )
}